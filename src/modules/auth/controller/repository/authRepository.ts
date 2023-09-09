import  Jwt  from "jsonwebtoken"
import bcryptjs from "bcrypt"
import { Role } from "../../../../common/schemas/rol-schema";

export class DaoAutenthicationRepo{
    validatePassword(password: string,hashPass?:string): boolean {
        const validPass = bcryptjs.compareSync(password,hashPass!);
        if(!validPass){
            return false;
        }
        return true;
    }
    async generateToken (nickname: string,idRol:number) {
        const role = await  Role.findByPk(idRol);
        return new Promise((resolve,reject) =>{
            const payload = nickname;
            Jwt.sign({payload},process.env.SECRETORPRIVATEKEY as string,{
                expiresIn:"1d",
                algorithm:'HS256'
            },(err,token)=>{
                if(err){
                    console.log(err);
                    reject('No se pudo generar el token');
                }else{
                   
                    const data = {
                        nickname,
                        message:'genial',
                        token,
                        role:role?.dataValues.name
                    }
                    resolve(data);
                }
            })
        })    }
}