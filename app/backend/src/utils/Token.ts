// import * as jwt from 'jsonwebtoken';

// const SECRET = process.env.SECRET || 'jwt_scret';

// interface IAuthorization {
//   generateToken(payload: { id: number, role: string }): Promise<string>;
// }

// const jwtConfig: jwt.SignOptions = {
//   algorithm: 'HS256',
//   expiresIn: '1d',
// };

// export default class Token implements IAuthorization {
//   public generateToken = async (payload: { id: number, role: string }) => {
//     jwt.sign(payload, SECRET, jwtConfig);
//   };
// }
