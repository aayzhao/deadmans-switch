import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: process.env.SENDGRID_TO_EMAIL,
  from: process.env.SENDGRID_FROM_EMAIL,
  subject: "Sent from Lifeline",
  text: "Hello, world!",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
