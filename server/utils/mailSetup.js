import { promisify } from 'util'
import { randomBytes } from 'crypto'
import {createTransport} from 'nodemailer'
// Create randomBytes that will be used as a token
const randomBytesPromisified = promisify(randomBytes);
const resetToken = (await randomBytesPromisified(20)).toString("hex");
const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now\

// Login gmail account
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  }
})

// Reset Mail options for sending email
const resetMailOptions = {
  from: process.env.EMAIL_ACCOUNT,
  subject: "Password Reset",
  text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://localhost:3000/reset/${resetToken}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
}

export { transporter, resetMailOptions, resetToken, resetTokenExpiry, randomBytesPromisified }