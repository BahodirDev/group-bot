import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendTelegramMessage = async (text) => {
  console.log("text=>", text);

  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await axios.post(url, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
    });
  } catch (err) {
    console.error("Telegram error:", err.message);
  }
};

export default sendTelegramMessage;
