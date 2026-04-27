import { supabase } from './supabase';

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

export async function uploadPublicFile(bucket: string, folder: string, file: File) {
  if (!supabase) {
    throw new Error('Supabase 환경 변수가 설정되지 않아 파일을 업로드할 수 없습니다.');
  }

  const extension = getFileExtension(file.name);
  const safeName = sanitizeFileName(file.name.replace(/\.[^.]+$/, ''));
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}${extension ? `.${extension}` : ''}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export function isImageFile(file: File) {
  const extension = getFileExtension(file.name);
  return file.type.startsWith('image/') || IMAGE_EXTENSIONS.has(extension);
}

function getFileExtension(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') ?? '';
}

function sanitizeFileName(fileName: string) {
  const sanitized = fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return sanitized || 'upload';
}
