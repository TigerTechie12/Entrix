
"use client"
import Link from "next/link"
import React from "react"
import {useRouter} from "next/navigation"
import axios from 'axios'
export default function LoginPage(){
    const [user,setUser]=React.useState({
       
        password:"",
        username:"",
    })
    const onLogin=async()=>{

    }
return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
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