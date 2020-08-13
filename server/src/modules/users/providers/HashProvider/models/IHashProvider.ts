export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payloaf: string, hashed: string): Promise<boolean>;
}
