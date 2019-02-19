import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey, faHeart, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash, faComment } from '@fortawesome/free-regular-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export default () => {
  library.add(faEye, faEyeSlash, faDiscord, faKey, faHeart, faMicrophone, faComment);
};
