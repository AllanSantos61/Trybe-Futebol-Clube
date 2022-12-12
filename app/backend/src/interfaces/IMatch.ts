export interface IMatch extends ICreateMatch {
  id: number,
  inProgress: boolean;
}

export interface IUpMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ICreateMatch extends IUpMatch {
  homeTeam: number,
  awayTeam: number,
}

export interface IReturnMatch extends IMatch {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  }
}
