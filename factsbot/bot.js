const Telegraf = require('telegraf');
const bot = new Telegraf('1623351269:AAFxdrGvJnBBMYr4l6S6qqfeVtpHdMA59PI');
const axios = require('axios');

//code

// data store from gsheet
let dataStore = [];

// invoke getData function when script starts
getData();

bot.command('fact', ctx => {
    // get max row number
    let maxrow = dataStore.filter(item => {
        return (item.row == '1' && item.col == '2');
    })[0].val;

    // generate random number from 1 to max row
    let k = Math.floor(Math.random() * maxrow) + 1;

    // get fact object that match row with randomly generated number
    let fact = dataStore.filter(item => {
        return (item.row == k && item.col == '5');
    })[0];

    // output message
    let message = `
Fact #${fact.row}:
${fact.val}
    `;
    ctx.reply(message);
});

bot.command('update', async ctx => {
    try {
        // update data
        await getData();
        ctx.reply('updated');
    } catch (err) {
        console.log(err);
        ctx.reply("Error encountered");
    }
});

async function getData() {
    try {
        // send http request to gs link to get infomation back into json format
        let res = await axios.get('https://spreadsheets.google.com/feeds/cells/1d0oB6l0u9Gj67w04r4nlGMie1K6pWuH4FtS9Yg8wvs0/1/public/full?alt=json');

        // store entry array in data variable
        let data = res.data.feed.entry;

        // make sure dataStore is empty
        dataStore.length = 0;

        // process data into dataStore
        data.forEach(element => {
            dataStore.push({
                row: element.gs$cell.row,
                col: element.gs$cell.col,
                val: element.gs$cell.inputValue
            });
        });
    } catch (error) {
        console.log(error);
        throw new Error;
    }
};


bot.launch();