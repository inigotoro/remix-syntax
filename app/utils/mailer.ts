import nodemailer from 'nodemailer';

export async function sendEmail({
  to,
  text
}: {
  to: string,
  text: string
}) {

  const {user, pass} = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user,
      pass
    }
  });

  const info = await transporter.sendMail({
    from: 'Syntax <test@syntax.fm>',
    to,
    subject: 'potluck message',
    text
  });

  console.log(nodemailer.getTestMessageUrl(info));

  return 'success';
}