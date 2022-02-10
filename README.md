# Studylog

## #2. Styled Components

### #2.0~ Setting the project

1. create-react-app으로 프로젝트 생성하기

```
$ npx create-react-app react-master
```

2. 그리고 VScode에서 해당 프로젝트 열고 App.js와 index.js 빼고 모두 지우기
3. 그 이후로 서버 실행할 때마다 $ npm start 하면 된다.

### #2.1~ Styled Component

#### 설치

```
$ npm i styled-components
```

그리고 extension: vscode-styled-components

#### 설정

```
import styled from "styled-components";
```

#### 사용

```
// Before
<div style={{ dispaly: "flex" }}></div>

// After
const Fater = styled.div`
  dispaly: flex;
`;

<Father></Father>
```

back tik 안에는 CSS 문법 쓰듯이 쓰면 된다.

### #2.3~ As and Attrs

#### As

이미 만들어 놓은 컴포넌트를 다른 애(?)로 쓸 때 사용
예를 들어 div로 선언 된 Father를 아래처럼 선안하면 header로 쓸 수 있다.

```
<Fater as="header">
```

그 외에 button으로 만든 애를 a로 쓰는 것도 가능

#### Attrs

Attributes의 줄임말임
컴포넌트에 속성을 주고 싶을 때 똑같이 styled를 사용해서 줄 수 있음

```
// Before
<Input required minLength=10 />
<Input required minLength=10 />
<Input required minLength=10 />

// After
const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;
```

### #2.4 Animations and Pseudo selectors

#### keyframes

애니메이션 쓰려면 styled에서 keyframes라는 함수를 import 해야해

```
import styled, { keyframes } from "styled-components";

const rotationAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotationAnimation} 1s linear infinite;
`;
```

#### Component 내에 있는 애 스타일 설정하기

아래처럼 Box안에 span을 만들었을 떄 span에 대한 스타일 설정을 Box에서 할 수 있어

```
<Box>
  <span>😁</span>
</Box>
```

참고로 span 안의 &:는 span 바깥에서 span:hover 한 거랑 같음

```
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;

  span {
    font-size: 40px;
    &:hover {
      font-size: 100px;
    }
  }
`;
```

따로 선언한 다음에 안에서 호출할 수도 있어

```
const Emoji = styled.span`
  font-size: 40px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 3s linear infinite;

  ${Emoji}:hover {
    font-size: 100px;
  }
`;

<Box>
  <Emoji>😁</Emoji>
</Box>
<Emoji>👽</Emoji>
```

그러면 스마일에는 hover 동작하지만 외계인에는 동작하지 않음

### #2.7 Theme

theme 설정하려면 우선 index.js에서 app을 themeprovider로 묶어야 함

```
import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

지금 App이 ThemeProvide로 묶여있고 darkTheme이 선택되어 있기 때문에
App.js에서 props로 가져다 쓸 수 있음

```
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hi</Title>
    </Wrapper>
  );
}
```

## #3 Typescript

### #3.2~ Using Interface

#### Interface?
Object를 설명하는 애
```
interface playerProps {
  name: string;
  age: number;
}
const sayHello = (playerObject: playerProps) => `Hello, ${playerObject.name}`;

sayHello({name:"ellie", age:29});
```

#### required, optional
```
interface CircleProps { // interface explains "object"
  bgColor: string; // required
  borderColor?: string; // optional
}
```

#### 모든 설정을 넘겨주고 싶지 않은 경우
한 곳에만 borderColor를 넘겨주고 싶어서 css(container)에는 required로 지정해야하고 circle에는 optional로 지정해야 할 때
```
interface CircleProps { // interface explains "object"
  bgColor: string; // required
  borderColor?: string; // optional
}

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
```
위에 처럼 container는 required로 주고 circle는 optional로 준다.

```
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 100px;
  border: 5px solid ${props => props.borderColor}; // CSS에서는 borderColor가 required
`;
```
그럼 위에처럼 css 설정할 때 border값을 넣어줄 수 있음

```
function Circle({bgColor, borderColor}: CircleProps) {
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor } />;
}
```
그리고 위에처럼 circle로 넘길 때 optional인 애는 그 값이 넘어오지 않을 경우 default 값을 같이 넘겨준다고 설정한다
위의 예시에서는 디폴트 값으로 bgColor를 넘김 예를 들어 "black" 이렇게도 넘길 수 있어

### #3.4 useState
value가 string 일 수도 있고 number일 수도 있을 때
```
const [value, setValue] = useState<number|string>(0);
  setValue(2);
  setValue("hi");
```

## #4 CRYPTO TRACKER

### #4.0 Set up
latest가 6.x 버전인데 리뉴얼 되면서 문법이 바뀌어서 수업은 5.3.0으로 진행하도록 하자
```
npm i eact-router-dom@5.3.0 react-query
npm i --save-dev @types/react-router-dom
```

#### 설계
/ -> All coins (HOME)
/:id -> /btc -> coin detail

/btc/information
/btc/chart

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
