# AuthApp Frontend

React 기반의 인증 시스템 프론트엔드입니다.

## 프로젝트 구조

```
auth-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   │   └── Router.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── AdminPanel.js
│   │   └── OAuth2Redirect.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm start
```

앱이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 3. 빌드

```bash
npm run build
```

## 주요 기능

### 🎨 디자인

- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 그라데이션 배경 및 애니메이션
- Lucide React 아이콘

### 🔐 인증

- JWT 토큰 기반 인증
- 이메일/비밀번호 로그인
- Google OAuth2 로그인
- Naver OAuth2 로그인
- 자동 토큰 갱신

### 📱 페이지

- **Home**: 랜딩 페이지
- **Login**: 로그인 페이지 (OAuth 버튼 포함)
- **Signup**: 회원가입 페이지
- **Dashboard**: 사용자 대시보드
- **Admin Panel**: 관리자 전용 패널

### 🛡️ 보안

- Protected Routes
- Role 기반 접근 제어
- 자동 로그아웃 (401 응답)

## API 연동

백엔드 서버는 `http://localhost:8888`에서 실행되어야 합니다.

연동되는 엔드포인트:

- `POST /api/auth/login` - 로그인
- `POST /api/auth/signup` - 회원가입
- `GET /api/user/profile` - 프로필 조회
- `GET /api/user/dashboard` - 사용자 대시보드
- `GET /api/admin/users` - 전체 사용자 조회 (ADMIN)
- `GET /api/admin/dashboard` - 관리자 대시보드 (ADMIN)
- `DELETE /api/admin/users/:id` - 사용자 삭제 (ADMIN)

## 테스트 계정

- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## 사용된 기술

- React 18
- Lucide React (아이콘)
- Custom Router (React Router 없이 구현)
- Context API (상태 관리)

## 환경 변수

필요한 경우 `.env` 파일을 생성하여 백엔드 URL을 설정할 수 있습니다:

```
REACT_APP_API_URL=http://localhost:8888
```

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

MIT
