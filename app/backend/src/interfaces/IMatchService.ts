import { ICreateMatch, IMatch, IUpMatch } from './IMatch';

export interface IMatchService {
  getAll(): Promise<IMatch[]>;
  getByProgress(status: string): Promise<IMatch[]>;
  create(match: ICreateMatch): Promise<IMatch>;
  finish(id: number): Promise<void>;
  update(values: IUpMatch, id: number): Promise<void>;
}
