import { Model, DataTypes } from "sequelize";
import { Products } from "./product-schema";

const UNITY_TABLE = 'unities';

const UnitySchema = {

    id_unity:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_unity", 
        type:         DataTypes.INTEGER
    },
    
    description:{
        allowNull:    false,
        primaryKey:   false,
        unique:       true,
        type:         DataTypes.STRING
    }
}

 class Unity extends Model{
    static associate(){
        this.hasMany(Products,{
            foreignKey: "idUnity",
            as:"productsUnity",
        });
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: UNITY_TABLE,
            modelName: "Unity",
            timestamps:false
        }
    }
 }

 export  {
    UNITY_TABLE,UnitySchema,Unity
 }