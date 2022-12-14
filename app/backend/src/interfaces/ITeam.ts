export interface ITeam {
  id: number;
  teamName: string;
}

export type ICreateTeam = Omit<ITeam, 'id'>;

export interface ITeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IHomeTeamMatches {
  name: string;
  homeTeamMatches: ITeamGoals[];
}

export interface IAwayTeamMatches {
  name: string;
  awayTeamMatches: ITeamGoals[];
}
