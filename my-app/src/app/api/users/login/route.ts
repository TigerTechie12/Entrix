import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request:NextRequest,response:NextResponse){
try{
 const reqBody=await request.json()
 const {username,password}=reqBody
 console.log(reqBody)
 const user=await User.findOne({username})
 if(!user){return NextResponse.json({message:"User doesn't exist"},{status:400})}
const validPassword=await bcrypt.compare(password,user.password)
if(!validPassword){
    return NextResponse.json({message:"Invalid Password"},{status:400})
}
const tokenData={
    id:user._id,
    username:user.username,
    email:user.email
}

if (!process.env.TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined in environment variables');
}

const token =await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:"1d"});
const response=NextResponse.json({
    message:"login successful",
    success:true,
})
response.cookies.set("token",token,{
    httpOnly:true,
})
return response
}
catch(e:any){
return NextResponse.json({error:e.message},
    {status:500}
)
}

}