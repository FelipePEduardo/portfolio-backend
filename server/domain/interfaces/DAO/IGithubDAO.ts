import { RepositoriesDto, UserInformationDto } from '@DTO/Github';

export default abstract class IGithubDAO {
  abstract getUserInformation(): Promise<UserInformationDto>;
  abstract getRepositories(): Promise<RepositoriesDto>;
}
