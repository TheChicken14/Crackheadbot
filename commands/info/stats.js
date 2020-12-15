const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/BaseCommand");

const {
  getPlatform,
  getOSUptime,
  getNodeUptime,
  getModuleVersion,
} = require("../../util/info");

module.exports = class StatsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "stats",
      aliases: ["statistics", "info"],
      group: "info",
      memberName: "stats",
      description: "Shows some info about me 🥴",
    });
  }
  run(message) {
    const totalPlayers = this.client.shoukaku.totalPlayers;

    const embed = new MessageEmbed()
      .setAuthor(
        this.client.user.username,
        this.client.user.displayAvatarURL(),
        this.client.options.invite
      )
      .setColor("RANDOM")
      .setDescription(
        "Hi! I'm crackheadbot, a Discord bot created with NodeJS and Discord.js Commando."
      )
      .setTitle("Here's some info 😼")
      .addField("Guild count", this.client.guilds.cache.size, true)
      .addField("Developer", this.client.owners[0].tag, true)
      .addField("Node JS Version", process.version, true)
      .addField("Discord.js version", getModuleVersion("discord.js"), true)
      .addField("Uptime", getNodeUptime(), true)
      .addField("System uptime", getOSUptime(), true)
      .addField("Platform", getPlatform(), true)
      .addField("Playing players", totalPlayers, true)
      .addField(
        "Memory usage",
        `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        true
      )
      .addField(
        "GitHub Repo",
        `[TheChicken14/Crackheadbot](https://github.com/TheChicken14/Crackheadbot)`,
        true
      )
      .addField(`Support server`, this.client.options.invite, true)
      .addField(
        `Invite me!`,
        `[Click here 😼](${this.client.inviteURL})`,
        true
      );
    message.embed(embed);
  }
};
