export default abstract class IUserRepository {
  abstract search(): Promise<Record<string, string>>;
}
