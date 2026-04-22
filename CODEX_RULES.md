# CODEX RULES
# Codex 작업 전 반드시 읽고 시작할 것

마지막 업데이트: 2026-04-22

---

## 이 프로젝트 기본 정보

- 회사: (주)썬레이텍 (원적외선 복사난방패널 제조)
- 저장소: https://github.com/jsdigm-cpu/sunraytec
- 배포: https://sunraytec.vercel.app
- 스택: React 19 + TypeScript + Vite 6 + Tailwind CSS + framer-motion

---

## 디자인 시스템 (반드시 준수)

### 컬러
```
Primary (레드):     #C0392B  ← CTA 버튼, 강조
BG Dark (네이비):   #0F2241  ← 다크 섹션 배경
BG Dark2:           #1A3A6B  ← 그라디언트 끝
Accent (앰버):      #E67E22  ← 포인트, 숫자
Surface (밝은배경): #F1F5F9  ← 라이트 섹션 배경
텍스트:             #1A202C  ← 기본 텍스트
텍스트 보조:        #64748B
```

### 폰트
```
제목: font-serif (Noto Serif KR)
본문: font-sans (Noto Sans KR)
숫자/영문 임팩트: Bebas Neue (font-['Bebas_Neue'])
```

### 애니메이션 패턴 (framer-motion)
```tsx
// fadeInUp (섹션 등장)
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}

// stagger (카드 순차 등장)
// 부모에 variants 적용, 자식 0.1초 간격

// hover lift (카드 hover)
whileHover={{ y: -6, boxShadow: "0 20px 40px ..." }}
transition={{ duration: 0.3 }}
```

---

## 절대 금지 사항 ❌

```
❌ src/components/layout/Header.tsx 수정 금지
❌ src/components/layout/Footer.tsx 수정 금지
❌ tailwind.config.js 수정 금지
❌ src/app/App.tsx 대폭 수정 금지 (라우트 추가만 허용)
❌ 별도 CSS 파일 생성 금지 (Tailwind 클래스만 사용)
❌ 기존 컴포넌트 파일 수정 금지 (새 파일만 생성)
❌ package.json 수정 금지
❌ 존재하지 않는 라우트로 링크 생성 금지
```

---

## 허용 사항 ✅

```
✅ src/pages/ 폴더에 새 페이지 파일 생성
✅ src/components/ 에 새 컴포넌트 파일 생성
✅ src/app/routes.tsx 에 라우트 1줄 추가
✅ Tailwind CSS 클래스 자유롭게 사용
✅ framer-motion 사용 (이미 설치됨)
✅ lucide-react 아이콘 사용 (이미 설치됨)
```

---

## 파일 생성 규칙

### 폴더 구조
```
src/
├── pages/
│   ├── about/         ← 회사소개 관련
│   ├── products/      ← 제품 관련
│   ├── resources/     ← 자료실 관련
│   └── ContactPage.tsx ← 견적 문의
├── components/
│   ├── layout/        ← Header, Footer (수정 금지!)
│   ├── home/          ← 메인 페이지 섹션들
│   ├── product/       ← 제품 관련 컴포넌트
│   └── ui/            ← 공통 UI 컴포넌트
└── data/              ← 정적 데이터 파일
```

### 파일명 규칙
```
페이지:     PascalCase + Page.tsx  (예: ContactPage.tsx)
컴포넌트:   PascalCase + .tsx      (예: ProductCard.tsx)
데이터:     camelCase + .ts        (예: products.ts)
타입:       camelCase + .ts        (예: product.ts)
```

---

## 표준 페이지 템플릿

새 서브 페이지 만들 때 이 구조를 기본으로 사용:

```tsx
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function NewPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Sub-Hero */}
      <section className="bg-gradient-to-r from-[#0F2241] to-[#1A3A6B] py-24">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          {/* Breadcrumb */}
          <div className="text-sm text-white/60 mb-4">
            홈 &gt; 메뉴명 &gt; 페이지명
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold font-serif mb-4"
          >
            페이지 제목
          </motion.h1>
          <p className="text-white/80 text-lg">서브타이틀</p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* 내용 */}
        </div>
      </section>

      <Footer />
    </div>
  )
}
```

---

## 현재 살아있는 라우트 (링크 시 이것만 사용)

```
/                     ← 메인 페이지
/products             ← 전체 제품 목록
/products/excellence  ← 우수제품
/products/mas         ← MAS 제품
/products/:productId  ← 제품 상세
/admin                ← 관리자
/coming-soon          ← 준비중 안내
```

### 미구현 라우트 연결 방법
아직 없는 페이지로 링크할 때는 반드시 /coming-soon으로 연결:
```tsx
<Link to="/coming-soon">준비중 메뉴</Link>
```
존재하지 않는 경로로 직접 링크 절대 금지!

---

## 작업 완료 후 반드시 할 것

```
1. 변경한 파일 목록 정리해서 보고
2. 새로 추가된 라우트 목록 보고
3. 타입 에러 없음 확인
4. 빌드 성공 확인 (npm run build)
5. SESSION_HANDOFF.md 업데이트 요청
```

---

## 이 파일이 헷갈리면

Claude 채팅에서 "CODEX_RULES.md 기준으로 작업해줘"라고 전달하거나,
이 파일 전체를 Codex에게 붙여넣고 시작하면 됩니다.
