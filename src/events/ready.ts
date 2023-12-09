import { Client, Events } from 'discord.js';
import { deployCommands } from '../deploy-commands';

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client<true>): Promise<void> {
    await deployCommands();
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
