import { DaoAutenthicationRepo } from '../controller/repository/authRepository';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
import { IUser } from '../../../common/interfaces/user';
import { DaoUserRepository } from '../../users/repository/userRepo';
export class AuthService{
    public async  generateToken(user:IUser){

        const {nickname,password} = user;
        const daoAuthRepo = new DaoAutenthicationRepo();
        const userDaoRepo = new DaoUserRepository();
        const userExist = await userDaoRepo.findByNickname(nickname);

        if(!userExist){ throw new Error("No existe el usuario en la bd")}
        const isValidPassword =  daoAuthRepo.validatePassword(password,userExist.dataValues.password);
        if(!isValidPassword){ throw new Error("Contraseña no válida")}
        const data = await daoAuthRepo.generateToken(user.nickname,userExist.dataValues.idRol);
        await userDaoRepo.validStatus(userExist.dataValues.idUser as number);
        const result: ServiceResponse<any> = {
            httpStatus: HttpStatus.OK,
            message: MessagesSuccess.CONSULT,
            data
          };
          return result;
    }
}