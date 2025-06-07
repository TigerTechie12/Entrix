import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
connect()

export async function POST(request:NextRequest, response:NextResponse)
{
try{
    const reqBody=await request.json()
    const {username,email,password}=reqBody
    console.log(reqBody)
const userExist=await User.findOne({email})
if(userExist){
return NextResponse.json({message:"User already exists"},
    {status:400}
)
}
const salt= await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash
(password,salt)
const newUser=new User({
    username,
    email,
    password:hashedPassword
}) 
const savedUser=await newUser.save()
console.log(savedUser)
return NextResponse.json({message:"user created successfully",
    success:true,
    savedUser
})
}
catch(e:any){
return NextResponse.json({error:e.message},
    {status:500}
)
}
}