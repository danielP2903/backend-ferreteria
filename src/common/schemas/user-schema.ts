import { Model, DataTypes } from "sequelize";
import { Role, ROL_TABLE } from "./rol-schema";

const USER_TABLE = 'users';

const UserSchema = {

    idUser:{
        allowNull:    false,
        autoIncrement:true,
        primaryKey:   true,
        field:        "id_user", 
        type:         DataTypes.INTEGER
    }, 
    nickname:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    password:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
 
    status:{
        allowNull:    false,
        primaryKey:   false,
        type:         DataTypes.STRING
    },
    idRol:{
        field:        "id_rol",
        allowNull:    false,
        type:         DataTypes.INTEGER,
        references:{
            model:    ROL_TABLE,
            key:      "id_rol"
        },
        onUpdate:      "CASCADE",
        onDelete:      "SET NULL"
    }

}

 class User extends Model{
    static associate(){
     
        this.belongsTo(Role,{
            foreignKey:"id_rol",
            as:"userRole"
        })
    }
    static config(sequelize:any){
        return {
            sequelize,
            tablename: USER_TABLE,
            modelName: "users",
            timestamps:false
        }
    }
 }

 export  {
    USER_TABLE,UserSchema,User
 }