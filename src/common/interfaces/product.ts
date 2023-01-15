import { StatusType } from './statusType';
export interface IProduct {
    idProduct       :   number;
    name            :   string;
    brand           :   string;
    price           :   number;
    status          :   StatusType;
    idCategory      :   number;
    idUnity         :   number;
}