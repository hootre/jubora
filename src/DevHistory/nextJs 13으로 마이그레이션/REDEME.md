# nextJs 13으로 마이그레이션

기본 nextJs12v을 사용하다가 프로젝트를 진행하는 도중에 13v이 나와서 이참에 적용해보려고한다.

아래는 next13v 업데이트 정리된 내용이다.

> - app/디렉토리

- 레이아웃
- React 서버 컴포넌트
- 스트리밍
- Turbopack
- next/image
- @next/font
- next/link

## app/Directory

13v 들어서 가장 큰 변화는 app 디렉토리이다. 12v 까지 사용하던 src/page 라우팅에서 app/page로 바뀐 것
입니다.

### Pages 라우터

```javascript
// pages/_app.js

// 이 "전역 레이아웃"은 모든 라우트를 감싸게 됩니다.
// 다른 레이아웃 컴포넌트를 구성하는 방법은 없습니다.
// 또한 이 파일로부터 전역 데이터를 가져올 수 없습니다.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

기존 Page 라우터에서는 레이아웃을 구성할 수 없고, 컴포넌트와 함께 데이터 패칭을 사용 할 수 없었습니
다.

### 새로운 App 라우터 ✨

```javascript
// app/layout.js
//
// 루트 레이아웃은 전체 애플리케이션에서 공유됩니다.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/dashboard/layout.js
//
// 레이아웃은 중첩될 수 있고 구성될 수도 있습니다.
export default function DashboardLayout({ children }) {
  return (
    <section>
      <h1>Dashboard</h1>
      {children}
    </section>
  );
}
```

<img src="https://nextjs.org/_next/image?url=%2Fstatic%2Fblog%2Flayouts-rfc%2Fapp-folder.png&w=3840&q=75">

### Component Hierarchy

- layout.js
- template.js
- error.js (React error boundary)
- loading.js (React suspense boundary)
- not-found.js (React error boundary)
- page.js or nested layout.js
  <img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=1920&q=75">

### Server Component

app 디렉토리에서 돌아가는 모든 컴포넌트들은 기본적으로 server component이고 클라이언트로 보내는 자바
스크립트 양을 줄일 수 있어 빠르게 페이지 로딩이 가능하다고 설명한다.

### Streaming

서버 사이드 단에서 컴포넌트를 점진적으로 렌더링 한뒤 스트리밍 방식으로 클라이언트에 전달하는 방식이
다.

고정적인 레이아웃 부분은 data fetch 전에 렌더링하고 이후 다른 부분은 data fetch가 끝나면 그 이후에별
도로 렌더링한뒤 클라이언트에 전달된다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FSArNR%2FbtrPDrVYWKd%2FgVECvKTWemQ7ZmqCMbEuy1%2Fimg.png">

### Turbopack (beta)

Rust 기반의 새로운 번들어

기존에 webpack이였지만 이를 대체하기 위해 Rust 기반에 번들러인 Turbopack을 공개하였다아직은 beta버전
이다.
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FqTuYN%2FbtrPIQOHzjn%2F7yZWVu1gZlY8x35WEHDPUk%2Fimg.png">

### next/image

별로 차이가 없다한다

### @next/font

CSS와 폰트 파일을 빌드 타임에 다운로드하고 나머지 static asset파일들과 함께 셀프 호스팅된다.

- 자동으로 최적화된 기본 글꼴 및 커스텀 글꼴 제공.
- 프라이버시와 퍼포먼스 향상을 위해 외부 네트워크 요청 방식을 제거.
- 모든 글꼴 파일을 위한 자동 셀프 호스팅 방식.
- css의 size-adjust 프로퍼티를 이용한 Layout shift 요소 제거.

#### google font

```javascript
import { Inter } from '@next/font/google';

const inter = Inter();

<html className={inter.className}>
```

#### custom font

```javascript
import localFont from '@next/font/local';

const myFont = localFont({ src: './my-font.woff2' });

<html className={myFont.className}>
```

[참조](https://www.univdev.page/posts/react-query-tutorial/)
