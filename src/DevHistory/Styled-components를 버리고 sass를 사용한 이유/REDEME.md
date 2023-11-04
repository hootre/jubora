# Styled-components를 버리고 postCss를 사용한 이유

## styled-components

원래는 CSS-in-JS인 styled-components를 사용하여 프로젝트를 제작하였는데사용하면서 초기 render보다 느
린 css가 불만족 스러웠고또한 css엔진을 따로 사용하지 않고 js엔진을 같이 사용하기에성능적인 부분에서
도 불만족스러워서 tailwind와 postCSS를 같이 사용하기로 하였다

- tailwind같은 경우는 개인적인 생각으로 가독성이 떨어지고 다소 난잡하여주로 postCSS를 사용하여 제작
  하고 tailwind같은 경우는 일부분만 사용할 예정이다.

## sass

CSS 전처리기이며, 변수를 사용할 수 있고 next.js에서 기본 modul.css를 지원하고 있어서 className 중첩
되는 경우도 피할 수 있다.

### 전처리기

화면에 보여주기 전에 (렌더링 전) CSS를 변경해서, 스타일을 보여준다사용자가 작성하기 쉬운 코드로 작성
-> 기본 CSS변환 -> 렌더링

### 후처리기

화면에 보여주고 나서, CSS변경기본 CSS파일 작성 -> 렌더링 -> 외부 프로그램 사용해서 스타일 변경

전처리기 : Scss, Stylus, Less 후처리기 : PostCSS

```

```
