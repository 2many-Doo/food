import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const { EMAIL_PASSWORD, EMAIL_USER } = process.env;

const transport = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export const sendUserVerificationLink = async (
  baseURL: string,
  email: string
) => {
  await transport.sendMail({
    subject: "User Verification link",
    to: email,
    from: EMAIL_USER,
    html: `
<div>
<h1>User Verification link</h1>
<p>This verification link is valid for 1 hour</p>
<a href="${baseURL}">Verify</a>
</div>
        `,
  });
};
