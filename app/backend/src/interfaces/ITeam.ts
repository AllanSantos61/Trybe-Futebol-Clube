export interface ITeam {
  id: number;
  teamName: string;
}

export type ICreateTeam = Omit<ITeam, 'id'>;
