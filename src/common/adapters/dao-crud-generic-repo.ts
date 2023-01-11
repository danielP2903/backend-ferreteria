import { Model } from "sequelize";

class DaoCrudGeneric<T> {

    private model!:any;
    constructor(model:Model){
        this.model = model;
    }

    public async getItem(){
        const items = await this.model.findAll();
        return items;
    }
    public async findPkItem(id:number){
        const item = await this.model.findByPk(id);
        return item 
    }

    public async saveItem(data:T){
        const item = await this.model.create(data);
        return item;

    }

    public async updateItem(data:T,id:number){
        const item = await this.model.update(data,{where: {id: id}});
        return item;
    }

    public deleteItem(){

    }
}
export default DaoCrudGeneric