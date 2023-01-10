import { Model, DataTypes } from "sequelize";
import { User } from "./user-schema";

const ROL_TABLE = 'roles';

const RolSchema = {

    idRol:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_rol", 
        type:         DataTypes.INTEGER
    }, 
    name:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },

}

 class Role extends Model{
    static associate(){
     
        this.hasOne(User,{
            foreignKey:"idRol",
            as:"userRole"
        })
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: ROL_TABLE,
            modelName: "rol",
            timestamps:false
        }
    }
 }

 export  {
    ROL_TABLE,RolSchema,Role
 }