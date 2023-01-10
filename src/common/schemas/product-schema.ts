import { Model, DataTypes } from "sequelize";
import {   Category } from "./category-schema";
import { DetailProforma } from "./detailProforma-schema";
import { DetailPurchase } from "./detailPurchase-schema";
import { DocumentES } from "./documentEs-Schema";
import { Inventory } from "./inventory-schema";
import { Unity, UNITY_TABLE } from "./unity-schema";

const PRODUCTS_TABLE = 'products';

const ProductSchema = {

    idProduct:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_product", 
        type:         DataTypes.INTEGER
    },
    
    name:{
        allowNull:    false,
        primaryKey:   false,
        unique:       true,
        type:         DataTypes.STRING
    },
    
    brand:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
      
    price:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.INTEGER
    },
    status:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },

    idCategory:{
        field:        "id_category",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model: "category",
            key:   "id_category"
        },
        onUpdate:      "CASCADE",
        onDelete:      "SET NULL"
    },
    idUnity:{
        field:        "id_unity",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model:    UNITY_TABLE,
            key:      "id_unity"
        },
        onUpdate:      "CASCADE",
        onDelete:      "SET NULL"
    }
}

 class Products extends Model{
    static  associate(){
        //models
        this.belongsTo(Category,{
            foreignKey: 'id_category',
            as: 'category'
        });
        this.belongsTo(Unity,{
            foreignKey: 'id_unity',
            as: 'unity'
        });
        this.hasMany(DetailPurchase,{
            foreignKey:"idProduct",
            as:"productDetPurchase"
        });
        this.hasMany(DetailProforma,{
            foreignKey:"idProduct",
            as:"productDetProforma"
        });
        this.hasMany(DocumentES,{
            foreignKey:"idProduct",
            as:"productDocumentEs"
        });
        this.hasMany(Inventory,{
            foreignKey:"idProduct",
            as:"productInventory"
        });
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: PRODUCTS_TABLE,
            modelName: "Products",
            timestamps:false
        }
    }
 }

 export  {
    PRODUCTS_TABLE,ProductSchema,Products
 }