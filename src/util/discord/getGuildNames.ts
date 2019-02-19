import { Client } from 'discord.js';

export default (client: Client) => Array.from(client.guilds).map(v => v[1].name);
