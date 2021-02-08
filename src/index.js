require("dotenv/config");
const Telegram = require("node-telegram-bot-api");

const dialogflow = require("./dialogflow");
const youtube = require("./youtube");

const token = process.env.TELEGRAM_TOKEN;

const bot = new Telegram(token, { polling: true });

bot.on("message", async (msg) => {
  const { id: chatId } = msg.chat;

  const response = await dialogflow.sendMessage(chatId.toString(), msg.text);

  const responseText = await youtube.searchVideo(response.text, msg);

  bot.sendMessage(chatId, responseText);
});
