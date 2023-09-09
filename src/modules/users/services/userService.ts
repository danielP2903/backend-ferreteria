import { IUser } from '../../../common/interfaces/user';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { DaoUserRepository } from '../repository/userRepo';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
import bcrypt from "bcrypt";

export class UserService{
  public async getUser():Promise<ServiceResponse<IUser>> {
    const daoUserRepo = new DaoUserRepository();
 
    const resp = await daoUserRepo.getItem();
   
    const result: ServiceResponse<IUser> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.CONSULT,
      listData:resp
    };
    return result;
  }
    public async createUser(user: IUser,):Promise<ServiceResponse<IUser>> {
        const daoUserRepo = new DaoUserRepository();
        let {password} = user;
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password,salt)
        user.password = password;
        await daoUserRepo.saveItem(user);
       
        const result: ServiceResponse<IUser> = {
          httpStatus: HttpStatus.CREATED,
          message: MessagesSuccess.CREATED,
        };
        return result;
      }

      public async deleteUser(id:number):Promise<ServiceResponse<IUser>> {
        const daoUserRepo = new DaoUserRepository();
        await daoUserRepo.deleteByStatus(id);
    
        const result: ServiceResponse<IUser> = {
          httpStatus: HttpStatus.OK,
          message: MessagesSuccess.DELETED,
        };
        return result;
      }
}