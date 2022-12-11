import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private _userService = UserService;

  constructor() {
    this._userService = new UserService();
    this.login = this.login.bind(this);
    this.getRole = this.getRole.bind(this);
  }

  async login(req: Request, res: Response): Promise<void> {
    const token = await this._userService.login(req.body);
    res.status(200).json({ token });
  }

  async getRole(_req: Request, res: Response): Promise<void> {
    const { data: { id } } = res.locals.userIddentifier;
    const role = await this._userService.getRole(id);
    res.status(200).json({ role });
  }
}
