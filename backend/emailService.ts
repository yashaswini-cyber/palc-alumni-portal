import "isomorphic-fetch";
import dotenv from "dotenv";
dotenv.config();
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";

const tenantId = process.env.AZURE_TENANT_ID?.trim();
const clientId = process.env.AZURE_CLIENT_ID?.trim();
const clientSecret = process.env.AZURE_CLIENT_SECRET?.trim();

console.log("Tenant:", tenantId);
console.log("Client:", clientId);
console.log("Secret Loaded:", !!clientSecret);

const credential = new ClientSecretCredential(
  tenantId!,
  clientId!,
  clientSecret!
);

const graphClient = Client.init({
  authProvider: async (done) => {
    try {
      const token = await credential.getToken(
        "https://graph.microsoft.com/.default"
      );

      done(null, token?.token ?? "");
    } catch (error) {
      done(error as Error, null);
    }
  },
});

export async function sendOTPEmail(
  to: string,
  otp: string
): Promise<void> {
  await graphClient.api(`/users/${process.env.MAIL_FROM}/sendMail`).post({
    message: {
      subject: "PalC Alumni Portal OTP Verification",

      body: {
        contentType: "HTML",
        content: `
          <h2>PalC Alumni Portal</h2>
          <p>Your verification code is:</p>
          <h1>${otp}</h1>
          <p>This OTP expires shortly.</p>
        `,
      },

      toRecipients: [
        {
          emailAddress: {
            address: to,
          },
        },
      ],
    },

    saveToSentItems: true,
  });
}