import { ITeam } from '../interfaces/ITeam';
import Team from '../database/models/Team';
import HttpException from '../utils/HttpExecpetion';

export default class TeamService {
  private _teamModel = Team;

  async allTeams(): Promise<ITeam[]> {
    const teams = await this._teamModel.findAll();
    return teams;
  }

  async teamById(id: number): Promise<ITeam> {
    const team = await this._teamModel.findByPk(id);
    if (!team) throw new HttpException(404, 'There is no team with such id!');
    return team;
  }
}
