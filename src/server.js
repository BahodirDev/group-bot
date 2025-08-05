import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import sendTelegramMessage from "./telegram.js";
import bootstrap from "./config/bot-test.js";
import pkg from "./generated/prisma/client.js"; // agar `output` yozmagan bo'lsangiz
const { PrismaClient } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1 dona PrismaClient yaratamiz — global
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

bootstrap(); // faqat 1 marta chaqiramiz

app.post("/api/submit", async (req, res) => {
  const { name, phone, company } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  try {
    const newUser = await prisma.users.create({
      data: {
        name,
        phone,
        company,
        status: "PROCESS", // ENUM qiymat to'g'riligini tekshirib chiqing
      },
    });

    const message = `📩 Yangi ariza\n👤 Ism: ${name}\n📞 Tel: ${phone}\n🏢 Kompaniya: ${
      company || "yo'q"
    }`;
    await sendTelegramMessage(message);

    return res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error("Insert error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
