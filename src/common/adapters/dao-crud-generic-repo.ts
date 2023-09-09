import { Model } from "sequelize";

class DaoCrudGeneric<T> {

    private model!:any;
    private condition?:any;

    constructor(model:Model,condition?:any){
        this.model = model;
        this.condition = condition;
    }

    public async getItem():Promise<T[]>{
        const items = await this.model.findAll();
        return items;
    }
    public async findPkItem(id:number){
        const item = await this.model.findByPk(id);
        return item 
    }

    public async saveItem(data:T,transactional?:any){
        const item = await this.model.create(data,{transaction:transactional});
        return item;

    }

    public async updateItem(data:T,transactional?:any){
        console.log(transactional);
        
        const item = await this.model.update(data,this.condition);
        return item;
    }

    public async deleteItem(id:number){
        const item = await this.model.findByPk(id);

        if(!item){
            throw new Error("El item ingresado no existe");
        }
        await item.destroy();

        return true;

    }
    public async deleteByStatus(id:number){
        const item = await this.model.findByPk(id);
        
        if(!item){
            throw new Error("El item ingresado no existe");
        }
        await item.update({status:"INACTIVO"})

        return true;

    }
}


export default DaoCrudGeneric