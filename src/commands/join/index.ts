import { VoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import {
  CommandInteraction,
  Guild,
  GuildMember,
  SlashCommandBuilder,
  VoiceBasedChannel,
} from 'discord.js';
import { CustomCommand } from '../../@types/custom';

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Joins the voice channel'),
  async execute(interaction: CommandInteraction): Promise<void> {
    joinVoiceChannelByInteraction(interaction);
  },
} as CustomCommand;

export const joinVoiceChannelByInteraction = (
  interaction: CommandInteraction
): VoiceConnection | null => {
  const guild: Guild | undefined = interaction.client.guilds.cache.get(
    interaction.guildId!
  );
  const member: GuildMember | undefined = guild?.members.cache.get(
    interaction.member?.user.id!
  );
  const voiceChannel: VoiceBasedChannel | null | undefined =
    member?.voice.channel;

  if (!voiceChannel) {
    interaction.reply({
      content: 'You are not in a voice channel.',
      ephemeral: true,
    });
    return null;
  }

  const connection: VoiceConnection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guildId,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  return connection;
};
