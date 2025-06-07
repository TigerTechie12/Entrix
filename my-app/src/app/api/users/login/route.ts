import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
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


}
catch(e:any){
return NextResponse.json({error:e.message},
    {status:500}
)
}

}