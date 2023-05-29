# nextJs 13 app 마이그레이션 과정

## 1. use client

'use client';

### ERROR

> You're importing a component that needs useRef. It only works in a Client Component but none of
> its parents are marked with "use client", so they're Server Components by default.

이는 app 디렉토리가 server component이기 때문에 useState, useEffect같은 코드를 포함 할 수 없다. 그래
서 이를 사용하기 위해 상단에 "use Client"라는 코드를 넣어야한다.

### useRouter

app directory에서는 기존 next/router대신 next/navigation의 useRouter(), usePathname(),
useSearchParams()를 사용한다.

```javascript
//before
import { useRouter } from 'next/router';

//after
import { useRouter } from 'next/navigation';
```
