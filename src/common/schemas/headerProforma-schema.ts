import { Model, DataTypes } from "sequelize";
import { Clients, CLIENT_TABLE } from "./client-schema";
import { DetailProforma } from "./detailProforma-schema";

const HEADER_PROFORMA_TABLE = 'header_proforma';

const HeaderProformaSchema = {

    idProformaHeader:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_proforma_header", 
        type:         DataTypes.INTEGER
    }, 
    date:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.DATE
    },
    observation:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
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

 class ProformaHeader extends Model{
    static associate(){
        this.hasMany(DetailProforma,{
            foreignKey: "idProformaHeader",
            as:"detailProforma",
        });
        this.belongsTo(Clients,{
            foreignKey:"id_client",
            as:"clientSaleHeader"
        })
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: HEADER_PROFORMA_TABLE,
            modelName: "header_proforma",
            timestamps:false
        }
    }
 }

 export  {
    HEADER_PROFORMA_TABLE,HeaderProformaSchema,ProformaHeader
 }