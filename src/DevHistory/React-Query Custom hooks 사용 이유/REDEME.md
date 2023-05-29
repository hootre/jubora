# React-Query Custom hooks 사용 이유

처음 Context를 사용하여 구현하다가 React-Query를 도입하게 되었습니다. React-Query는 대표적으로
useQuery, useMutation을 사용하는데이 두가지는 Hook이기 때문에 반드시 function component안에서 사용해
야 한다는 제약을가지고 있습니다.

```javascript
const App = () => {
  const { data: userInfo } = useQuery(['userQueryKey'], api.get('/user', { id: 1 }));

  // ...
};
```

위는 일반적으로 사용하는 react-query 코드인데이런식으로 사용하면 여러 문제점이 있습니다.

- 해당 코드를 사용하는 컴포넌트에 처리 코드가 종속되는 느낌컴포넌트에서 데이터를 받아와서 해당 데이
  터를 가공해 사용하는 로직이 있는 것은 괜찮은 것 같지만, 데이터를 가져오는 과정을 자세하게 가지고있
  을 필요는 없다고 본다. **또한 재사용성을 생각해 봤을 때 따로 분리 하는 것이 좋아보인다**

- 코드 수정에 어려움이 있다. 위와 같은 코드를 여러 컴포넌트에서 사용하고 있고 URI를 변경해야 된다고
  할 때코드를 변경하기 위해서 위 코드가 작성된 컴포넌트들을 다 수정해야 한다. **이런 코드들은 모듈화
  해서 재사용을 용이하게 하고 유사시에 수정도 쉽게 할 수 있도록 분리 하여야 한다고 생각한다.**

[참조](https://medium.com/hcleedev/web-react-query-custom-hooks%EB%A1%9C-%EB%8D%94-%EC%9E%98-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-2ea47fb358c3)
