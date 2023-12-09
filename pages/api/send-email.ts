// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request
  if (req.method === 'POST') {
    // Extract data from request body
    const { data } = req.body;

    try {
      // Feedback email
      await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: 'Neues Portfolio Feedback',
        html: data,
      });

      return res.status(200).send('Emails sent successfully!');
    } catch (error) {
      console.error('Email sending failed:', error);
      return res.status(500).send('Internal Server Error');
    }
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}
