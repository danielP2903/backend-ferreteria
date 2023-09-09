import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
import { IIVa } from '../../../common/interfaces/iva';
import { DaoIvaRepo } from '../repository/ivaRepository';
export class IvaService {
    public async getIva() {
        const daoIvaRepo = new DaoIvaRepo();
        const res = await daoIvaRepo.getItem();
        const result: ServiceResponse<IIVa> = {
          httpStatus: HttpStatus.OK,
          message: MessagesSuccess.CONSULT,
          listData: res,
        };
        return result;
      }
}