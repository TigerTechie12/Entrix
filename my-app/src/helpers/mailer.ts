import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcrypt'

export async function sendEmail({email,emailType,userId}:any){
try{
const hashedToken=await bcrypt.hash(userId.toString(),10)
if(emailType==="VERIFY"){await User.findByIdAndUpdate(userId,{
    verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000
})}
else if(emailType==="RESET"){
    await User.findByIdAndUpdate(userId,{
        verifyToken:hashedToken,
        verifyTokenExpiry:Date.now()+3600000
    })
}

var transport=nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth:{  user :"c68e99e7e4c441",
  password : "fe8d9638d5af0e"}

}
)
const mailOptions={
    from:'shrey@gmail.com',
    to:email,
    subject:emailType=="VERIFY"?"Verify your email":"Reset your password",
    html:`<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a>to${emailType==="VERIFY" ? "verify your email":"reset your password"}</p>`
}
const mailresponse=await transport.sendMail(mailOptions)
return mailresponse;
}
catch(e:any){
    throw new Error(e.message)
}
}