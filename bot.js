const Twiter = require("twit");
const colors = require('colors/safe');
const twit   = new Twiter(require("./config.js"));
const moment = require("moment");
const ora = require('ora');

const spinner = ora(' Twitter Bot Berjalan ..').start();

const time = moment().format("HH:mm:ss");

const mediaArtsSearch = { q: "mutual", count: 100, result_type: "recent" };

const message = {
    errorHastag: "There was an error with your hashtag search:",
    errorRetweet: "Kamu sudah meretweet :)",
    success: "Sukses NgeRetweet => \n || => ["
}

const retweetLatest = () => {
  twit.get("search/tweets", mediaArtsSearch)
      .then(data => {
          let retweetId = data.statuses[0].id_str;
          twit.post("statuses/retweet/" + retweetId, {})
              .then(response => {
                  console.log(`[ ${colors.blue(time)} ] ${colors.green(message.success)} ${colors.yellow(data.statuses[0].text)} ]\n`);
              })
              .catch(err => {
                  console.log(colors.red(message.errorRetweet));
              })
      })
      .catch(err => {
          console.log(message.errorHastag, error);
      })
}

retweetLatest();

setInterval(retweetLatest, 10000);

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text  = ' Mendapatkan tweet ~\n';
}, 1000);
