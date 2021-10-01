require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_PRESENCES"] })

const prefix = "!"

client.on("ready", () => console.log("Connected"))

client.on("guildMemberAdd", (member) => {
    if (member.guild.id != "836386335840665610") return
    let m = client.channels.cache.get("889950570520145991").send(`Welcome, ${member}, to SudoSecurity's Community Discord Server! We are a friendly and laid back community of people who love and hobby around technology from hardware to Linux. We also play games with each other like Minecraft or Valorant. We hope your enjoy your stay!`)
})

client.on("messageCreate", async (message) => {
    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    if (commandName == "splash") {
        message.channel.send(`Magikarp used splash on ${message.content.replace("!splash ", "")}`, { allowedMentions: {} })
    }
    if (commandName == "eval") {
        if (!["439223656200273932"].includes(message.author.id)) return
        try {
            if (!args[0]) return message.channel.send("undefined", { code: "js" })

            let codeArr = args.slice(0).join(" ").split("\n")
            if (!codeArr[codeArr.length - 1].startsWith("return")) codeArr[codeArr.length - 1] = `return ${codeArr[codeArr.length - 1]}`

            const code = `async () => { ${codeArr.join("\n")} }`

            let out = await eval(code)()
            
            message.channel.send(`Typeof output: **${typeof out}**`)
            if (typeof out !== "string") out = require("util").inspect(out)
            out = out.replace(process.env.TOKEN, "[TOKEN REDACTED]").replace(process.env.MONGODB, "[DB URI REDACTED]")

            message.channel.send({
                content: out ? out : "null",
                split: true,
                code: "js",
            })
        } catch (err) {
            message.channel.send("An error occurred when trying to execute this command.")
            console.log(err)
            return message.channel.send(`${err}`, { code: "js" })
        }
    }
})

client.login(process.env.TOKEN)
