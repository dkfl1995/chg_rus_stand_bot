import axios from 'axios'
import commands from './commands/commands.ts'
import { config } from 'dotenv'
import express, { Request, Response } from 'express'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { Bot, webhookCallback } from 'grammy'

config()
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
});

const bot = new Bot(process.env.TELEGRAM_API_TOKEN);

app.post('/webhook', webhookCallback(bot, 'express'));

bot.on('message', async (ctx) => {
  console.log(ctx.message.text);
  await ctx.replyWithChatAction('typing');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await ctx.reply('Здравтвуй, дорогой!')
});
// app.post('/new-message', async (req: Request, res: Response) => {
//   const message: Message = req.body.message;
//   console.log(message?.chat?.id);

//   // const messageText = message?.text?.toLowerCase()?.trim()
//   // const chatId = message?.chat?.id
//   // if (!messageText || !chatId) {
//   //   return res.sendStatus(400)
//   // }

//   // google spreadsheet
//   // await doc.loadInfo()
//   // const sheet = doc.sheetsByIndex[0]
//   // const rows = await sheet.getRows()
//   // const dataFromSpreadsheet = rows.reduce((obj, row) => {
//   //   if (row.date) {
//   //     const todo = { text: row.text, done: row.done }
//   //     obj[row.date] = obj[row.date] ? [...obj[row.date], todo] : [todo]
//   //   }
//   //   return obj
//   // }, {})
// });

console.log({ PUBLIC_SEC_IP: process.env.PUBLIC_SEC_IP });
await bot.api.setWebhook(`${process.env.PUBLIC_SEC_IP}/webhook`);
await bot.api.setMyCommands(commands);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
