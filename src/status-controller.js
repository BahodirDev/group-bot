import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import pkg from "./generated/prisma/client.js"; // PrismaClient import
const { PrismaClient } = pkg;

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const prisma = new PrismaClient();

// callback query ni tutamiz
bot.on("callback_query", async (ctx) => {
  const chatId = ctx.callbackQuery.message.chat.id;
  const data = ctx.callbackQuery.data; // status:NEW:uuid

  const [prefix, status, userId] = data.split(":");

  if (prefix !== "status") return;

  try {
    await prisma.users.update({
      where: { id: userId },
      data: { status, edited_at: new Date() },
    });

    await ctx.answerCbQuery(`✅ Status o'zgartirildi: ${status}`, {
      show_alert: false,
    });

    await ctx.telegram.sendMessage(
      chatId,
      `📝 ID: <code>${userId}</code>\n🔄 Status: <b>${status}</b>`,
      {
        parse_mode: "HTML",
        reply_to_message_id: ctx.callbackQuery.message.message_id,
      }
    );
  } catch (err) {
    console.error("Status update error:", err.message);
    await ctx.answerCbQuery("❌ Xatolik yuz berdi!", { show_alert: true });
  }
});

// 👉 botni ishga tushiramiz:
export default function StatusController() {
  bot.launch(); // ⚠️ BU MUHIM!
  console.log("🤖 Bot is running...");
}
