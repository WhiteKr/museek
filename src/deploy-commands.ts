import { REST, Routes } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { CustomCommand } from './@types/custom';
import { env } from './configs/env';

const getCommands = (): any[] => {
  const commands: any[] = [];

  const foldersPath: string = path.join(__dirname, 'commands');
  const commandFolders: string[] = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath: string = path.join(foldersPath, folder);
    const commandFiles: string[] = fs
      .readdirSync(commandsPath)
      .filter((file: string) => file === 'index.js');

    for (const file of commandFiles) {
      const filePath: string = path.join(commandsPath, file);
      const command: CustomCommand = require(filePath);
      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  return commands;
};

export const deployCommands = async (): Promise<void> => {
  const commands: any[] = getCommands();
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
    `Successfully reloaded ${commands.length} application (/) commands.`
  );
};
