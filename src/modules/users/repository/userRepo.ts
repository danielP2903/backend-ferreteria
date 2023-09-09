import { IUser } from '../../../common/interfaces/user';
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model, QueryTypes } from 'sequelize';
import { User } from '../../../common/schemas/user-schema';
import dbConnection from '../../../common/dbConnection';
export class DaoUserRepository  extends DaoCrudGeneric<IUser>{
    constructor(condition?:any){
        super(User as unknown as Model,condition)
    }

    public async findByNickname(nickname:string){
        const result = await User.findOne({where:{nickname}});
        return result;
    }

    public async getUser(){
        const item = await dbConnection.query(`SELECT users.id_user, users.nickname ,users.password,users.status,users.id_rol,rol.name, FROM users  INNER JOIN rol ON rol.id_rol = users.id_rol`,{
            type:QueryTypes.SELECT
        })
        return item as IUser[];

    }

    public async validStatus(id:number){
        const item = await User.findByPk(id)
        if(item?.dataValues.status !== "ACTIVO"){
            throw new Error("El usuario no esta activo en la base de datos");
            
        }
        return item;
    }
}