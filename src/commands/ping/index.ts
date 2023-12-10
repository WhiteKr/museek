import {
  ChatInputCommandInteraction,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
} from 'discord.js';
import { CustomCommand } from '../../@types/custom';

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .addBooleanOption((option: SlashCommandBooleanOption) =>
      option
        .setName('secret')
        .setDescription('Make this ping-pong a secret just between you and me!')
    ),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const isSecret: boolean =
      interaction.options.getBoolean('secret', false) ?? false;
    await interaction.reply({ content: 'Pong!', ephemeral: isSecret });
  },
} as CustomCommand;
