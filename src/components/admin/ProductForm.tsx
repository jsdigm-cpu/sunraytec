import { useEffect, useState } from 'react';
import type React from 'react';
import type { Product } from '../../types/product';
import { positiveNumber, required } from '../../utils/validators';
import { isImageFile, uploadPublicFile } from '../../lib/storageUploads';

interface Props {
  onSubmit: (product: Product) => Promise<string | null> | string | null | void;
  selectedProduct?: Product | null;
  onClearSelection?: () => void;
}

const empty: Product = {
  id: '',
  name: '',
  category: '',
  summary: '',
  applications: [],
  productLine: 'excellent',
  installationType: 'embedded',
  specs: { powerW: 0, sizeMm: '', voltage: '', heatingArea: '' },
  procurementId: '',
  thumbnailImage: '',
  detailImage: '',
  imageGallery: [],
  detailDescription: '',
  featureBullets: [],
};

export default function ProductForm({ onSubmit, selectedProduct, onClearSelection }: Props) {
  const [form, setForm] = useState<Product>(empty);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!selectedProduct) return;
    setForm({
      ...selectedProduct,
      applications: [...selectedProduct.applications],
      specs: { ...selectedProduct.specs },
      featureBullets: selectedProduct.featureBullets ? [...selectedProduct.featureBullets] : [],
      imageGallery: selectedProduct.imageGallery ? [...selectedProduct.imageGallery] : compactImages(selectedProduct),
    });
    setMessage(`${selectedProduct.name} 정보를 불러왔습니다. 수정 후 저장하세요.`);
  }, [selectedProduct]);

  const update = <K extends keyof Product>(key: K, value: Product[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    setMessage('');
    if (!required(form.id) || !required(form.name) || !required(form.category) || !positiveNumber(form.specs.powerW)) {
      setMessage('id, 모델명, 카테고리, 소비전력을 확인해주세요.');
      return;
    }

    setSaving(true);
    const error = await onSubmit({
      ...form,
      applications: form.applications.filter(Boolean),
      featureBullets: form.featureBullets?.filter(Boolean),
      imageGallery: compactImages(form),
      thumbnailImage: compactImages(form)[0] ?? form.thumbnailImage,
      detailImage: compactImages(form)[0] ?? form.detailImage,
    });
    setSaving(false);
    if (error) {
      setMessage(error);
      return;
    }
    setForm(empty);
    onClearSelection?.();
    setMessage('저장됐습니다.');
  };

  const clearForm = () => {
    setForm(empty);
    setMessage('');
    onClearSelection?.();
  };

  const uploadImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (!required(form.id)) {
      setMessage('이미지 업로드 전 제품 id를 먼저 입력해주세요.');
      return;
    }

    const imageFiles = Array.from(files).filter(isImageFile);
    if (imageFiles.length !== files.length) {
      setMessage('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setSaving(true);
    setMessage('이미지를 업로드하는 중입니다...');

    try {
      const uploaded = await Promise.all(
        imageFiles.map((file) => uploadPublicFile('product-images', form.id, file)),
      );
      setForm((prev) => {
        const gallery = [...compactImages(prev), ...uploaded];
        return {
          ...prev,
          imageGallery: gallery,
          thumbnailImage: gallery[0] ?? '',
          detailImage: gallery[0] ?? '',
        };
      });
      setMessage('이미지가 업로드됐습니다. 첫 번째 이미지가 썸네일과 상세 대표 이미지로 사용됩니다.');
    } catch (error) {
      setMessage(`이미지 업로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setSaving(false);
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => {
      const gallery = compactImages(prev).filter((_, i) => i !== index);
      return {
        ...prev,
        imageGallery: gallery,
        thumbnailImage: gallery[0] ?? '',
        detailImage: gallery[0] ?? '',
      };
    });
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    setForm((prev) => {
      const gallery = compactImages(prev);
      const target = index + direction;
      if (target < 0 || target >= gallery.length) return prev;
      [gallery[index], gallery[target]] = [gallery[target], gallery[index]];
      return {
        ...prev,
        imageGallery: gallery,
        thumbnailImage: gallery[0] ?? '',
        detailImage: gallery[0] ?? '',
      };
    });
  };

  return (
    <div className="card" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h3 style={{ margin: 0 }}>{selectedProduct ? '제품 수정' : '제품 추가'}</h3>
        <button
          type="button"
          onClick={clearForm}
          style={{ border: '1px solid var(--border)', background: '#fff', borderRadius: '8px', padding: '6px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          새 제품 입력
        </button>
      </div>
      <div style={{ display: 'grid', gap: '0.6rem' }}>
        <FormRow label="id" help="제품 상세 URL에 사용됩니다. 저장 후에는 변경할 수 없습니다.">
          <input value={form.id} onChange={(e) => update('id', e.target.value)} disabled={Boolean(selectedProduct)} />
        </FormRow>
        <FormRow label="모델명">
          <input value={form.name} onChange={(e) => update('name', e.target.value)} />
        </FormRow>
        <FormRow label="카테고리">
          <input value={form.category} onChange={(e) => update('category', e.target.value)} />
        </FormRow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          <FormRow label="제품 구분">
            <select value={form.productLine ?? 'excellent'} onChange={(e) => update('productLine', e.target.value as Product['productLine'])}>
              <option value="excellent">우수제품</option>
              <option value="mas">MAS</option>
              <option value="personal">개인용/특수형</option>
            </select>
          </FormRow>
          <FormRow label="설치 방식">
            <select value={form.installationType ?? 'embedded'} onChange={(e) => update('installationType', e.target.value as Product['installationType'])}>
              <option value="embedded">매립형</option>
              <option value="exposed">노출형</option>
              <option value="wall-mounted">벽걸이형</option>
              <option value="desk">책상형</option>
            </select>
          </FormRow>
        </div>
        <FormRow label="조달 식별번호">
          <input value={form.procurementId ?? ''} onChange={(e) => update('procurementId', e.target.value)} />
        </FormRow>
        <FormRow label="요약">
          <input value={form.summary} onChange={(e) => update('summary', e.target.value)} />
        </FormRow>
        <FormRow label="상세 설명">
          <textarea
            value={form.detailDescription ?? ''}
            onChange={(e) => update('detailDescription', e.target.value)}
            rows={10}
            style={{ minHeight: '220px', resize: 'vertical', lineHeight: 1.7 }}
          />
        </FormRow>
        <FormRow label="적용 분야" help="쉼표로 구분해 입력합니다. 예: 대형공장, 물류센터, 체육관">
          <input
            value={form.applications.join(',')}
            onChange={(e) => update('applications', e.target.value.split(',').map((v) => v.trim()))}
          />
        </FormRow>
        <FormRow label="상세 포인트" help="쉼표로 구분해 입력합니다. 제품 상세 페이지의 핵심 bullet로 표시됩니다.">
          <input
            value={(form.featureBullets ?? []).join(',')}
            onChange={(e) => update('featureBullets', e.target.value.split(',').map((v) => v.trim()).filter(Boolean))}
          />
        </FormRow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.6rem' }}>
          <FormRow label="소비전력">
            <input
              type="number"
              value={form.specs.powerW || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, specs: { ...prev.specs, powerW: Number(e.target.value) } }))}
            />
          </FormRow>
          <FormRow label="난방면적">
            <input
              value={form.specs.heatingArea}
              onChange={(e) => setForm((prev) => ({ ...prev, specs: { ...prev.specs, heatingArea: e.target.value } }))}
            />
          </FormRow>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.6rem' }}>
          <FormRow label="크기">
            <input
              value={form.specs.sizeMm}
              onChange={(e) => setForm((prev) => ({ ...prev, specs: { ...prev.specs, sizeMm: e.target.value } }))}
            />
          </FormRow>
          <FormRow label="전압">
            <input
              value={form.specs.voltage}
              onChange={(e) => setForm((prev) => ({ ...prev, specs: { ...prev.specs, voltage: e.target.value } }))}
            />
          </FormRow>
        </div>
        <FormRow label="제품 이미지" help="여러 장 업로드할 수 있으며, 첫 번째 이미지가 썸네일과 상세 대표 이미지로 사용됩니다.">
          <input type="file" accept="image/*" multiple onChange={(e) => uploadImages(e.target.files)} />
          <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.65rem' }}>
            {compactImages(form).map((url, index) => (
              <div
                key={`${url}-${index}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '58px 1fr auto',
                  alignItems: 'center',
                  gap: '0.6rem',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '0.45rem',
                  background: index === 0 ? '#FDECEA' : '#fff',
                }}
              >
                <img src={url} alt="" style={{ width: '58px', height: '44px', objectFit: 'cover', borderRadius: '6px' }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: index === 0 ? 'var(--red)' : '#374151' }}>
                    {index === 0 ? '대표 이미지' : `상세 이미지 ${index + 1}`}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#6B7280', wordBreak: 'break-all' }}>{url}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0}>↑</button>
                  <button type="button" onClick={() => moveImage(index, 1)} disabled={index === compactImages(form).length - 1}>↓</button>
                  <button type="button" onClick={() => removeImage(index)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        </FormRow>
        {message && (
          <div style={{ fontSize: '0.82rem', color: message.includes('실패') || message.includes('확인') ? '#DC2626' : '#047857', fontWeight: 700 }}>
            {message}
          </div>
        )}
        <button className="btn btn-primary" type="button" onClick={save} disabled={saving}>
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
}

function compactImages(product: Pick<Product, 'imageGallery' | 'thumbnailImage' | 'detailImage'>) {
  return Array.from(new Set([...(product.imageGallery ?? []), product.thumbnailImage, product.detailImage].filter(Boolean) as string[]));
}

function FormRow({ label, help, children }: { label: string; help?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.35rem', color: '#374151', fontSize: '0.8rem', fontWeight: 800 }}>
        {label}
      </label>
      {children}
      {help && (
        <p style={{ margin: '0.25rem 0 0', color: '#9CA3AF', fontSize: '0.72rem', lineHeight: 1.5 }}>
          {help}
        </p>
      )}
    </div>
  );
}
