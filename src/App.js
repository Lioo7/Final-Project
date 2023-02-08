import React, { useState, useEffect } from 'react'
import HomeScreen from './components/Home/HomeScreen'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'


function App() {

  const [data, setData] = useState("")

  useEffect(() => {
    fetch("/members").
      then(res => res.json()).
      then(data => {
        setData(data)
        console.log(data)
      }
      )
  }, [])


  return (
    <div>
       <HomeScreen /> 
       {/* <Login /> */}
       {/* <SignUp /> */}
    </div>
  )
}

export default App