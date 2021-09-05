const Telegraf = require('telegraf');
const bot = new Telegraf('1738354020:AAEDxIO4Cbt2Q9MwDUpY67qRMFnIHgb4Cqw');
const axios = require('axios');
const moment = require('moment');

// bot.on('inline_query', async ctx => {
//     let query = ctx.inlineQuery.query;
//     const apikey = '20742515-23f9f6ee17140db420061d918';
//     let res = await axios.get(`https://pixabay.com/api/?key=${apikey}&q=${query}`);
//     var data = res.data.hits;
//     let results = data.map((item, index) => {
//         return {
//             type: 'photo',
//             id: String(index),
//             photo_url: item.webformatURL,
//             thumb_url: item.previewURL,
//             photo_width: 300,
//             photo_height: 200,
//             caption: `[Source](${item.webformatURL})\n[Large Image](${item.largeImageURL})`,
//             parse_mode: 'Markdown'
//         }
//     })
//     ctx.answerInlineQuery(results);
// });

bot.on("inline_query", ctx => {
    let query = ctx.inlineQuery.query;
    axios.get(
        `
        https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=2
        `)
        .then((result) => {
            console.log(result.data);
            // console.log(moment().startOf('day').add(1, 'days').valueOf());
            // console.log(moment().startOf('day').add(2, 'days').valueOf());            
            // console.log(moment('1614617884844'));
            // console.log(moment().unix()); // second time
            // console.log(moment().toDate().getTime()); // = .valueOf()
            // console.log(moment(1615482000000).format("DD MMM YYYY hh:mm a")); 
            // console.log(moment(1615568399999).format("DD MMM YYYY hh:mm a"));
            
            // console.log(moment(1616432400000).format("DD MMM YYYY hh:mm a"));
            // console.log(moment(1614423608000).format("YYYY-MM-DD hh:mm a")); // 2021-03-18 09:20:51
            // console.log(moment('2021-03-18 09:20:51').valueOf()); // 2021-03-18 09:20:51
            console.log(moment(1617062400000));
            // console.log(345600000/86400000); // transfer ms to day
        }).catch((err) => {
            console.log(err);
        });
});

bot.launch();
