import { Supplier } from "../../../common/schemas/supplier-schema";
import { ISupplier } from '../../../common/interfaces/supplier';

export class DaoSupplerRepository{

    private data?:ISupplier;
    constructor(data?:ISupplier){
        this.data = data
    }
    public async validExistSupplier(){
        await this.findByName(this.data!.name);
        await this.findByRuc(this.data!.ruc);
    }

    public async getSuppliers(){
        const items = await Supplier.findAll();
        return items;
    }

    public async findByName(name:string){

        const result = await Supplier.findOne({where:{
            name
        }});

        if(result){throw new Error("Ya existe un proveedor con este nombre")}
    }

    public async findByRuc(ruc?:string){

        const result = await Supplier.findOne({where:{
            ruc
        }});
        if(result ){throw new Error("Ya existe un proveedor con este ruc")}

    }

    public async dataEqualUpdate(id:number){
        const result = await Supplier.findByPk(id);

        if(!result){
            throw new Error("No existe el proveedor ingresado")
        }

     
        return result.dataValues;
    }

    public async updateSupplier(data:ISupplier){
        const item = await Supplier.update(data,{where: {idSupplier: data.idSupplier}});
        return item;
    }
}