import {useState} from 'react'

interface typeCast {
    onSubmit: (username: string) => void
}

const Login = ({onSubmit}:typeCast) => {
    const [username, setUsername] = useState<string>("");
  return (
    <>
        <h1>Welcome</h1>
        <p>What should people call you?</p>
        <form onSubmit={(e) =>{
            e.preventDefault()
            onSubmit(username)
        }}>
            <input 
                type="text"
                value={username}
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
                />
            <input type="submit" />
        </form>
    </>
  )
}

export default Login