require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => console.log("Connected"))


client.on("guildMemberAdd", (member) => {
    if(member.guild.id != "836386335840665610") return
    let m = client.channels.cache.get("889950570520145991").send(`Welcome, ${member}, to SudoSecurity's Community Discord Server! We are a friendly and laid back community of people who love and hobby around technology from hardware to Linux. We also play games with each other like Minecraft or Valorant. We hope your enjoy your stay!`)
})

client.on("message", (message) => {
  if(message.content.startsWith("!splash")) {
    message.channel.send(`Magikarp used splash on ${message.content.replace("!splash ", "")}`, {allowedMentions: {}})
  }

})


client.login(process.env.TOKEN)
