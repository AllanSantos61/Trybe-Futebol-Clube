import User from 'src/database/models/User';
import ILogin from 'src/interfaces/ILogin';
import IUserService from 'src/interfaces/IUserService';
import Token from 'src/utils/Token';

interface IUserService {
  login(login: ILogin): Promise<string>
}
class UserService implements IUserService {
  constructor(
    private _userModel = User;
    private _token = Token;
  )
}

export default UserService;
