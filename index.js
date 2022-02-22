const spawn = require("child_process").spawn;
const fs = require('fs')
var fetch = require('node-fetch');
var cron = require('node-cron');
// const Iconv = require('iconv').Iconv;

const { Telegraf } = require('telegraf')
const extra = require('telegraf/extra')
const markup = extra.markdown()

const bot = new Telegraf(process.env.BOT)
bot.start((ctx) => ctx.reply('Ну вводите, вводите'))
bot.help((ctx) => ctx.reply('Слава белым'))
bot.on('text', async (ctx) => {
    let input = ctx.message.text.toString()
    console.log(input)
    let translated = await translate(input)
    translated = '*' + translated
    translated = translated.replace(/\r\n/g, '\n\n')
    var match = /\r|\n/.exec(translated);
    if (match) {
        translated = translated.replace(/\n/, '*\n')
    } else {
        translated = translated + '*'
    }
    
    console.log(translated)
    ctx.replyWithMarkdown(translated + '\n' + '\n' +'[Наш Канал](https://t.me/maguraINF)', { disable_web_page_preview: true })
    ctx.telegram.sendMessage('@aiusdhfiuashfa', translated + '\n' + '\n' +'[Наш Канал](https://t.me/maguraINF)', { disable_web_page_preview: true, parse_mode: 'Markdown' })

    
})

async function currency() {
    let usd = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=USD').then(res => res.json()).then(data => data[0].rate)
    let eur = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=EUR').then(res => res.json()).then(data => data[0].rate)
    let rub = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=RUB').then(res => res.json()).then(data => data[0].rate)
    let message = `💰Курс валют на сьогодні: \nUSD - ${usd} \nEUR - ${eur} \nRUB - ${rub}`
    bot.telegram.sendMessage('@maguraINF', message)
}


cron.schedule('00 08 * * *', () => {
    currency()
  });


function translate(textToTranslate) {
    return new Promise( function(resolve) {
        const pythonProcess = spawn('python',["./script.py", textToTranslate]);
        pythonProcess.on('exit', (code) => {
            let fileContent = fs.readFileSync("text.txt").toString();
            //const text = new Buffer(fileContent, 'binary');
           // conv = Iconv('windows-1251', 'utf8').convert(text).toString()
            console.log(fileContent)
            resolve(fileContent)
        })  
    })
    
}


bot.launch()
