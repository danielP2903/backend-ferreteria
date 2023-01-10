import { Model, DataTypes } from "sequelize";
import { ProformaHeader } from "./headerProforma-schema";
import { SaleHeader } from "./saleHeader-schema";

const CLIENT_TABLE = 'clients';

const ClientSchema = {

    idClient:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_client", 
        type:         DataTypes.INTEGER
    },
    identification:{
        allowNull:    false,
        unique:       true,
        primaryKey:   false,
        type:         DataTypes.INTEGER
    },
    names:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    lastnames:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    address:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    phone:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    email:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    status:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    }

}

 class Clients extends Model{
    static associate(){
        this.hasMany(SaleHeader,{
            foreignKey: "idClient",
            as:"clientSaleHeader",
        });
        this.hasMany(ProformaHeader,{
            foreignKey: "idClient",
            as:"clientProformaHeader",
        });
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: CLIENT_TABLE,
            modelName: "Clients",
            timestamps:false
        }
    }
 }

 export  {
    CLIENT_TABLE,ClientSchema,Clients
 }