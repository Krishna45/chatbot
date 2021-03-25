const Discord=require('discord.js');
const { GoogleSpreadsheet }=require('google-spreadsheet');
const { promisify }=require('util');
const creds=require('./client_secret.json');
let lastCmdSentTime = {};
let waitTimeForUser =  60000 * 5; //Users can only run a command once every 5 minutes
let botLastSent = false;
let timeBetweenEachCmd = 60000;
var rows,sheet;
async function accessSpreadsheet()
{ 
    const doc=new GoogleSpreadsheet('1BwCKeBIXi6tyL2XDph_Feg43uUiTaD6BwD9WPM5Bm0g');  //connecting the Google Spreadsheet
    doc.useServiceAccountAuth(creds);
    const info=await promisify(doc.getInfo)();
    sheet=info.worksheets[0];
    rows=await promisify(sheet.getRows)({
        offset: 1
    })
}
accessSpreadsheet();
const token='ODIzODY0ODc0MjYyMDY5Mjk5.YFnB9A.TvY6NvMVDci3YWndE9WAR4RZxz0';
const client=new Discord.Client();
client.on('message',(msg)=>{
    //for time interval thing
    if(botLastSent !== false ? msg.createdTimestamp - botLastSent < timeBetweenEachCmd : false) return; //don't let the bot run a cmd
    let userLastSent = lastCmdSentTime[msg.author.id] || false;
    if(userLastSent !== false ? msg.createdTimestamp - userLastSent < waitTimeForUser : false) return; //don't let the user run a cmd
    lastCmdSentTime[msg.author.id] = msg.createdTimestamp;
    botLastSent = msg.createdTimestamp;
    if(msg.content==='!join-clan-12')
    {
        var value=promisify(sheet.getRows)({
             offset:1,
             query:'Clan = '+'clan-12'
        });
        if(value===true)
        {
            msg.channel.send(`Hello ${msg.author}! Enter Your Registered Email Id`);
        }
        else
        {
            msg.channel.send('The batch is closed');
        }
    }
    if(msg.content==='!join-clan-13')
    {
        var value=promisify(sheet.getRows)({
            offset:1,
            query:'Clan = '+'clan-13'
       });
       if(value===true)
       {
           msg.channel.send(`Hello ${msg.author}! Enter Your Registered Email Id`);
       }
       else
       {
           msg.channel.send('The batch is closed');
       }
    }
});
client.on('ready',()=>{
    
    console.log("Bot is now connected");
    client.channels.cache.find(x => x.name === 'general').send('Hey');

});
client.login(token);