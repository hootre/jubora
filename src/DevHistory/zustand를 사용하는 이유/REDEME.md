# zustand를 사용하는 이유

## Recoil

처음에는 Recoil을 활용하여 전역상태관리를 진행하였는데 Recoil이 간단하긴 하지만 버전이 0.7인 부분과
zustand에 비하여 패키지의 용량이 매우 높기 떄문에패키지 용량이 비교적 작은 zustand를 활용하기로 하였
다.

### useRouter

app directory에서는 기존 next/router대신 next/navigation의 useRouter(), usePathname(),
useSearchParams()를 사용한다.

```javascript
//before
import { useRouter } from 'next/router';

//after
import { useRouter } from 'next/navigation';
```

또한 useRouter에서 query가 분리되어서 URI param을 가져올 때는아래와 같이 해야한다.

```javascript
//before
const query = useRouter.query;

//after
import { usePathname } from 'next/navigation';
```
