import ILogin from '../interfaces/ILogin';
import { Request, Response } from 'express';
import UserService from '../services/UserService';

interface IUserController {
  login(req: Request<ILogin>, res: Response): void
}

export default class UserController implements IUserController {
  constructor(
    private _userService = new UserService()
  ) {}

  login = async (req: Request<ILogin>, res: Response) => {
    const token = await this._userService.login(req.body);
    res.status(200).json({ token });
  };

  getRole = (req: Request, res: Response) => {
    const { user } = req.body;
    res.status(200).json({role: user.role});
  };
}