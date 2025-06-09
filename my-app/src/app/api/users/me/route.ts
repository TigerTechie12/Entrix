import {getDatafromToken} from "@/helpers/getDatafromToken"
import { NextRequest,NextResponse } from "next/server"
import User from "@/models/userModel"
import {connect} from "@/dbConfig/dbConfig"

connect()

export async function GET(request:NextRequest) {
    try{
        const userId=await getDatafromToken(request)
        const user=await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({
            message:"User found",
            data:user
        })
    }
    catch(e:any){
        return NextResponse.json({error:e.message},{status:400})
    }
}