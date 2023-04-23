const nodemailer = require('nodemailer');
require('dotenv').config();

const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: process.env.META_EMAIL,
      pass: process.env.META_PASSWORD,
    },
  }

  const transporter = nodemailer.createTransport(nodemailerConfig);

  const sendEmail = async (data) => {
    try {
      const email = { ...data, from: process.env.META_EMAIL }
      await transporter.sendMail(email)
      return true
    } catch (error) {
      throw error
    }
  }
  
  module.exports = sendEmail;
