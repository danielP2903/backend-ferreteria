import { StatusType } from './statusType';
export interface DocumentEs{
    idDocument:number;
    quantityProduct:number;
    date:Date;
    description:string;
    status:StatusType;
    idProduct:number;
}