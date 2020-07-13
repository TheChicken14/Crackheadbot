exports.run = async(client, message, args) => {
    if (args.length < 1) {
        message.reply("you need to give me something idiot")
    }

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en_au&client=tw-ob&q=${encodeURIComponent(args.join(" "))}`

    if (client.ttsCooldown.has(message.author.id)) {
        return message.reply("you only need to wait 15 seconds and you don't even have patience for that?????")
    }

    client.ttsCooldown.add(message.author.id)
    setTimeout(_ => client.tts.ttsCooldown.delete(message.author.id), 15000)

    if (!message.member.voice.channel) {
        return message.reply({
            files: [{
                attachment: ttsUrl,
                name: "tts.mp3"
            }]
        })
    }

    const connection = await message.member.voice.channel.join()
        .catch(_ => {
            return message.reply("I couldn't connect to your voice channel!")
        })

    const dispatcher = connection.play(ttsUrl);

    message.react("✅")

    dispatcher.on("finish", () => connection.disconnect())
}