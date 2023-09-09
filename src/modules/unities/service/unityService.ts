import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { IUnity } from '../../../common/interfaces/unity';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
import { DaoUnityRepo } from '../repository/unityRepository';
export class UnityService {
    public async getUnities() {
        const daoUnityRepo = new DaoUnityRepo();
        const res = await daoUnityRepo.getItem();
        const result: ServiceResponse<IUnity> = {
          httpStatus: HttpStatus.OK,
          message: MessagesSuccess.CONSULT,
          listData: res,
        };
        return result;
      }
}