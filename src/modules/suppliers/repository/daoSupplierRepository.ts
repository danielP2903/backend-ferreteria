import { Supplier } from "../../../common/schemas/supplier-schema";
import { ISupplier } from '../../../common/interfaces/supplier';
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model } from 'sequelize';

export class DaoSupplerRepository extends DaoCrudGeneric<ISupplier>{

    constructor(condition?:any){
        super(Supplier as unknown as Model,condition)
    }

    public async validExistSupplier(name:string,ruc:string){
       await this.findByName(name);
       await this.findByRuc(ruc)
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

 
}