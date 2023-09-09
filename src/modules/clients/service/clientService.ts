import { IClient } from '../../../common/interfaces/client';
import { DaoClientRepository } from "../repository/daoClientRepository";
import { HttpStatus } from "../../../utils/enums/httpStatusEnum";
import { MessagesSuccess } from "../../../utils/enums/messagesSuccessEnum";
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
//import { httpErrorResponse } from '../../../helpers/httpErrorsHelper';
//import { number } from "joi";

export class ClientService{

daoClient = new DaoClientRepository();

    public async saveClient (data:IClient){
        const resp = await this.daoClient.saveItem(data);
        const result:ServiceResponse<IClient> ={
            httpStatus:HttpStatus.CREATED,
            data:resp.dataValues,
            message:MessagesSuccess.CREATED
        }
        return result;
    }

    public async updateClient (identification:number,data:IClient){
        const existClient = await this.daoClient.findByIdentification(identification,data.email);
        if(!existClient){
            throw new Error("No existe el cliente con la identificación ingresada")
        }
        await this.daoClient.updateClient(data);
        const result: ServiceResponse<IClient> ={
            httpStatus:HttpStatus.OK,
            message:MessagesSuccess.UPDATED
        }
        return result;
    }

    public async list (){
       const lits= await this.daoClient.getItem();
       const result: ServiceResponse<IClient> ={
        httpStatus:HttpStatus.OK,
        message:MessagesSuccess.CONSULT,
        listData:lits
    
    }
        return result;
    }

    public async delete(id:number){
        await this.daoClient.deleteByStatus(id)
        const resul: ServiceResponse<IClient> = {
            httpStatus:HttpStatus.OK,
            message:MessagesSuccess.DELETED
        }
        return resul;
    }
}