const Twit = require("twit");
const colors = require('colors/safe');
const twit = new Twit(require("./config.js"));
const mediaArtsSearch = { q: "mutualan", count: 100, result_type: "recent" };
const moment = require("moment")
const ora = require('ora');
const spinner = ora(' Twitter Bot Berjalan ..').start()

const retweetLatest = () => {
  twit.get("search/tweets", mediaArtsSearch, (error, data) => {
    if (!error) {
      let retweetId = data.statuses[0].id_str;
      twit.post("statuses/retweet/" + retweetId, {}, (error, response) => {
        if (response) {
        
          console.log(`[ ${colors.blue(moment().format("HH:mm:ss"))} ]  ${colors.green(
            "Sukses NgeRetweet => \n ||=>[")}${colors.yellow(data.statuses[0].text)} ]
\n
          `);
        }
        if (error) {
          console.log(colors.red("Kamu sudah meretweet :)"));
        }
      });
    }
    else {
      console.log("There was an error with your hashtag search:", error);
    }
  });
}

retweetLatest();
setInterval(retweetLatest, 10000);
setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = ' Mendapatkan tweet ~\n';
}, 1000);
