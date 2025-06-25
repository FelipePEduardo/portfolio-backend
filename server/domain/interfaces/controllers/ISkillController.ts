import { SkillDto, SkillSearchDto, SearchResponse } from '@DTO';
import { Request, Response } from 'express';

export default abstract class ISkillController {
  abstract getById(req: Request, res: Response): Promise<SkillDto>;
  abstract search(req: Request, res: Response): Promise<SearchResponse<SkillSearchDto>>;
  abstract create(req: Request, res: Response): Promise<SkillDto>;
  abstract update(req: Request, res: Response): Promise<SkillDto>;
  abstract delete(req: Request, res: Response): Promise<void>;
}
