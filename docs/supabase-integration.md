# Supabase 연동 계획

## 목적

1. **짧은 공유 링크**: `/result/abc123` 형태로 깔끔한 URL 제공
2. **결과 영구 저장**: URL 파라미터 대신 DB에 저장
3. **조회수 트래킹**: 결과 페이지 방문 횟수 확인 가능

---

## 데이터베이스 스키마

### results 테이블

```sql
CREATE TABLE results (
  id TEXT PRIMARY KEY,           -- 6자리 짧은 ID (예: "abc123")
  tier TEXT NOT NULL,            -- "free" | "premium"
  user_name TEXT,                -- 사용자 이름 (선택)
  answers JSONB NOT NULL,        -- 질문 응답 데이터
  ai_result JSONB,               -- AI 분석 결과
  created_at TIMESTAMPTZ DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,  -- 조회수

  -- 인덱스
  CONSTRAINT valid_tier CHECK (tier IN ('free', 'premium'))
);

-- 인덱스 추가
CREATE INDEX idx_results_created_at ON results(created_at DESC);
```

### 예시 데이터

```json
{
  "id": "x7k2m9",
  "tier": "free",
  "user_name": "하나비",
  "answers": {
    "1": "성장",
    "2": "유튜브 보기",
    "3": "여행 갔을 때",
    ...
  },
  "ai_result": {
    "title": "성장하는 한 해",
    "summary": "올해 당신은...",
    "insight": "...",
    "advice": "...",
    "keywords": ["성장", "도전", ...]
  },
  "created_at": "2024-12-05T10:30:00Z",
  "view_count": 42
}
```

---

## API 라우트

### 1. POST `/api/results` - 결과 저장

```typescript
// 요청
{
  tier: "free" | "premium",
  userName?: string,
  answers: Record<number, string>,
  aiResult: AIResult
}

// 응답
{
  id: "x7k2m9",
  shareUrl: "https://goodbye-year.vercel.app/result/x7k2m9"
}
```

### 2. GET `/api/results/[id]` - 결과 조회

```typescript
// 응답
{
  id: "x7k2m9",
  tier: "free",
  userName: "하나비",
  answers: {...},
  aiResult: {...},
  viewCount: 42
}

// 조회 시 view_count 자동 증가
```

---

## 구현 단계

### Phase 1: Supabase 설정

- [ ] Supabase 프로젝트 생성
- [ ] `results` 테이블 생성 (위 스키마)
- [ ] RLS (Row Level Security) 정책 설정
  - 읽기: 모든 사용자 허용 (공유 링크용)
  - 쓰기: 서버 사이드만 (API 라우트)
- [ ] 환경변수 설정
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Phase 2: API 라우트 구현

- [ ] `/api/results/route.ts` - POST (저장)
- [ ] `/api/results/[id]/route.ts` - GET (조회)
- [ ] 짧은 ID 생성 함수 (nanoid 또는 직접 구현)

### Phase 3: 페이지 수정

- [ ] `/result/[id]/page.tsx` - 새 결과 페이지 (동적 라우트)
- [ ] 기존 result 페이지에서 저장 API 호출
- [ ] 공유 URL을 새 짧은 URL로 변경

### Phase 4: 기존 flow 유지

- [ ] URL 파라미터 방식도 fallback으로 유지
- [ ] 저장 실패 시 기존 방식으로 동작

---

## 짧은 ID 생성

```typescript
// utils/generateId.ts
import { customAlphabet } from 'nanoid';

// 숫자 + 소문자만 사용 (혼동 방지: 0, o, l, 1 제외)
const alphabet = '23456789abcdefghjkmnpqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 6);

export const generateShortId = () => nanoid();
// 예: "x7k2m9", "3pqh8v", "wnc4r6"
```

**6자리 조합 가능 수**: 30^6 = 729,000,000 (충분!)

---

## RLS 정책

```sql
-- 읽기: 모두 허용 (공유 링크 접근용)
CREATE POLICY "Anyone can read results"
  ON results FOR SELECT
  USING (true);

-- 쓰기: service_role만 (API 라우트에서 호출)
CREATE POLICY "Only service role can insert"
  ON results FOR INSERT
  WITH CHECK (false);

-- view_count 업데이트는 함수로 처리
CREATE OR REPLACE FUNCTION increment_view_count(result_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE results SET view_count = view_count + 1 WHERE id = result_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 예상 비용

Supabase Free Tier:
- 500MB 데이터베이스
- 50,000 행 제한
- 2GB 대역폭/월

**결과 1개 예상 크기**: ~2KB
**50,000행 = 100MB** → Free Tier로 충분

---

## 마이그레이션 계획

1. **즉시**: 새 결과는 DB 저장 + 짧은 URL
2. **기존 링크**: URL 파라미터 방식 계속 지원
3. **점진적**: 오래된 URL 파라미터 결과는 만료 안내

---

## 파일 구조

```
src/
├── app/
│   ├── api/
│   │   └── results/
│   │       ├── route.ts          # POST - 결과 저장
│   │       └── [id]/
│   │           └── route.ts      # GET - 결과 조회
│   └── result/
│       └── [id]/
│           └── page.tsx          # 결과 보기 페이지
├── lib/
│   └── supabase.ts               # Supabase 클라이언트
└── utils/
    └── generateId.ts             # 짧은 ID 생성
```

---

## 사용자/결과 구분 방식

### Q: 같은 사람인지 어떻게 구분해?

**로그인 없음 = "사용자" 개념 없음**

결과 ID(URL)가 곧 식별자:
```
/result/abc123  →  A가 만든 결과
/result/xyz789  →  B가 만든 결과
```

| 상황 | 결과 |
|------|------|
| A가 테스트 완료 | `abc123` 생성, A 결과 저장 |
| B가 테스트 완료 | `xyz789` 생성, B 결과 저장 |
| A가 다시 테스트 | `def456` 생성, 새 결과로 저장 |

**"결과 1개 = 테스트 1회"** 개념. 같은 사람이 다시 해도 새 ID.

---

## 공유 링크 동작

### Q: 친구한테 URL 공유하면 그대로 나와?

**Yes!** DB에 저장된 결과 그대로 보여줌.

```
나: 테스트 완료 → abc123 생성 → DB 저장
나: 친구에게 /result/abc123 공유
친구: 링크 열기 → DB에서 abc123 조회 → 내 결과 그대로 표시
```

### 현재 vs Supabase 연동 후

| | 현재 (URL 파라미터) | Supabase 연동 후 |
|---|---|---|
| URL | `/result?data=eyJhbnN3ZX...` (개김) | `/result/abc123` (짧음) |
| 데이터 | URL에 전부 포함 | DB에서 조회 |
| 공유 | 가능하지만 URL 잘릴 수 있음 | 깔끔하게 공유 |
| 카톡/인스타 | 링크 미리보기 깨질 수 있음 | 정상 작동 |

---

## 조회수 중복 방지

### 방법 비교

| 방법 | 난이도 | 정확도 | 선택 |
|------|--------|--------|------|
| **localStorage** | 쉬움 | ~70% | ✅ MVP |
| 쿠키 | 쉬움 | ~70% | - |
| IP + 날짜 (DB) | 중간 | ~80% | - |
| fingerprint | 어려움 | ~90% | 과함 |

### localStorage 방식 구현

```typescript
// /result/[id]/page.tsx

useEffect(() => {
  const viewedKey = `viewed_${resultId}`;

  if (!localStorage.getItem(viewedKey)) {
    // 처음 보는 결과면 조회수 +1
    incrementViewCount(resultId);
    localStorage.setItem(viewedKey, 'true');
  }
}, [resultId]);
```

### 한계 (수용 가능)

- 시크릿 모드 → 새 방문자 취급
- 다른 기기 → 새 방문자 취급
- localStorage 삭제 → 새 방문자 취급

**연말결산 특성상** 정확한 조회수보다 "대략 몇 명이 봤나" 정도면 충분.
정확한 통계는 GA4가 더 잘함 (세션, unique visitor 등).

---

## 추후 확장

- [ ] 만료 기능 (30일 후 자동 삭제)
- [ ] 통계 대시보드 (일별 생성/조회수)
- [ ] 1회용 코드 (프리미엄 결제 후 발급)

---

*작성일: 2024-12-05*
