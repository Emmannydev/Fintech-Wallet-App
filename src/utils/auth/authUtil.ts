import crypto from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;
// console.log("the secret is", process.env.API_SECRET, process.env.API_KEY);
const secret = process.env.API_SECRET || "h";
// console.log("after secret the secret is", process.env.API_SECRET);
export const httpAuth = (path: string, method: string, body: any) => {
  const date = new Date().toISOString();
  const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, secret);

  hmac.update(date);
  hmac.update(path);
  hmac.update(method);

  if (body) {
    console.log("the body section is running",body);
    let bodyHmac = crypto
      .SHA256(JSON.stringify(body))
      .toString(crypto.enc.Base64);

      // crypto.createHash('sha256').update(requestBody).digest('base64') 
    hmac.update(bodyHmac);
  }

  const hash = hmac.finalize();
  const signature = crypto.enc.Base64.stringify(hash);

  return {
    "X-YC-Timestamp": date,
    Authorization: `YcHmacV1 ${apiKey}:${signature}`,
  };
};
