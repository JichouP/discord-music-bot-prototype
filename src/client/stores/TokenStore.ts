import { observable } from 'mobx';
import { create, persist } from 'mobx-persist';

export class TokenStore {
  @persist @observable token = '';
  @observable status: boolean = false;
}

const tokenStore = new TokenStore();

export default tokenStore;

const hydrate = create();
hydrate('token', tokenStore);
