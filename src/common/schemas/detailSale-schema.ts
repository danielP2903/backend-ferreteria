import { Model, DataTypes } from "sequelize";
import { Products } from "./product-schema";
import { SaleHeader, SALE_HEADER_TABLE } from "./saleHeader-schema";

const DETAIL_SALE_TABLE = 'sale_header';

const DetailSaleSchema = {

    idDetailSale:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_detail_sale", 
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
    idSaleHeader:{
        field:        "id_sale_header",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model:    SALE_HEADER_TABLE,
            key:      "id_sale_header"
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

 class DetailSale extends Model{
    static associate(){
        this.belongsTo(Products,{
            foreignKey: "id_product",
            as:"productsDetailSale",
        });
        this.belongsTo(SaleHeader,{
            foreignKey:"id_sale_header",
            as:"saleHeaderDetSale"
        })
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: DETAIL_SALE_TABLE,
            modelName: "detail_sale",
            timestamps:false
        }
    }
 }

 export  {
    DETAIL_SALE_TABLE,DetailSaleSchema,DetailSale
 }