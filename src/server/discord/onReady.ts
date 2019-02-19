import { Client } from 'discord.js';
import getGuildNames from '../../util/discord/getGuildNames';
import { Store } from '../app';

export default (store: Store) => () => {
  getGuildNames(store.client!);
};
