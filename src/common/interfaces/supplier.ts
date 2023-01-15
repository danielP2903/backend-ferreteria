import { StatusType } from './statusType';
export interface ISupplier{

    idSupplier      :   number;
    ruc             :   string;
    name            :   string;
    businessAdvisor :   string;
    phoneCompany?   :   string;
    phoneAdviser?   :   string;
    address         :   string;
    email?          :   string;
    status          :   StatusType;
}