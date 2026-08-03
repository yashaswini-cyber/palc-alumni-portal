import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendOTPEmail } from "./emailService.js";

dotenv.config();

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