import { v4 as uuidv4 } from 'uuid';
import { Credentials } from '@business/entities';

export const getUserCredentials: () => Credentials = () => ({
  email: uuidv4() + '@mail.com',
  password: uuidv4(),
});
