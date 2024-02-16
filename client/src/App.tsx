import { useState } from 'react'
import Login from './components/Login'
import Home from './Home';

const App = () => {
  const [username, setUsername] = useState<string>("");

  // console.log(username)

  return username ?
  (
    <Home username={username}/>
  )
  :
  (
    <Login onSubmit={setUsername}/>
  )
  // return (
  //   <div>
  //     <Login onSubmit={setUsername}/>
  //   </div>
  // )
}

export default App