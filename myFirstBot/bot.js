const Telegraf = require('telegraf');
const bot = new Telegraf('1634168382:AAEhl8VOd-Fd7lVnQGY_E8g95gs8c2GPqtI');


// bot.use((ctx, next) => {
//     if (ctx.message.chat.id !== -486196938) {
//         ctx.state.apple = 5;
//         ctx.reply('You used the bot');
//         next(ctx);
//     }
// });

// //  /start
// bot.start((ctx) => {
//     if (ctx.message.chat.id !== -486196938) {
//         // ctx.reply(ctx.from.first_name + " has entered the start command and it is a "
//         //     + ctx.updateSubTypes[0]);
//         // ctx.reply('Start command');
//         ctx.reply(ctx.state.apple);
//     }
// });

bot.command('start', ctx => {

    // bot.telegram.sendMessage(chatId, text, [extra])
    bot.telegram.sendMessage(ctx.chat.id, "Hello World", {
        parse_mode: "Markdown",
        disable_notification: true,
    }); // telegram methods requires chatId

    // ctx.reply(text, [extra])
    ctx.reply("Hello World", {
        parse_mode: "Markdown",
        disable_notification: true,
    });   // ctx method shortcuts does not require chatId
});


// //  /help
// bot.help((ctx) => {
//     ctx.reply("You have entered the help command");
// });

// //  /settings
// bot.settings((ctx) => {
//     ctx.reply("You have entered the settings command");
// });

// bot.command(['test', 'Test', 'test1'], (ctx) => {
//     ctx.reply("Hello World");
// });

// bot.hears("cat", (ctx) => {
//     ctx.reply("meow");
// });

const myArray = ['Ăn cơm', 'Cháo', 'Phở', 'Bún', 'Bánh cuốn', 'Fastfood'];
const mobilottArray = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55'
];
const vietlotArray = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
    '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
    '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'
];

const command1 = "Trưa nay ăn gì";
const command2 = "Hôm nay đánh con gì";

function repeat(number) {
    getMobilottNumberOfPairs(number);
    getVietlotNumberOfPairs(number);
    if (number > 1) repeat(number - 1);
};

var result1 = new Array();
var result2 = new Array();

function getMobilottNumberOfPairs() {
    let random = Math.floor(Math.random() * mobilottArray.length);
    return result1.push(mobilottArray[Math.floor(random)]);;
};

function getVietlotNumberOfPairs() {
    let random = Math.floor(Math.random() * vietlotArray.length);
    return result2.push(vietlotArray[Math.floor(random)]);;
};

bot.on("text", (ctx) => {
    if (ctx.update.message.text.toUpperCase() === command1.toUpperCase()) {
        ctx.reply(myArray[Math.floor(Math.floor(Math.random() * myArray.length))]);
    }

    else if (ctx.update.message.text.toUpperCase() === command2.toUpperCase()) {
        repeat(6);
        ctx.reply(JSON.stringify(result1));
        result.length = 0;
    }
    else if (ctx.update.message.from.username === 'hathu') {
        repeat(0);
        ctx.reply(JSON.stringify(result2));
        result.length = 0;
    }
});

// bot.on("sticker", (ctx) => {
//     ctx.reply("This is a sticker message");
// });

//handles username eg @botfather
// bot.mention('botfather', ctx => {
//     ctx.reply('mention method');
// });

// handles phone number eg. (730) 262-4233, +1 730 263-4233
bot.phone("+84 97 221 6469", ctx => ctx.reply('Phone method'));

//handles hastags eg. #hash
// bot.hashtag('hash', ctx => ctx.reply('hashtag method'));

bot.launch();