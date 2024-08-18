# ✨useEffect（Side Effects）

在函数式编程中，与数据计算无关的操作（如存储数据等）都称为**副效应**。

**钩子（Hooks）** 的作用是 React 函数组件处理副效应的解决方案。

包括常见的 Hook 有：
- `useState`
- `useContext`
- `useRef`
- ...

## useEffect

**官方解释：** `useEffect` 用于将组件与外部系统（例如网络、某些浏览器 API 或第三方库）同步。这些系统不受 React 控制，所以称为外部系统。

`useEffect` 是通用的副效应钩子，当找不到对应的钩子时，可以使用它。

### 使用注意事项

- `useEffect` 本身是一个函数，只能在**组件的顶层**或自己的 Hook 中调用，不能在循环或条件内部调用。

### 使用方法

- **第一个参数：** 是一个函数。每次调用 `useEffect` 时，这个函数都会执行一次。

  - 这个函数可以返回一个清理函数，在组件卸载时执行这个清理函数，清理副效应（如清理定时器函数等）。不需要清理的话，可以不写。

```jsx
function Welcome(props) {
  useEffect(() => {
    document.title = `Hello, ${props.name}`;
    return () => {
      // 做一些清理操作 取消定时器，取消事件监听等
      // 即使依赖数组是空，在组件销毁的时候也会执行一次
    }
  }, [props.name]);
  return <h1>Hello, {props.name}</h1>;
}
```

- **第二个参数：** 是一个依赖项数组。只有当依赖项发生变化时，才会重新执行 `useEffect`。

  - 如果是空数组：`useEffect` 只会在组件 DOM 初次渲染时执行一次。
  - 如果不传递任何依赖项：每次渲染都会执行一次。

### 常用使用场景

- 获取数据
- 事件监听或订阅
- 依赖状态变化
- 设置定时器
- 改变 DOM
- 输出日志
- …

### 其他注意事项

- 如果有多个不相关的副效应，应该分开写，不能合并写到一起，即使它们功能相似。


# ✨useState（状态钩子）

为函数组件引入状态

```jsx
const [index, setIndex] = useState(0);
// 从useState返回的数组中解构出index和setIndex

function handleClick() {
  setIndex(index + 1);
}
```

每次组件渲染时，`useState` 都会返回一个包含两个值的数组：

- state 变量 (index) 会保存上次渲染的值。
- state setter 函数 (setIndex) 可以更新 state 变量并触发 React 重新渲染组件
- useState的参数是state的初始值

# ✨useContext（共享状态钩子）

用来在组件之中共享状态，避免层层传递props
### 使用步骤

#### 1. 创建 Context

使用 `React.createContext` 创建一个 Context 对象。

```jsx
const MyContext = React.createContext(defaultValue);
```

#### 2. 提供 Context 值

在应用的某个部分，通过 `MyContext.Provider` 组件提供 Context 的值。

```jsx
const [theme, setTheme] = useState('light');
<MyContext.Provider value={theme}>
  <children />
   <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
   </button>
</MyContext.Provider>
```
#### 3. 获取 Context 值

在任意子组件中，通过 `useContext` Hook 直接获取 Context 的值。

```jsx
const theme = useContext(MyContext);
```

# ✨useRef（状态钩子）

`useRef` 用于创建对 DOM 元素或任意值的引用。它的主要用途是保存组件的某个值，并且在整个组件生命周期内保持不变，而不会触发重新渲染。

### 作用

1. **访问 DOM 元素**：
   - `useRef` 可以创建对 DOM 元素的引用，从而直接操作该元素，例如获取输入框的值或操作某个 HTML 元素的样式。

2. **保存可变值**：
   - `useRef` 可以保存任何可变值（如计时器的 ID、上一次渲染的值等），这个值在组件的整个生命周期内保持不变，且更新时不会触发组件的重新渲染。

### 使用场景

1. **访问和操作 DOM 元素**：
   - 在需要直接访问或操作某个 DOM 元素时，例如手动聚焦输入框、控制播放视频等。

2. **保存不会引起重渲染的变量**：
   - 当需要在组件渲染之间保存某些值（如计数器、前一个状态等），但不希望更新这些值时引起重新渲染。

# ✨useMemo (缓存计算结果)

`useMemo` 用于优化性能，主要通过缓存计算结果来避免不必要的重新计算。它可以提高组件性能，尤其是在处理计算密集型的操作时。

### useMemo 的作用

1. **缓存计算结果**：
   - `useMemo` 可以缓存一个计算结果，只有当依赖项发生变化时，才会重新计算。这有助于避免在每次渲染时重复执行昂贵的计算操作。

2. **避免不必要的渲染**：
   - 通过缓存计算结果，`useMemo` 可以防止组件因相同的计算而多次重新渲染，从而提高性能。

### 使用 useMemo 的场景

1. **计算密集型操作**：
   - 当一个计算操作需要较长时间才能完成时，使用 `useMemo` 缓存其结果，可以避免在每次渲染时重复计算。

2. **优化渲染性能**：
   - 在组件中需要传递计算结果给子组件时，`useMemo` 可以确保只有在依赖项变化时才重新计算，减少不必要的重新渲染。

### 使用方法

```jsx
import React, { useMemo, useState } from 'react';

function ExpensiveComponent({ data }) {
  const computeExpensiveValue = (data) => {
    // 假设这是一个计算密集型操作
    return data.reduce((sum, value) => sum + value, 0);
  };

  // 使用 useMemo 缓存计算结果
  const expensiveValue = useMemo(() => computeExpensiveValue(data), [data]);

  return <div>Expensive Value: {expensiveValue}</div>;
}

function App() {
  const [data, setData] = useState([1, 2, 3, 4, 5]);

  return (
    <div>
      <ExpensiveComponent data={data} />
      <button onClick={() => setData([...data, data.length + 1])}>
        Add Data
      </button>
    </div>
  );
}

export default App;
```

# ✨useCallback （缓存函数）

`useCallback` 用于缓存函数，以避免在每次组件渲染时创建新的函数实例。它与 `useMemo` 相似，但 `useCallback` 专注于函数的缓存。

### useCallback 的作用

1. **缓存函数**：
   - `useCallback` 可以缓存一个函数的实例，只有在依赖项发生变化时才重新创建函数。这有助于避免在每次组件渲染时创建新的函数实例，从而减少不必要的渲染。

2. **优化性能**：
   - 通过缓存函数，`useCallback` 可以避免传递新函数实例给子组件，从而防止不必要的子组件重新渲染，提升应用性能。

### 使用 useCallback 的场景

1. **传递回调函数给子组件**：
   - 当你将函数作为属性传递给子组件时，`useCallback` 可以确保只有在依赖项变化时，才重新创建函数，避免子组件因函数实例的变化而重新渲染。

2. **事件处理**：
   - 当处理组件内的事件时，`useCallback` 可以避免事件处理函数在每次渲染时都重新创建，从而提升性能。

### 使用方法

```jsx
import React, { useState, useCallback } from 'react';

function ChildComponent({ onClick }) {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
}

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 缓存处理函数
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // 空数组表示只有第一次渲染时创建函数

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p>Count: {count}</p>
    </div>
  );
}

export default ParentComponent;
```

# ✨useReducer （状态管理）

`useReducer` 用于管理复杂的状态逻辑。它类似于 `useState`，但提供了更强大的状态管理功能，特别适用于状态更新逻辑复杂或状态依赖于多个值的场景。

### useReducer 的作用

1. **状态管理**：
   - `useReducer` 用于管理和更新组件状态，尤其是当状态更新逻辑复杂时。它使得状态更新逻辑更加集中、可维护。

2. **复杂状态逻辑**：
   - 当组件有复杂的状态逻辑，涉及到多个子状态或状态的依赖关系时，`useReducer` 提供了一种结构化的方式来处理这些逻辑。

### 使用 useReducer 的场景

1. **复杂状态更新**：
   - 当状态更新依赖于多个子状态或多个操作时，`useReducer` 可以帮助将这些逻辑集中在一个地方，使得状态更新更可预测和可维护。

2. **处理多个状态值**：
   - 当需要管理多个相关的状态值时，`useReducer` 可以将它们整合到一个状态对象中，从而简化状态管理。

### 使用方法

`useReducer` 接受两个参数：
1. **reducer 函数**：一个函数，用于定义如何更新状态。它接收当前状态和一个动作对象，并返回更新后的状态。
2. **初始状态**：状态的初始值。

```jsx
import React, { useReducer } from 'react';

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  // 使用 useReducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

export default Counter;
```