import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardService {
  getHomeTeamsLeaderboard(): Promise<ILeaderboard[]>;
  getAwayTeamsLeaderboard(): Promise<ILeaderboard[]>;
  getLeaderboard(): Promise<ILeaderboard[]>;
}
