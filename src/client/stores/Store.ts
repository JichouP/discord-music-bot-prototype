import { observable } from 'mobx';
import { Client, Guild, TextChannel, VoiceChannel } from 'discord.js';
import { persist, create } from 'mobx-persist';

export class Store {
  @persist @observable token = '';
  @observable clientStatus: boolean = false;
  @observable client: Client = new Client();
  @observable selectedGuild?: Guild;
  @observable selectedTextChannel?: TextChannel;
  @observable selectedVoiceChannel?: VoiceChannel;
}
const store = new Store();

export default store;

const hydrate = create();
hydrate('store', store);
