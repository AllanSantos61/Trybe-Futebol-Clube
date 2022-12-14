import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardService } from '../interfaces/ILeaderboardService';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService: ILeaderboardService;

  constructor() {
    this._leaderboardService = new LeaderboardService();
    this.listHomeTeams = this.listHomeTeams.bind(this);
    this.listAwayTeams = this.listAwayTeams.bind(this);
    this.getFullLeaderboard = this.getFullLeaderboard.bind(this);
  }

  async listHomeTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this._leaderboardService.getHomeTeamsLeaderboard();
    res.status(StatusCodes.OK).json(teams);
  }

  async listAwayTeams(_req: Request, res: Response): Promise<void> {
    const teams = await this._leaderboardService.getAwayTeamsLeaderboard();
    res.status(StatusCodes.OK).json(teams);
  }

  async getFullLeaderboard(_req: Request, res: Response): Promise<void> {
    const teams = await this._leaderboardService.getLeaderboard();
    res.status(StatusCodes.OK).json(teams);
  }
}
