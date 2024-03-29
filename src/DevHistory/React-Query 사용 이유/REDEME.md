# React-Query 사용 이유

처음 서버 데이터를 가져오는 것은 context api를 통해서 가져왔지만 React-query의 기능들이 효율적이여서
아래의 이유로 사용하려 한다.

## React Query란

- 어플리케이션의 비동기 데이터를 쉽게 관리, 캐시 및 동기화 할 수 있는 React용 라이브러리
- 사용자의 인터랙션에 따른 데이터의 Fetching, caching, updating과 컴포넌트 트리의 변경사항에 대한 과
  정을 단순화
- 실시간 업데이트, 페이지네이션, 오류 처리 등과 같은 유용한 기능을 제공
- Axios나 Fetch API와 같은 데이터 fetching 라이브러리와 원활하게 작동하도록 설계

## 1. 중복 된 네트워크 호출 방지

User 이라는 hook이 존재하여 여러 컴포넌트에서 호출 되었을 경우 사용된 컴포넌트의 객수에 비례하여네트
워크 호출 횟수가 증가하게 됩니다. React Query는 중복 된 API 호출을 Query Key를 이용하여 구분하고중복
되는 요총에 대해서는 **캐시에 저장해둔 데이터를 활용하여 네트워크 요청을 최소화합니다**

## 2. 신선하지 않은(Stale)데이터 처리

신선하지 않은 데이터란 서버에 데이터와 클라이언트가 가지고 있는 데이터가서로 일치하지 않는 데이터를
의미합니다.

React Query는 이러한 상황에 대비해서 브라우저나 특정 Element에 포커스가 맞춰지면 API를 호출하거나,
일정 시간이 지난 뒤에 데이터가 일치하지 않을 것을 예상하고 다시 요청하는 등 **다양한 방법을 통해서오
래된 데이터를 갱신합니다.**

## 3. 데이터 처리 상황 표시

서버로부터 데이터를 불러오는 과정에서 로딩을 표시하거나, 에러가 발생한 경우이를 핸들링 하기 편하게대
신 처리하여줍니다.

## 그 외

- 무한 스클롤링 지원
- 페이지 네이션
- 네트워크가 다시 연결되면 자동으로 API호출
- 재시도 횟수 설정가능

[참조](https://www.univdev.page/posts/react-query-tutorial/)
