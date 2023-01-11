import { Model,DataTypes } from 'sequelize';
import { PurchaseHeader } from './purchaseHeader-schema';


const SUPPLIER_TABLE = "supplier";

const SupplierSchema = {

    idSupplier:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_supplier", 
        type:         DataTypes.INTEGER
    },
    ruc:{
        allowNull:    false,
        primaryKey:   false,
        unique:       true,
        type:         DataTypes.STRING
    },
    name:{
        allowNull:    false,
        primaryKey:   false,
        unique:       true,
        type:         DataTypes.STRING
    },
    businessAdvisor:{
        allowNull:    false,
        primaryKey:   false,
        field:        "business_advisor",
        type:         DataTypes.STRING
    },
    address:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    phoneCompany:{
        field:        "phone_company",
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    phoneAdviser:{
        field:        "phone_adviser",
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    email:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    status:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    }
}
const modelSupplier = SupplierSchema;
class Supplier extends Model{
    static save: any;
    static associate(){
        this.hasMany(PurchaseHeader,{
            foreignKey: "idSupplier",
            as:"purchaseHeader",
        });
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: SUPPLIER_TABLE,
            modelName: "Supplier",
            timestamps:false
        }
    }
}

export  {
    SUPPLIER_TABLE,SupplierSchema,Supplier,modelSupplier
 }