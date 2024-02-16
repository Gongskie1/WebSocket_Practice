// import React from 'react'
import { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import throttle from "lodash.throttle";
import { Cursor } from './components/Cursor';
interface typeCast{
  username:string
}

interface UserType {
  state: {
    x: number;
    y: number;
  };
}

const renderCursors = (users: { [key: string]: UserType }) => {
  return Object.keys(users).map((uuid: string) => {
    const user = users[uuid];
    
    return (
      <Cursor key={uuid} point={[user.state.x, user.state.y]}/>
    )
  });
}


const Home = ({username} : typeCast) => {
  const [socketUrl] = useState<string>("ws://localhost:8080")
  const {sendJsonMessage, lastJsonMessage} = useWebSocket(socketUrl, {
    queryParams:{ username}
  });

  const THROTTLE = 50;
  const sendJsonMessageThrottle = useRef(throttle(sendJsonMessage, THROTTLE));

  // throttle()

  useEffect(() =>{
    sendJsonMessage({
      x:0,
      y:0
    })
    window.addEventListener("mousemove", e => {
      sendJsonMessageThrottle.current({
        x:e.clientX,
        y:e.clientY
      })
    })
  },[]);

  if (lastJsonMessage) {
  return (
    <>
      {renderCursors(lastJsonMessage as { [key: string]: UserType })}
    </>
  );
}

  return (
    <div>{username}</div>
  )
}

export default Home