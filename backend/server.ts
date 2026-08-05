import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//ignore below error, otp still arrives in mail.
import { sendOTPEmail } from "./emailService";

dotenv.config();
console.log("TENANT =", process.env.AZURE_TENANT_ID);
console.log("CLIENT =", process.env.AZURE_CLIENT_ID);
console.log("SECRET =", process.env.AZURE_CLIENT_SECRET ? "Loaded" : "Missing");
console.log("MAIL =", process.env.MAIL_FROM);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PalC Alumni Backend Running");
});
app.post("/api/send-otp", async (req, res) => {
    try{
    const { email, otp } = req.body;

    console.log("OTP REQUEST");
    console.log("Email :", email);
    console.log("OTP   :", otp);
    console.log("=================================");
    await sendOTPEmail(email, otp);
    res.json({
        success: true
    });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false
        });
    }

});
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});