import { Client, Collection, GatewayIntentBits } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { CustomCommand, CustomEvent } from './@types/custom';
import { env } from './configs/env';
import { getCommands } from './utils/getCommands';

const client: Client<boolean> = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
client.cooldowns = new Collection();

getCommands().map((command: CustomCommand) => {
  return client.commands.set(command.data.name, command);
});

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
