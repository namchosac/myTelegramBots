const Telegraf = require('telegraf');
const bot = new Telegraf('1695451492:AAF57OdPM5Han08a4Tb57-h9kA-Fd12ioyw');

// bot.command('test', ctx => {
//     // url
//     // bot.telegram.sendPhoto(ctx.chat.id, 'https://cdnmedia.thethaovanhoa.vn/Upload/3uPkfvAxvuOpUQrmKeiDaA/files/2020/06/A/16/yoona-snsd_Fotor.jpg');

//     // file path
//     // bot.telegram.sendPhoto(ctx.chat.id, {
//     //     source: 'res/london.jpg'
//     // })

//     // file id
//     bot.telegram.sendPhoto(ctx.chat.id, "AgACAgUAAxkBAAMIYErRsStH5VmckV7Y5XjkOWKiCMoAAlysMRv1GlhWVVKyZH08ldSQJKVvdAADAQADAgADeAADsXoCAAEeBA");
// });

bot.command(['start', 'help'], ctx => {
    let message = `
Help Reference:
/newyork - get image of New York
/dubai - get gif of Dubai
/singapore - get location of Singapore
/cities - get photos of cities
/citieslist - get text file cities
`;
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    ctx.reply(message);
});

bot.command('newyork', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/newyork.jpg"
    }, {
        reply_to_message_id: ctx.message.message_id
    });
});

bot.command('dubai', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video");
    bot.telegram.sendAnimation(ctx.chat.id, "https://i.gifer.com/NYMQ.gif", {
        reply_to_message_id: ctx.message.message_id
    });
});

bot.command('cities', ctx => {
    let cities = ["res/dubai.jpg", "res/hongkong.jpg", "res/london.jpg", "res/newyork.jpg", "res/singapore.jpg", ];
    let result = cities.map(city => {
        return {
            type: "photo",
            media: {
                source: city
            }
        }
    });
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    bot.telegram.sendMediaGroup(ctx.chat.id, result);
});

bot.command('citieslist', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_document");
    bot.telegram.sendDocument(ctx.chat.id, {
        source: 'res/citieslist.txt'
    }, {
        thumb: {
            source: 'res/dubai.jpg'
        }
    });
});

bot.command('singapore', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "find_location");
    bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198);
});

bot.on('message', async ctx => {
    if (ctx.updateSubTypes[0] == 'document') {
        try {
            let link = await bot.telegram
            .sendChatAction(ctx.chat.id, "typing")
            .getFileLink(ctx.message.document.file_id);

            ctx.reply('Your download link: ' + link);
        } catch (error) {
            console.log(err);
            ctx.reply(err.description);
        }
    } else if (ctx.updateSubTypes[0] == 'photo') {
        try {
            let link = await bot.telegram
            .sendChatAction(ctx.chat.id, "typing")
            .getFileLink(ctx.message.photo[0].file_id);

            ctx.reply('Your download link: ' + link);
        } catch (error) {
            console.log(err);
            ctx.reply(err.description);
        }
    } else if (ctx.updateSubTypes[0] == 'animation') {
        try {
            let link = await bot.telegram
            .sendChatAction(ctx.chat.id, "typing")
            .getFileLink(ctx.message.animation.file_id);
            ctx.reply('Your download link: ' + link);
        } catch (error) {
            console.log(err);
            ctx.reply(err.description);
        }
    }
});

bot.launch();