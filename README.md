# Sunraytec Website

썬레이텍 회사 홈페이지 프로젝트입니다. 현재는 React + Vite + TypeScript 기반 프론트엔드와 관리자 초안, 제품 데이터 구조, 제품 상세 페이지 초안까지 정리된 상태입니다.

## 현재 상태

- 메인 페이지 주요 섹션 구현
- 제품안내 메인 페이지 구현
- 조달청 우수제품 페이지 구현
- MAS 다수공급자계약 제품 페이지 구현
- 제품 상세 페이지 초안 구현
- 관리자 페이지 초안 구현
- Hero CMS 편집 및 로컬 저장 지원
- 제품 데이터는 현재 정적 데이터 + `localStorage` 기반

## 기술 스택

- React 19
- Vite 6
- TypeScript
- React Router
- motion
- Supabase JS SDK (연동 준비)

## 로컬 실행

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

3. 타입 체크

```bash
npm run lint
```

4. 프로덕션 빌드

```bash
npm run build
```

## 환경변수

실제 배포 시 아래 값을 설정합니다.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

필요 시 참고 파일:

- [.env.example](/C:/projects/sunraytec/.env.example)

## 배포 계획

- GitHub: 소스 기준 저장소
- Vercel: 프론트엔드 배포
- Supabase: 제품, 페이지 콘텐츠, 시공사례, 문의, 파일 저장소 연동 예정

## 협업 문서

- [PROJECT_STATUS.md](/C:/projects/sunraytec/PROJECT_STATUS.md)
- [NEXT_TASK.md](/C:/projects/sunraytec/NEXT_TASK.md)
- [DECISIONS.md](/C:/projects/sunraytec/DECISIONS.md)
- [SESSION_HANDOFF.md](/C:/projects/sunraytec/SESSION_HANDOFF.md)
- [AI_HANDOFF_PROMPTS.md](/C:/projects/sunraytec/AI_HANDOFF_PROMPTS.md)
