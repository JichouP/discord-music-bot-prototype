import { Guild } from 'discord.js';

export default (guilds: Map<string, Guild>) => {
  return Array.from(guilds).map(
    (v): [string, any] => {
      Object.keys(v[1]).forEach(key => v[1][key] instanceof Map && (v[1][key] = Array.from(v[1][key])));
      return [v[0], v[1]];
    }
  );
};
