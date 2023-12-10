/* eslint-disable no-unused-vars */

import {
  Awaitable,
  ClientEvents,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export type CustomCommand = {
  cooldown: number;
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

export type CustomEvent = {
  once: boolean;
  name: keyof ClientEvents;
  execute: (...args: any) => Awaitable;
};
