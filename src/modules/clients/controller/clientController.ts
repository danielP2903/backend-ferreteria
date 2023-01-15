import { Request, Response } from "express";
import { ClientService } from "../service/clientService";
import ResponseExpress from '../../../common/adapters/responseExpress';
//import { createCategoryJoiSchema, updateCategoryJoiSchema } from "../DTO/categoryDTO";
//import { JoiAdapter } from '../../../common/adapters/joiAdapter';

export class ClientController{
        public async saveClient(req:Request, resp:Response){
            const  clientService = new ClientService();
            const respExpress = new ResponseExpress();
            const {body} = req;
            console.log("Llego...",body);
            try{
                const result = await clientService.saveClient(body);
                return respExpress.successResponse(resp,result);
            }catch(error){
                return respExpress.errorResponse(resp, error as Error);
            }
    }

    public async updateClient (req:Request, resp:Response){
        const respExpress = new ResponseExpress();
        const  clientService = new ClientService();
        const {body} = req;
        const {identification} = req.params;
        console.log("Llego...",body);
        try {
            const result = await clientService.updateClient(identification as unknown as number,body);
            return respExpress.successResponse(resp,result);
        } catch (error) {
            return respExpress.errorResponse(resp, error as Error);
        }
    }

    public async listClients(_req:Request,resp:Response){
        const respExpress = new ResponseExpress();
        const  clientService = new ClientService();
        try {
            const resul = await clientService.list();
            return respExpress.successResponse(resp,resul);
        } catch (error) {
            return respExpress.errorResponse(resp, error as Error);
        }
    }

    public async deleteClient(req:Request, resp:Response){
        const respExpress = new ResponseExpress();
        const  clientService = new ClientService();

        const {id} = req.params;
        try {
            const resul = await clientService.delete(id as unknown as number);
            return respExpress.successResponse(resp,resul);
        } catch (error) {
            return respExpress.errorResponse(resp, error as Error);
        }
    }

    
}