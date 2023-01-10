import { Model, DataTypes } from "sequelize";
import { Clients, CLIENT_TABLE } from "./client-schema";
import { DetailSale } from "./detailSale-schema";

const SALE_HEADER_TABLE = 'sale_header';

const SaleHeaderSchema = {

    idSaleHeader:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_sale_header", 
        type:         DataTypes.INTEGER
    },
    number:{
        allowNull:    false,
        unique:       true,
        primaryKey:   false,
        type:         DataTypes.INTEGER
    },
    date:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.DATE
    },
    subtotal:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.DOUBLE
    },
    iva:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.DOUBLE
    },
    total:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.DOUBLE
    },
    status:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    idClient:{
        field:        "id_client",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model:    CLIENT_TABLE,
            key:      "id_client"
        },
        onUpdate:      "CASCADE",
        onDelete:      "SET NULL"
    },

}

 class SaleHeader extends Model{
    static associate(){
        this.hasMany(DetailSale,{
            foreignKey: "idSaleHeader",
            as:"detailSaleHeaderSale",
        });
        this.belongsTo(Clients,{
            foreignKey:"id_client",
            as:"clientSaleHeader"
        })
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: SALE_HEADER_TABLE,
            modelName: "sale_header",
            timestamps:false
        }
    }
 }

 export  {
    SALE_HEADER_TABLE,SaleHeaderSchema,SaleHeader
 }