import { StatusType } from './statusType';
export interface IInventory{
    idInventory?         :   number;
    stock               :   number;
    description         :   string;
    status              :   StatusType;
    idProduct           :   number;
}