import ILogin from '../../interfaces/ILogin';
import IToken from '../../interfaces/IToken'
import IUser from '../../interfaces/IUser'

export const dataToken: IToken = {
  data: {
    id: 1,
    email: 'arezu@pokemail.com',
  },
};

export const userMock: IUser = {
  id: 1,
  userName: 'Arezu',
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