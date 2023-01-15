import { Clients } from "../../../common/schemas/client-schema";
import { IClient } from "../../../common/interfaces/client";
//import { number } from 'joi';

export class DaoClientRepository{

    public async saveClient( data:any){
        const item = await Clients.create(data);
        return item;
    }
    public async updateClient( data:IClient){
        const item = await Clients.update(
            {names:data.names,lastnames:data.lastnames,address:data.address,phone:data.phone,email:data.email,status:data.status}
            ,{where:{identification:data.identification}});
        return item;
    }
    public async deleteClient (id:number){
        
        const item = await Clients.findByPk(id);
        if(!item){
            throw new Error("No existe el recurso");
        }
        await item.destroy();
        return item;
    }

    public async listClient(){
        const item = await Clients.findAll();
        return item;
    }

    public async findByIdentification(identification: number, email:string){
        const item = await Clients.findOne({where:{identification,email}})
        return item;
    }
}