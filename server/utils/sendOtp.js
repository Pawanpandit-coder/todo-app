import nodemailer from 'nodemailer'

export const sendOtp = async (email, otp) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'pawankumar.pandit786@gmail.com',
            pass:'G_P.K.P@786'
        }
    })
    await transporter.sendMail({
        from:'pawankumar.pandit786@gmail.com',
        to:email,
        subject:'Todal Register Email OTP Verification',
        text:`Your OTP is ${otp}`
    })
}