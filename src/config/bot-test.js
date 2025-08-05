import { Telegraf } from "telegraf";

export default function bootstrap() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  console.log("token", token);

  const bot = new Telegraf(token); // bu yerga o'zingizning tokenni qo'ying

  bot.start((ctx) => ctx.reply("Assalomu alaykum! Bot ishga tushdi."));
  bot.help((ctx) => ctx.reply("Savollaringiz bo‘lsa, yozing."));
  bot.on("text", (ctx) => ctx.reply(`Siz yubordingiz: ${ctx.message.text}`));

  bot.launch();
}
