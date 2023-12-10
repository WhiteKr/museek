import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import { CustomCommand } from '../@types/custom';
import { env } from '../configs/env';
import { getCommands } from './getCommands';

export const deployCommands = async (): Promise<void> => {
  const customCommands: CustomCommand[] = getCommands();

  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
    customCommands.map((command: CustomCommand) => {
      return command.data.toJSON();
    });
  const devCommands: any[] = commands.map((command: any) => ({
    ...command,
    description: `${command.description} (dev)`,
  }));

  const rest: REST = new REST().setToken(env.BOT_TOKEN);
  await rest.put(Routes.applicationCommands(env.CLIENT_ID), { body: commands });
  await rest.put(Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID), {
    body: devCommands,
  });
  console.log(
    `Successfully reloaded ${customCommands.length} application (/) commands.`
  );
};
