import axios from 'axios';

const BaseURL = 'http://localhost:3000';
export const postToken = (token: string) => axios.post(`${BaseURL}/token`, { token });
export const getGuilds = () =>
  axios.get(`${BaseURL}/guilds`).then(res => ({ ...res, data: { guilds: JSON.parse(res.data.guilds) } }));
