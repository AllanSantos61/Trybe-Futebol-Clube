import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import { IMatchService } from '../interfaces/IMatchService';
import MatchService from '../services/MatchService';

export default class MatchController {
//   private _matchService = MatchService;

  constructor(private _matchService = new MatchService()) {
    // this._matchService = new MatchService();
    this.listAll = this.listAll.bind(this);
    this.create = this.create.bind(this);
    this.finish = this.finish.bind(this);
    this.update = this.update.bind(this);
  }

  async listAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = inProgress === undefined
      ? await this._matchService.getAll()
      : await this._matchService.getByProgress(String(inProgress));
    res.status(StatusCodes.OK).json(matches);
  }

  async create(req: Request, res: Response): Promise<void> {
    const newMatch = await this._matchService.create(req.body);
    res.status(StatusCodes.CREATED).json(newMatch);
  }

  async finish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this._matchService.finish(Number(id));
    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { user, ...body } = req.body;
    await this._matchService.update(body, Number(id));
    res.status(StatusCodes.OK).json({ message: 'Successfully updated!' });
  }
}
