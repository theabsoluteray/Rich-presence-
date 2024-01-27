const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('Your Application ID')
    .setType('STREAMING')
    .setURL('Your Twitch URL') //Must be a youtube video link 
    .setState('Your State')
    .setName('mrnekrozyt')
    .setDetails(`THE NAME IT SHOWS YOUR STREAMING [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('Large Image URL') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Large Text') //Text when you hover the Large image
    .setAssetsSmallImage('Small Image URL') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Small Text') //Text when you hover the Small image
    .addButton('Button 1', 'Button URL')
    .addButton('Button 2', 'Button URL');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `PUT WHAT IT SAYS YOUR STREAMING HERE [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);