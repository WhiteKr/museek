import { Client, Events } from 'discord.js';
import { CustomEvent } from '../@types/custom';
import { deployCommands } from '../deployCommands';

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client<true>): Promise<void> {
    await deployCommands();
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
} as CustomEvent;
