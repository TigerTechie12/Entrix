"use client"
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import React,{useState} from 'react'
export default function ProfilePage(){
    const router=useRouter()
    const [data,setData]=React.useState("nothing")
 async function logout(){
try{
    const res=await axios.get("/api/users/logout")
    toast.success('Logout successful')
    router.push('/login')
}
catch(e:any){
    console.log(e.message)
toast.error(e.message)
}
 
}
async function getUserDetails(){
    const res=await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
}

    return (
        <div className="flex flex-col items-center justify-center 
        min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className='p-1 rounded bg-green-500'>{data==='nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-whitefont-bold py-2 px-4 rounded">Logout</button>
 <button onClick={getUserDetails} className="bg-purple-900 mt-4 hover:bg-purple-500 text-whitefont-bold py-2 px-4 rounded">Get User Details</button>
                
        </div>
    )
}