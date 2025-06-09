
"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import {useRouter} from "next/navigation"
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
export default function LoginPage(){
    const router=useRouter()

    const [user,setUser]=React.useState({
       
        password:"",
        username:"",
    })
    const [loading,setLoading]=React.useState(false)
    const [buttonDisabled,setButtonDisabled]=React.useState(false)
    const onLogin=async()=>{
try{
setLoading(true)
const res=await axios.post("/api/users/login",user)
console.log("Login successfully",res.data)
router.push("/profile")
}
catch(e:any){
    console.log(e.message,"Login Failed")
    toast.error(e.message)
}
finally{
    setLoading(false)
}
    }
useEffect(()=>{
    if(user.username.length>0   && user.password.length>0){
        setButtonDisabled(false)
    }
    else{setButtonDisabled(true)}
},[user])

return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "Login"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-nonefocus:border-gray-600" id="username" value={user.username}
      onChange={(e)=>setUser({...user,username:e.target.value})}
      placeholder="username"
      / >
         <label htmlFor="password">password</label>
      <input type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-nonefocus:border-gray-600" id="password" value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder="password"
      / >
        
        <button onClick={onLogin} className="p-2 border border-gray-300
        rounded-lg mb-4 focus:outline-nonefocus:border-gray-600">Login</button>
    <Link href="/signup">Signup</Link>
    </div>
)
}