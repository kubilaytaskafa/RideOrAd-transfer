import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendBookingConfirmation = async (bookingData) => {
  const {
    name,
    email,
    phone,
    pickupLocation,
    dropoffLocation,
    date,
    time,
    passengers,
    vehicleType,
  } = bookingData;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL, // Yönetici mail adresi
    subject: "Yeni Transfer Rezervasyonu",
    html: `
      <h2>Yeni Rezervasyon Bilgileri</h2>
      <p><strong>Müşteri Adı:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Alış Noktası:</strong> ${pickupLocation}</p>
      <p><strong>Bırakış Noktası:</strong> ${dropoffLocation}</p>
      <p><strong>Tarih:</strong> ${date}</p>
      <p><strong>Saat:</strong> ${time}</p>
      <p><strong>Yolcu Sayısı:</strong> ${passengers}</p>
      <p><strong>Araç Tipi:</strong> ${vehicleType}</p>
    `,
  };

  // Müşteriye gönderilecek onay maili
  const customerMailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Transfer Rezervasyonunuz Alındı",
    html: `
      <h2>Sayın ${name},</h2>
      <p>Transfer rezervasyonunuz başarıyla alınmıştır. Rezervasyon detaylarınız aşağıdadır:</p>
      <p><strong>Alış Noktası:</strong> ${pickupLocation}</p>
      <p><strong>Bırakış Noktası:</strong> ${dropoffLocation}</p>
      <p><strong>Tarih:</strong> ${date}</p>
      <p><strong>Saat:</strong> ${time}</p>
      <p><strong>Yolcu Sayısı:</strong> ${passengers}</p>
      <p><strong>Araç Tipi:</strong> ${vehicleType}</p>
      <br>
      <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
      <p>Teşekkür ederiz.</p>
      <p>VIP Transfer</p>
    `,
  };

  try {
    // Yöneticiye bildirim maili
    await transporter.sendMail(mailOptions);
    // Müşteriye onay maili
    await transporter.sendMail(customerMailOptions);
    return true;
  } catch (error) {
    console.error("Mail gönderimi hatası:", error);
    return false;
  }
};
