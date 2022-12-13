import { ICreateMatch, IMatch, IReturnMatch, IUpMatch } from '../../interfaces/IMatch';

export const matchesMock: IReturnMatch[] = [
  {
    id: 1,
    homeTeam: 5,
    homeTeamGoals: 6,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Cruzeiro',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Internacional',
    },
    teamAway: {
      teamName: 'Santos',
    },
  },
];

export const newMatchMock: ICreateMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const invalidMatchesMock: ICreateMatch[] = [
  {
    homeTeam: 16,
    awayTeam: 16,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
  },
  {
    homeTeam: 999,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    },
];

export const missingFieldsMock: Omit<ICreateMatch, 'homeTeam'> = {
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const newMatchResponseMock: IMatch = {
  id: 1,
  homeTeam: 5,
  awayTeam: 8,
  homeTeamGoals: 6,
  awayTeamGoals: 1,
  inProgress: true,
};

export const updateMatchMock: IUpMatch = {
  homeTeamGoals: 7,
  awayTeamGoals: 1,
};