import { Model, DataTypes } from "sequelize";
import { HEADER_PROFORMA_TABLE, ProformaHeader } from "./headerProforma-schema";
import { Products } from "./product-schema";

const DETAIL_PROFORMA_TABLE = 'sale_header';

const DetailProformaSchema = {

    idDetailProforma:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_detail_proforma", 
        type:         DataTypes.INTEGER
    },
    quantityProduct:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.INTEGER
    },
    subtotal:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.DOUBLE
    },
    idProformaHeader:{
        field:        "id_proforma_header",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model:    HEADER_PROFORMA_TABLE,
            key:      "id_proforma_header"
        },
        onUpdate:      "CASCADE",
        onDelete:      "SET NULL"
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

 class DetailProforma extends Model{
    static associate(){
        this.belongsTo(Products,{
            foreignKey: "id_product",
            as:"productsDetailSale",
        });
        this.belongsTo(ProformaHeader,{
            foreignKey:"id_proforma_header",
            as:"proformaHeaderDet"
        })
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: DETAIL_PROFORMA_TABLE,
            modelName: "detail_proforma",
            timestamps:false
        }
    }
 }

 export  {
    DETAIL_PROFORMA_TABLE,DetailProformaSchema,DetailProforma
 }