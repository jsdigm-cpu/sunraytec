export type FaqCategory = '제품·기술' | '견적·구매' | '시공·납기' | '유지·보증' | '공공조달';

export interface Faq {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = ['제품·기술', '견적·구매', '시공·납기', '유지·보증', '공공조달'];

export const FAQ_CAT_COLOR: Record<FaqCategory, string> = {
  '제품·기술': '#3B82F6',
  '견적·구매': '#F59E0B',
  '시공·납기': '#10B981',
  '유지·보증': '#8B5CF6',
  '공공조달':  '#EF4444',
};

export const FAQ_CAT_ICON: Record<FaqCategory, string> = {
  '제품·기술': '⚙️',
  '견적·구매': '💰',
  '시공·납기': '🔧',
  '유지·보증': '🛡',
  '공공조달':  '🏛',
};
