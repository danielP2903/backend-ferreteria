import { StatusType } from './statusType';
export interface IIVa{
    idIva? : number;
    value  : number;
    description : string;
    estado: StatusType;
}