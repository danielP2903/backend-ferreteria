import { StatusType } from './statusType';
export interface IUser{
    idUser?:number;
    nickname:string;
    password:string;
    status:StatusType;
    idRol:number;
}