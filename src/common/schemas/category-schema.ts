import { Model, DataTypes } from "sequelize";
import { Products } from "./product-schema";

const CATEGORY_TABLE = 'category';

const CategorySchema = {

    idCategory:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_category", 
        type:         DataTypes.INTEGER
    },
    
    name:{
        allowNull:    false,
        primaryKey:   false,
        unique:       true,
        type:         DataTypes.STRING
    }
}

 class Category extends Model{
    static associate(){
        this.hasMany(Products,{
            foreignKey: "idCategory",
            as:"products",
        });
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: CATEGORY_TABLE,
            modelName: "Category",
            timestamps:false
        }
    }
 }

 export  {
    CATEGORY_TABLE,CategorySchema,Category
 }