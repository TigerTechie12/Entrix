import nodemailer, { Transporter } from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcrypt'
import { Types } from 'mongoose'

interface EmailParams {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: Types.ObjectId;
}

export async function sendEmail({ email, emailType, userId }: EmailParams) {
    try {
        if (!process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASSWORD || !process.env.DOMAIN) {
            throw new Error('Missing required environment variables for email service');
        }

        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }

        const transport: Transporter = nodemailer.createTransport({
            service: 'mailtrap',
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
            }
        })

        const mailOptions = {
            from: 'shrey@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions)
        return mailresponse
    } catch (e: any) {
        throw new Error(e.message)
    }
}