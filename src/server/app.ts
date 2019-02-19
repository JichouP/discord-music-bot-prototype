import launch from './launch';
import express from 'express';
import bodyparser from 'body-parser';
import main from './discord/main';
import { Guild, Client } from 'discord.js';
import { string } from 'prop-types';
import parseFromGuildsToArray from '../util/discord/parseFromGuildsToArray';
import stringifyAvoidCircularReference from '../util/stringifyAvoidCircularReference';

const app = express();
const PORT = 3000;
export class Store {
  guilds?: Map<string, Guild>;
  client?: Client;
  constructor() {
    this.guilds = undefined;
    this.client = undefined;
  }
  get guildNames() {
    return this.client ? Array.from(this.client.guilds).map(v => v[1].name) : [];
  }
}
const store = new Store();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(bodyparser.json());

app.get('/', (req, res) => {});
app.get('/guilds', (req, res) => {
  if (store.guilds) {
    res.send({
      guilds: stringifyAvoidCircularReference(store.guilds),
    });
  } else {
    res.send(400);
  }
});

app.post('/token', (req, res) => {
  main(req.body.token, res, store);
});

app.listen(PORT, () => {
  console.log(`app listen in port ${PORT}`);
});

launch();
