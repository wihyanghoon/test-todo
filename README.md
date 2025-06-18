# Test Todo App

간단한 할 일 목록(Todo List)을 관리할 수 있는 웹 애플리케이션입니다.  
TypeScript + Webpack + ESLint + Prettier 환경에서 개발되었으며, GitHub Pages로 배포되었습니다.

## 배포 링크

👉 [https://wihyanghoon.github.io/test-todo](https://wihyanghoon.github.io/test-todo)

## 기술 스택

- TypeScript
- Webpack 5
- ESLint 9
- Prettier
- Babel
- Jest
- CSS Module Bundling
- GitHub Pages 배포

## 📦 Scripts

| 명령어 | 설명 |
|--------|------|
| `npm run build` | `webpack`을 통해 production 모드로 번들링합니다. 최종 배포용 정적 파일이 `dist` 폴더에 생성됩니다. |
| `npm run serve` | `webpack-dev-server`를 실행하여 개발 환경에서 애플리케이션을 실행합니다. 핫 리로딩 기능이 포함되어 있습니다. |
| `npm run deploy` | `gh-pages`를 이용해 `dist` 폴더의 내용을 GitHub Pages (`gh-pages` 브랜치)로 배포합니다. |
| `npm run test` | `Jest`를 실행하여 유닛 테스트를 수행합니다. `ts-jest`를 사용하여 TypeScript 기반 테스트도 지원됩니다. |

---

### 사용 예시

```bash
# 개발 서버 실행
npm run serve

# 프로덕션용 번들 빌드
npm run build

# 테스트 실행
npm run test

# GitHub Pages로 배포
npm run deploy
