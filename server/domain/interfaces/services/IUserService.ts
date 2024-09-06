export default abstract class IUserService {
  abstract search(): Promise<Record<string, string>>;
}
