# 사용자 관리 시스템 (User Management System)

TypeScript + Refine + Ant Design + Tailwind CSS로 구축된 현대적인 사용자 관리 대시보드입니다.

## 🌟 주요 특징

- **완전 한글화**: 모든 UI 텍스트와 메시지가 한국어로 표시
- **현대적 UI**: Ant Design + Tailwind CSS 조합으로 아름다운 인터페이스
- **타입 안전성**: TypeScript로 컴파일 타임 오류 방지
- **재사용 가능한 컴포넌트**: Custom CRUD 컴포넌트로 개발 효율성 극대화
- **자동 타이틀 생성**: 리소스별 자동 페이지 타이틀 생성
- **JWT 인증**: 안전한 토큰 기반 인증 시스템
- **NestJS CRUD 호환**: nestjs-crud 백엔드와 완벽 호환

## 🛠 기술 스택

### Frontend
- **Framework**: React 18 + TypeScript
- **UI Framework**: Refine.dev
- **UI Components**: Ant Design 5.x
- **Styling**: Tailwind CSS 3.x
- **Build Tool**: Vite
- **Routing**: React Router 7
- **State Management**: Refine 내장 상태 관리
- **HTTP Client**: Fetch API
- **Authentication**: JWT + js-cookie

### Backend Integration
- **API**: RESTful API
- **Backend Framework**: NestJS + nestjs-crud (호환)
- **Authentication**: JWT Access/Refresh Token
- **Database**: TypeORM 지원

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
VITE_API_URL=http://localhost:3000
```

### 3. 개발 서버 실행
```bash
npm run dev
```

애플리케이션이 `http://localhost:5173`에서 실행됩니다.

### 4. 빌드
```bash
npm run build
```

## 🔐 인증 시스템

### JWT 토큰 기반 인증
- **Access Token**: API 요청 시 사용 (1일 만료)
- **Refresh Token**: Access Token 갱신용 (7일 만료)
- **자동 갱신**: Access Token 만료 시 자동으로 Refresh Token으로 갱신

### 로그인 플로우
1. 사용자가 이메일/비밀번호 입력
2. 백엔드에서 JWT 토큰 발급
3. 토큰을 쿠키에 안전하게 저장
4. 이후 모든 API 요청에 자동으로 토큰 첨부

## 👥 사용자 관리 기능

### CRUD 기능
- **목록 조회**: 페이지네이션, 필터링, 검색 지원
- **상세 보기**: 사용자 정보 상세 확인
- **생성**: 새로운 사용자 등록
- **수정**: 기존 사용자 정보 업데이트
- **삭제**: 사용자 계정 삭제

### 사용자 필드
- **기본 정보**: 이름, 이메일, 전화번호
- **권한**: 관리자(admin) / 사용자(user)
- **로그인 방식**: LOCAL, GOOGLE, KAKAO, NAVER, APPLE
- **메타데이터**: 생성일, 수정일

### 테이블 기능
- **페이지네이션**: 10/20/50/100개씩 보기 옵션
- **필터링**: 역할, 로그인 방식별 필터
- **검색**: 이름, 이메일 실시간 검색
- **정렬**: 컬럼별 오름차순/내림차순 정렬
- **내보내기**: JSON 형태로 데이터 내보내기

## 🎨 UI/UX 특징

### 반응형 디자인
- **데스크톱 우선**: 관리자 대시보드에 최적화
- **모바일 지원**: 작은 화면에서도 사용 가능
- **다크 모드**: Ant Design 테마 지원

### 사용자 경험
- **빠른 로딩**: Vite의 빠른 개발 서버
- **실시간 피드백**: 작업 결과 즉시 표시
- **직관적 네비게이션**: 사이드바 메뉴
- **키보드 접근성**: 키보드만으로도 조작 가능

### 페이지네이션 커스터마이징
- **왼쪽**: 전체 항목 수 표시 ("총 123개")
- **중앙**: 페이지 번호 버튼들
- **오른쪽**: 페이지 크기 선택 ("10개씩 보기")

## 🏗 아키텍처 특징

### Custom CRUD 컴포넌트
모든 CRUD 페이지에서 재사용 가능한 래퍼 컴포넌트들:

```typescript
// 자동 타이틀 생성 + 일관된 스타일링
<CustomList tableProps={tableProps} columns={columns} />
<CustomShow isLoading={isLoading}>...</CustomShow>
<CustomEdit saveButtonProps={saveButtonProps}>...</CustomEdit>
<CustomCreate saveButtonProps={saveButtonProps}>...</CustomCreate>
```

### 자동 타이틀 생성
`useAutoTitle` 훅을 통해 리소스와 액션을 조합하여 자동으로 페이지 타이틀 생성:

```typescript
useAutoTitle("list")    // → "사용자 목록"
useAutoTitle("create")  // → "사용자 생성"
useAutoTitle("edit")    // → "사용자 수정"
useAutoTitle("show")    // → "사용자 상세"
```

### 다국어 지원 (i18n)
완전한 한국어 지원을 위한 커스텀 i18n 프로바이더:
- **성공 메시지**: "성공적으로 생성되었습니다"
- **오류 메시지**: "생성 중 오류가 발생했습니다"
- **버튼 텍스트**: "저장", "취소", "삭제"
- **폼 검증**: "이 필드는 필수입니다"

### 타입 안전성
TypeScript를 활용한 컴파일 타임 오류 방지:
- **API 응답 타입 정의**
- **컴포넌트 Props 타입 검증**
- **이벤트 핸들러 타입 안전성**

## 🔧 커스터마이징

### 새로운 리소스 추가
1. **App.tsx에 리소스 등록**:
```typescript
resources={[
  {
    name: "posts",
    list: "/posts",
    create: "/posts/create",
    edit: "/posts/edit/:id",
    show: "/posts/show/:id",
    meta: { label: "게시물" }, // 자동 타이틀 생성용
  },
]}
```

2. **페이지 컴포넌트 생성**:
```typescript
export const PostList = () => {
  const { tableProps } = useTable();
  return <CustomList tableProps={tableProps} columns={columns} />;
};
```

### 테마 변경
`App.tsx`에서 Ant Design 테마 수정:
```typescript
<ConfigProvider theme={RefineThemes.Blue} locale={customLocale}>
```

사용 가능한 테마: `Blue`, `Purple`, `Magenta`, `Red`, `Orange`, `Yellow`, `Green`

### Tailwind CSS 클래스 추가
기존 Ant Design과 충돌하지 않도록 `tw-` 접두사 사용:
```css
.tw-container { @apply max-w-7xl mx-auto px-4; }
.tw-card { @apply bg-white rounded-lg shadow p-6; }
```

## 📊 성능 최적화

### 코드 분할
- **페이지 레벨 분할**: 각 페이지별로 청크 분리
- **라이브러리 분할**: 벤더 라이브러리 별도 청크

### 번들 크기 최적화
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Dynamic Import**: 필요시에만 모듈 로드
- **Gzip 압축**: 서버에서 Gzip 압축 지원

### 개발 경험
- **HMR**: Hot Module Replacement로 빠른 개발
- **TypeScript**: 컴파일 타임 오류 검출
- **ESLint**: 코드 품질 관리

## 📝 API 명세

### 인증 엔드포인트
- `POST /api/v1/admin/auth/sign/in` - 로그인
- `POST /api/v1/admin/auth/sign/refresh` - 토큰 갱신

### 사용자 관리 엔드포인트
- `GET /api/v1/admin/users` - 사용자 목록 조회
- `POST /api/v1/admin/users` - 사용자 생성
- `GET /api/v1/admin/users/:id` - 사용자 상세 조회
- `PUT /api/v1/admin/users/:id` - 사용자 수정
- `DELETE /api/v1/admin/users/:id` - 사용자 삭제

### 필터링 및 페이지네이션
nestjs-crud 호환 쿼리 파라미터:
- `?page[number]=1&page[size]=10` - 페이지네이션
- `?filter[role]=admin` - 역할 필터
- `?filter[name][$like]=%john%` - 이름 검색
- `?sort[]=createdAt,DESC` - 정렬

### Docker 배포
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```
