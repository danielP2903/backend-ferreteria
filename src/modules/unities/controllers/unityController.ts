import { Response,Request } from 'express';
import ResponseExpress from '../../../common/adapters/responseExpress';
import { UnityService } from '../service/unityService';
export class UnityController{
    
  public async getUnities(req: Request, res: Response) {

    const responseExpress = new ResponseExpress();
    console.log(req);
    

    try {
      const unityService = new UnityService();
      const result = await unityService.getUnities();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
}