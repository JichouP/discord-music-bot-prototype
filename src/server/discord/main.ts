import { Client, Guild } from 'discord.js';
import { Response } from 'express';
import onReady from './onReady';
import { Store } from '../app';

export default async (token: string, loginResponse: Response, store: Store) => {
  store.client = new Client();
  store.client.on('ready', onReady(store));
  store.client
    .login(token)
    .then(() => loginResponse.status(200).send('Success'))
    .then(() => {
      store.guilds = store.client!.guilds;
    })
    .then(() => {
      // console.log(store.client);
    })
    .catch(e => loginResponse.status(400).send('LoginFailed'));
};
