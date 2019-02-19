import { observable } from 'mobx';
import { Guild, Channel, TextChannel, VoiceChannel, DMChannel } from 'discord.js';

export class AxiosStore {
  @observable guilds?: [string, Guild][];
  @observable selectedGuild?: Guild;
  @observable selectedChannel?: Channel | TextChannel | VoiceChannel | DMChannel;
}

const axiosStore = new AxiosStore();

export default axiosStore;
