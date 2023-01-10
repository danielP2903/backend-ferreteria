import { Model,DataTypes } from 'sequelize';
import { DetailPurchase } from './detailPurchase-schema';
import { Supplier, SUPPLIER_TABLE } from './supplier-schema';


const PURCHASE_HEADER_TABLE = "purchase_header";

const PurchaseHeaderSchema = {

    idPurchaseHeader:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_purchase_header", 
        type:         DataTypes.INTEGER
    },
    date:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.DATE
    },
    numberInvoice:{
        allowNull:    false,
        primaryKey:   false,
        unique:       true,
        field:        "number_invoice",
        type:         DataTypes.STRING
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
    email:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    dsto:{
        allowNull:    true,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    total:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.DOUBLE
    },
    idSupplier:{
        field:        "id_supplier",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model:    SUPPLIER_TABLE,
            key:      "id_supplier"
        },
        onUpdate:      "CASCADE",
        onDelete:      "SET NULL"
    }
    }

class PurchaseHeader extends Model{
    static  associate(){
        //models
        this.belongsTo(Supplier,{
            foreignKey: 'id_supplier',
            as: 'suppliers'
        });

        this.hasMany(DetailPurchase,{
            foreignKey:"idPurchaseHeader",
            as:"detailPurchase"
        })


      
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: "purchase_header",
            modelName: "purchase_header",
            timestamps:false
        }
    }
}
export  {
    PURCHASE_HEADER_TABLE,PurchaseHeaderSchema,PurchaseHeader
 }