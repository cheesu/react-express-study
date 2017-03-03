"# react-express-study" 


// 빌드 명령어
$ npm run build

// 개발버전 서버 구동
$ npm run development

// 이렇게 실행
$ npm run build && npm run development

포트번호 3000 배포용
포트번호 3001 개발용


pakage.json

  "scripts": {
    "clean": "rm -rf build public/bundle.js",
    "build": "babel server --out-dir build && ./node_modules/.bin/webpack",
    "start": "NODE_ENV=production node ./build/main.js",
    "development": "NODE_ENV=development node ./build/main.js"
  },


  window 에서는

"start": "set NODE_ENV=production&&node ./build/main.js",
"development": "set NODE_ENV=development&&node ./build/main.js"

  이렇게 바꿔줍니다.

  ajax 라이브러리는 axios 사용
  익스플로러에선 미지원



