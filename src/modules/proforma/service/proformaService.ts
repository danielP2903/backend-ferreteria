import { ProformaDetailService } from '../../proformaDetail/proformaDetailService';
import { ProformaRepository } from '../repository/proformaRepo';
import { IProformaCreate, Proforma } from '../../../common/interfaces/proforma';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';

export class ProformaService{
  public async getProforma(){
    const daoProformaRepo = new ProformaRepository();
    const res = await  daoProformaRepo.getProforma();
    
 
    const result: ServiceResponse<Proforma> = {
     httpStatus: HttpStatus.OK,
     message: MessagesSuccess.CONSULT,
     listData: res,
   };
   return result;

 }
    public async saveProforma(proforma:IProformaCreate,transaction:any){
       const daoProformaRepo = new ProformaRepository();
       const res = await  daoProformaRepo.saveItem(proforma.proformaHeader);
       const proformaDetailService = new ProformaDetailService();
       const detailBuild =await  proformaDetailService.buildObjectProformaDetail(proforma.proformaDetail,res.dataValues.idProformaHeader);
       await proformaDetailService.saveProformaDetail(detailBuild,transaction);
    
       const result: ServiceResponse<Proforma> = {
        httpStatus: HttpStatus.CREATED,
        message: MessagesSuccess.CREATED,
        data: res.dataValues,
      };
      return result;
 
    }

    public async deleteProforma(id:number){
      const daoProforma = new ProformaRepository();
      await daoProforma.deleteByStatus(id);
  
      const result: ServiceResponse<Proforma> = {
        httpStatus: HttpStatus.OK,
        message: MessagesSuccess.DELETED,
      };
      return result;
    }
}