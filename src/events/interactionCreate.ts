import { Client, Collection, Events, Interaction } from 'discord.js';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command: any = interaction.client.commands.get(
      interaction.commandName
    );

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    const { cooldowns }: Client<true> = interaction.client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now: number = Date.now();
    const timestamps: Collection<string, number> | undefined = cooldowns.get(
      command.data.name
    );
    const defaultCooldownDuration: number = 3;
    const cooldownAmount: number =
      (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps?.has(interaction.user.id)) {
      const expirationTime: number =
        timestamps.get(interaction.user.id)! + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp: number = Math.round(expirationTime / 1000);
        interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
          ephemeral: true,
        });
        return;
      }
    }

    timestamps?.set(interaction.user.id, now);
    setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
