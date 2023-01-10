import { Model,DataTypes } from 'sequelize';
import { Products } from './product-schema';
import { PurchaseHeader } from './purchaseHeader-schema';


const DETAIL_PURCHASE_TABLE = "detail_purchase"

const DetailPurchaseSchema = {
    idDetailPurchase:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_detail_purchase", 
        type:         DataTypes.INTEGER
    },
    quantity:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.INTEGER
    },
    pricePurchase:{
        field:        "price_purchase",
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.DOUBLE
    },
    idPurchaseHeader:{
        field:        "id_purchase_header",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model:    "purchase_header",
            key:      "id_purchase_header"
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
class DetailPurchase extends Model{
    static  associate(){
        //models
        this.belongsTo(PurchaseHeader,{
            foreignKey: 'id_purchase_header',
            as: 'purchaseHeader'
        });
        this.belongsTo(Products,{
            foreignKey: 'id_product',
            as: 'productDetPurchase'
        });
      
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: "detail_purchase",
            modelName: "detail_purchase",
            timestamps:false
        }
    }
}
export  {
    DETAIL_PURCHASE_TABLE,DetailPurchaseSchema,DetailPurchase
 }