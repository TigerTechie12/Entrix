"use client"
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
const router=useRouter()
export default function ProfilePage(){
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
    return (
        <div className="flex flex-col items-center justify-center 
        min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-whitefont-bold py-2 px-4 rounded">Logout</button>
        </div>
    )
}