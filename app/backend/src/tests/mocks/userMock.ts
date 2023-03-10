import ILogin from '../../interfaces/ILogin';
import ITokenPayload from '../../interfaces/ITokenPayload'
import { IUser } from '../../interfaces/IUser'

export const dataToken: ITokenPayload = {
  data: {
    id: 1,
    email: 'arezu@pokemail.com',
  },
};

export const userMock: IUser = {
  id: 1,
  username: 'Arezu',
  role: 'admin',
  email: 'arezu@pokemail.com',
  password: 'criptografado',
};

export const loginMock: ILogin = {
  email: 'arezu@pokemail.com',
  password: 'criptografado',
};

export const invalidLogins: ILogin[] = [
  {
    email: '',
    password: 'amongus',
  },
  {
    email: 'cynthia@pokemail.com',
    password: '',
  },
  {
    email: 'cynthia@pokemail.com',
    password: 'topotpotp',
  },
]