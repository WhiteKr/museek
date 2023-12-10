import { Collection } from 'discord.js';
import { CustomCommand } from './custom';

declare module 'discord.js' {
  export interface Client {
    commands: CommandsCollection;
    cooldowns: CooldownsCollection;
  }
}

type CommandsCollection = Collection<
  CustomCommand['data']['name'],
  CustomCommand
>;

type CooldownsCollection = Collection<
  CustomCommand['data']['name'],
  CooldownCollection
>;

type CooldownCollection = Collection<string, number>;
