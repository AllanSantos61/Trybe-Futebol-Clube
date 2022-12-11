import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private _teamService: TeamService;
  constructor() {
    this._teamService = new TeamService();
    this.findAllTeams = this.findAllTeams.bind(this);
    this.findTeamById = this.findTeamById.bind(this);
  }

  async findAllTeams(req: Request, res: Response): Promise<void> {
    const teams = await this._teamService.allTeams();
    res.status(200).json(teams);
  }

  async findTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await this._teamService.teamById(Number(id));
    res.status(200).json(team);
  }
}
