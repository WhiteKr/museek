import * as fs from 'fs';
import * as path from 'path';
import { CustomCommand } from '../@types/custom';

export const getCommands = (): CustomCommand[] => {
  const commands: CustomCommand[] = [];

  const foldersPath: string = path.join(__dirname, '../commands');
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
        commands.push(command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  return commands;
};
