import { ICreateMatch, IMatch, IUpMatch } from '../interfaces/IMatch';
import HttpException from '../utils/HttpExecpetion';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { matchSchema } from './validations/schemas';
import { IMatchService } from '../interfaces/IMatchService';

const INCLUDE_OPTIONS = [
  { model: Team, as: 'teamHome', attributes: ['teamName'] },
  { model: Team, as: 'teamAway', attributes: ['teamName'] },
];

export default class MatchService implements IMatchService {
  private _matchModel = Match;
  private _teamModel = Team;

  async getAll(): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      include: INCLUDE_OPTIONS,
    });
    return matches;
  }

  async getByProgress(status: string): Promise<IMatch[]> {
    const inProgress = status === 'true';
    const matches = await this._matchModel.findAll({
      include: INCLUDE_OPTIONS,
      where: { inProgress },
    });
    return matches;
  }

  private static validateMatchSchema(match: ICreateMatch): void {
    const { error } = matchSchema.validate(match);
    if (error) throw new HttpException(400, 'All fields must be filled');
  }

  private async validateMatchTeams({
    homeTeam,
    awayTeam,
  }: ICreateMatch) {
    if (homeTeam === awayTeam) {
      throw new HttpException(
        422,
        'It is not possible to create a match with two equal teams',
      );
    }

    const validHomeTeam = await this._teamModel.findByPk(homeTeam);
    const validAwayTeam = await this._teamModel.findByPk(awayTeam);
    if (!validHomeTeam || !validAwayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }

  async create(match: ICreateMatch): Promise<IMatch> {
    MatchService.validateMatchSchema(match);
    await this.validateMatchTeams(match);

    const newMatch = await this._matchModel.create({
      ...match, inProgress: true,
    });
    return newMatch;
  }

  async finish(id: number): Promise<void> {
    const [result] = await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    if (result !== 1) throw new HttpException(404, 'Update unsuccessful!');
  }

  async update(values: IUpMatch, id: number): Promise<void> {
    const [result] = await this._matchModel.update(values, { where: { id } });
    if (result !== 1) throw new HttpException(404, 'Update unsuccessful!');
  }
}
