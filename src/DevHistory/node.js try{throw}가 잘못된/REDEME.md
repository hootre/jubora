# node.js try{throw}가 잘못된

## 사용한 이유

처음 에는 아래와 같은 형식으로비동기 함수를 구현했다하지만 이는 node.js 공식문서에서 추천하지 않는
방식이란 걸 알게되었다

```javascript
// THIS WILL NOT WORK:
const fs = require('node:fs');

try {
  fs.readFile('/some/file/that/does-not-exist', (err, data) => {
    // Mistaken assumption: throwing here...
    if (err) {
      throw err;
    }
  });
} catch (err) {
  // This will not catch the throw!
  console.error(err);
}
```

### useRouter

출처 https://nodejs.dev/en/api/v18/errors/
