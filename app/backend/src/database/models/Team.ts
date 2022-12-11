import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

export default class Team extends Model implements Team {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
