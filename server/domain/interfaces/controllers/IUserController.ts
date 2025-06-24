import { UserDto, UserSearchDto, SearchResponse } from '@DTO/User';
import { Request, Response } from 'express';

export default abstract class IUserController {
  abstract getById(req: Request, res: Response): Promise<UserDto>;
  abstract search(req: Request, res: Response): Promise<SearchResponse<UserSearchDto>>;
  abstract create(req: Request, res: Response): Promise<UserDto>;
  abstract update(req: Request, res: Response): Promise<UserDto>;
  abstract inactivate(req: Request, res: Response): Promise<void>;
  abstract reactivate(req: Request, res: Response): Promise<void>;
}
