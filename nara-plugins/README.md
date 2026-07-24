# nara-plugins

Claude Code / Cowork 플러그인 마켓플레이스입니다.

## 포함된 플러그인

- **learning-journal** — 웹개발을 공부하는 초보자를 위해 세션 중 겪은 에러와 배운
  점을 자동으로 정리해 마크다운 학습 일지에 기록하는 플러그인
  (`plugins/learning-journal`)

## GitHub에 배포하는 방법

1. 이 `nara-plugins` 폴더를 기존 git 저장소로 옮기거나, 이 폴더 자체를 새 저장소로
   초기화합니다.

   ```bash
   cd nara-plugins
   git init          # 새 저장소로 시작하는 경우
   git add .
   git commit -m "Add learning-journal plugin marketplace"
   ```

2. GitHub 원격 저장소를 연결하고 푸시합니다. (이미 만들어둔 저장소가 있다면 그
   주소로 바꿔주세요.)

   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

   기존 저장소의 하위 폴더로 넣고 싶다면, `nara-plugins` 폴더째로 저장소 안에
   복사해 넣고 평소처럼 `git add` / `git commit` / `git push` 하면 됩니다.

## 설치 방법 (사용자 입장)

저장소가 푸시되고 나면, 누구든 Claude Code에서 이렇게 설치할 수 있습니다.

```
/plugin marketplace add <your-username>/<repo-name>
/plugin install learning-journal@nara-plugins
```

## marketplace.json 업데이트 시 주의사항

- `plugins/learning-journal` 안의 `plugin.json`에서 `version`을 올리지 않으면
  사용자가 업데이트를 못 받을 수 있습니다. 내용을 수정할 때마다 버전을 올려주세요
  (예: `0.1.0` → `0.1.1`).
- `marketplace.json`의 `plugins[].source` 경로가 실제 폴더 위치와 일치해야
  합니다.
