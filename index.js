const spawn = require("child_process").spawn;
const fs = require('fs')
// const Iconv = require('iconv').Iconv;

const { Telegraf } = require('telegraf')
const extra = require('telegraf/extra')
const markup = extra.markdown()

const bot = new Telegraf('')
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
    ctx.replyWithMarkdown(translated + '\n' + '\n' +'[Наш Канал](https://t.me/maguraNWS)', { disable_web_page_preview: true })
    ctx.telegram.sendMessage('@aiusdhfiuashfa', translated + '\n' + '\n' +'[Наш Канал](https://t.me/maguraNWS)', { disable_web_page_preview: true, parse_mode: 'Markdown' })

    
})


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
