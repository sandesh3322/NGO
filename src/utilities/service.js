require('dotenv').config()

const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

const notifyAdminOnWhatsApp = async (data) => {
  const message = `
 New Contact Message

 Name: ${data.name}
 Email: ${data.email}
 Phone: ${data.phone || "N/A"}
 Subject: ${data.subject}

 Message:
${data.message}
`;

  await client.messages.create({
    from: "whatsapp:+14155238886",
    to: "whatsapp:"+ process.env.ADMIN_PHONE_NUMBER, // admin number
    body: message,
  });
};

module.exports = notifyAdminOnWhatsApp;
