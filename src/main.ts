import { Client, Events, GatewayIntentBits } from 'discord.js';
import { env } from './configs/env';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(env.BOT_TOKEN);
