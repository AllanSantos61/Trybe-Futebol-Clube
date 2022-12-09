export default interface IAuthorization {
  generateToken(payload: { id: number, role: string }): Promise<string>;
}
