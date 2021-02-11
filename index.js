const https = require('https');
const axios = require('axios');
const qs = require('querystring')
const defaultMessage={
    "SINGLE": "ボタンがクリックされました。",
    "DOUBLE": "ダブルクリックされました。",
    "LONG": "ボタンが長押しされました。"
}

exports.handler = function(e, ctx, cb) {
    console.log('event: %j', e)
    console.log('context: %j', ctx)
    let text = defaultMessage[e.clickTypeName]
    
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Bearer " + process.env.TOKEN
        },
        data: qs.stringify({
            message: text
        })
    };
    console.log(config)
    axios.post('https://notify-api.line.me/api/notify', config.data, config)
    .then((result) => {
        console.log(result)
    }).catch((e) => {
        console.log(e)
    })
};