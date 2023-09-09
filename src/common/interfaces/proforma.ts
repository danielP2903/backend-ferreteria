import { StatusType } from './statusType';
export interface Proforma {
    idProformaHeader : number;
    idClient  : number;
    date      : Date;
    status     : StatusType;
    observation: string;


}
export interface ProformaDetail{
    proformaDetailId:number;
    idProformaHeader:number;
    idProduct:number;
    quantityProduct:number;
    subtotal:number;
}

export interface IProformaCreate{
    proformaHeader:Proforma;
    proformaDetail:ProformaDetail[]
}