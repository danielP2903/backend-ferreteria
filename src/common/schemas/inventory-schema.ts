import { Model, DataTypes } from "sequelize";
import { Products } from "./product-schema";

const INVENTORY_TABLE = 'inventory';

const InventorySchema = {

    idInventory:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_inventory", 
        type:         DataTypes.INTEGER
    }, 
    stock:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.INTEGER
    },
    description:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
 
    status:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    idProduct:{
        field:        "id_product",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model:    "products",
            key:      "id_product"
        },
        onUpdate:      "CASCADE",
        onDelete:      "SET NULL"
    }

}

 class Inventory extends Model{
    static associate(){
     
        this.belongsTo(Products,{
            foreignKey:"id_product",
            as:"productInventory"
        })
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: INVENTORY_TABLE,
            modelName: "inventory",
            timestamps:false
        }
    }
 }

 export  {
    INVENTORY_TABLE,InventorySchema,Inventory
 }