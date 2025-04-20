// app/api/mail/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Tüm alanlar zorunludur.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // SMTP sağlayıcınız
    port: 465, // veya 587
    secure: true, // Eğer port 465 ise true, 587 ise false
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Site Formu" <${process.env.SMTP_USER}>`,
      to: 'info@bayrakdardijital.com', // Hedef e-posta adresi
      subject: 'Yeni Form Mesajı',
      html: `
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Mesaj:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Mesaj başarıyla gönderildi.' });
  } catch (error) {
    console.error('SMTP Hatası:', error);
    return NextResponse.json({ message: 'Mesaj gönderilirken bir hata oluştu.' }, { status: 500 });
  }
}
