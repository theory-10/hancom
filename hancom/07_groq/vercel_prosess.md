[ Vercel 배포 프로세스 ]

1. 프로젝트 구조 준비
01/
├── api/
│   └── chat.js        ← Vercel 서버리스 함수 (api/ 폴더 필수)
├── public/
│   ├── index.html
│   ├── scripts/main.js
│   └── styles/main.css
├── .gitignore         ← .env 파일 반드시 포함
└── package.json

2. Vercel CLI 설치
npm i -y vercel

3. package.json 주의사항
- "dev": "vercel dev" 스크립트 입력 금지
- 입력 시 재귀 호출 오류 발생

4. Vercel 배포 실행
cd 프로젝트폴더
vercel
- 최초 실행 시 GitHub 계정 연동 및 프로젝트 설정 진행

5. 환경변수 등록
- vercel.com → 프로젝트 → Settings → Environment Variables
- GROQ_API_KEY 등록

6. 재배포 (Redeploy)
- 환경변수 등록 후 반드시 Redeploy 실행해야 적용됨

7. 배포 완료 및 확인
- 자동 생성된 URL 접속
- 채팅 입력으로 AI 응답 동작 확인