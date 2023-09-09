import { Model, DataTypes } from "sequelize";
import { Products } from "./product-schema";

const IVA_TABLE = 'iva';

const IvaSchema = {

    idIva:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_iva", 
        type:         DataTypes.INTEGER
    },
    
    value:{
        allowNull:    false,
        primaryKey:   false,
        unique:       true,
        type:         DataTypes.INTEGER
    },
    description:{
        allowNull:    false,
        primaryKey:   false,
        unique:       true,
        type:         DataTypes.STRING
    },
    status:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    }
}

 class Iva extends Model{
    static associate(){
        this.hasMany(Products,{
            foreignKey: "idIva",
            as:"iva",
        });
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: IVA_TABLE,
            modelName: "Iva",
            timestamps:false
        }
    }
 }

 export  {
    IVA_TABLE,IvaSchema,Iva
 }