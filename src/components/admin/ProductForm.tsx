import { useState } from 'react';
import type { Product } from '../../types/product';
import { positiveNumber, required } from '../../utils/validators';

interface Props {
  onSubmit: (product: Product) => void;
}

const empty: Product = {
  id: '',
  name: '',
  category: '',
  summary: '',
  applications: [],
  specs: { powerW: 0, sizeMm: '', voltage: '', heatingArea: '' },
};

export default function ProductForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Product>(empty);

  const update = <K extends keyof Product>(key: K, value: Product[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = () => {
    if (!required(form.id) || !required(form.name) || !positiveNumber(form.specs.powerW)) return;
    onSubmit(form);
    setForm(empty);
  };

  return (
    <div className="card" style={{ padding: '1rem' }}>
      <h3>제품 추가/수정</h3>
      <div style={{ display: 'grid', gap: '0.6rem' }}>
        <input placeholder="id" value={form.id} onChange={(e) => update('id', e.target.value)} />
        <input placeholder="모델명" value={form.name} onChange={(e) => update('name', e.target.value)} />
        <input placeholder="카테고리" value={form.category} onChange={(e) => update('category', e.target.value)} />
        <input placeholder="요약" value={form.summary} onChange={(e) => update('summary', e.target.value)} />
        <input
          placeholder="적용 분야(쉼표 구분)"
          value={form.applications.join(',')}
          onChange={(e) => update('applications', e.target.value.split(',').map((v) => v.trim()))}
        />
        <input
          type="number"
          placeholder="소비전력"
          value={form.specs.powerW || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, specs: { ...prev.specs, powerW: Number(e.target.value) } }))}
        />
        <input
          placeholder="크기"
          value={form.specs.sizeMm}
          onChange={(e) => setForm((prev) => ({ ...prev, specs: { ...prev.specs, sizeMm: e.target.value } }))}
        />
        <input
          placeholder="전압"
          value={form.specs.voltage}
          onChange={(e) => setForm((prev) => ({ ...prev, specs: { ...prev.specs, voltage: e.target.value } }))}
        />
        <input
          placeholder="난방면적"
          value={form.specs.heatingArea}
          onChange={(e) => setForm((prev) => ({ ...prev, specs: { ...prev.specs, heatingArea: e.target.value } }))}
        />
        <button className="btn btn-primary" type="button" onClick={save}>
          저장
        </button>
      </div>
    </div>
  );
}
