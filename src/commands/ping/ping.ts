import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CustomCommand } from '../../@types/custom';

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply('Pong!');
  },
} as CustomCommand;
