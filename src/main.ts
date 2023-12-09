import { Client, Events, GatewayIntentBits } from 'discord.js';
import { env } from './configs/env';

const client: Client<boolean> = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient: Client<true>) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(env.BOT_TOKEN);
