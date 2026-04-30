export type NoticeTone = 'red' | 'amber' | 'navy' | 'green' | 'gray';
export type NoticeCategory = '공지' | '제품' | '조달' | '자료실' | '파트너' | '시공사례' | '이벤트';

export interface Notice {
  id: string;
  category: NoticeCategory;
  tone: NoticeTone;
  title: string;
  body: string;
  pinned: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const NOTICE_TONE_STYLE: Record<NoticeTone, { bg: string; color: string }> = {
  red:   { bg: '#FEE2E2', color: '#B91C1C' },
  amber: { bg: '#FEF3C7', color: '#92400E' },
  navy:  { bg: '#E0E7FF', color: '#1E3A8A' },
  green: { bg: '#DCFCE7', color: '#166534' },
  gray:  { bg: '#F1F5F9', color: '#334155' },
};

export const NOTICE_CATEGORIES: NoticeCategory[] = ['공지', '제품', '조달', '자료실', '파트너', '시공사례', '이벤트'];
export const NOTICE_TONES: NoticeTone[] = ['red', 'amber', 'navy', 'green', 'gray'];
