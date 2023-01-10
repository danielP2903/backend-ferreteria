import { Model, DataTypes } from "sequelize";
import { Products } from "./product-schema";

const DOCUMENT_ES_TABLE = 'document_es';

const DocumentEsSchema = {

    idDocument:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_document", 
        type:         DataTypes.INTEGER
    }, 
    quantityProduct:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.INTEGER
    },
    date:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.DATE
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

 class DocumentES extends Model{
    static associate(){
     
        this.belongsTo(Products,{
            foreignKey:"id_product",
            as:"productDocumentEs"
        })
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: DOCUMENT_ES_TABLE,
            modelName: "document_es",
            timestamps:false
        }
    }
 }

 export  {
    DOCUMENT_ES_TABLE,DocumentEsSchema,DocumentES
 }