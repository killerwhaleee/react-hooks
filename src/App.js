import { useEffect, useState, createContext } from "react";
import Count from "./Count";

export const CountContext = createContext();

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <CountContext.Provider value={[count, setCount]}>
      <Count />
      <p className="text-2xl">App Count: {count}</p>
    </CountContext.Provider>
  );
}

export default App;
