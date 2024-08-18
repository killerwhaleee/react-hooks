import { useEffect, useState, useContext, useRef } from "react";
import { Button } from 'antd';
import { CountContext } from "./App";
function Count() {
  // const [count, setCount] = useState(0)
  const [count, setCount] = useContext(CountContext)
  const countRef = useRef(0)
  const inputRef = useRef(null);

  useEffect(()=>{
    console.log('count is :', count);
    
  }, [count])

  function handleCilck() {
    setCount(count+1) // 触发组件的重新渲染
    countRef.current++ // 不会触发重新渲染

    inputRef.current.focus();
    
    console.log('count', count); // 此时打印的是旧值
    console.log('countRef', countRef);
  }

  return (
    <div className="p-5 font-semibold">
     <p className="text-2xl">Count: {count}</p>
     <Button className="w-24 h-10 rounded my-4 mr-4 text-xl" onClick={handleCilck}>+</Button>
     <Button className="w-24 h-10 rounded my-4 text-2xl" onClick={()=>{setCount(count-1)}}>-</Button>
     <input ref={inputRef} type="text" />
    </div>
  );
}

export default Count;
