import { Client, Collection, GatewayIntentBits } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { CustomCommand, CustomEvent } from './@types/custom';
import { env } from './configs/env';

const client: Client<boolean> = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
client.cooldowns = new Collection();

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
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const eventsPath: string = path.join(__dirname, 'events');
const eventFiles: string[] = fs
  .readdirSync(eventsPath)
  .filter((file: string) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath: string = path.join(eventsPath, file);
  const event: CustomEvent = require(filePath);
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}

client.login(env.BOT_TOKEN);
