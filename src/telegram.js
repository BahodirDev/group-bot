import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendTelegramMessage = async (text, userId) => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const inline_keyboard = [
    [
      { text: "🟡 PROCESS", callback_data: `status:PROCESS:${userId}` },
      { text: "🆕 NEW", callback_data: `status:NEW:${userId}` },
    ],
    [
      { text: "✅ DONE", callback_data: `status:DONE:${userId}` },
      { text: "❌ CANCELED", callback_data: `status:CANCELED:${userId}` },
    ],
  ];

  try {
    await axios.post(url, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
      reply_markup: { inline_keyboard },
    });
  } catch (err) {
    console.error("Telegram error:", err.message);
  }
};

export default sendTelegramMessage;
