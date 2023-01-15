import { StatusType } from './statusType';
export interface ISalesHeader {
    idSale      :   number;
    number      :   number;
    date        :   Date;
    subtotal    :   number;
    iva         :   number;
    total       :   number;
    status      :   StatusType;
    idClient    :   number;
}

export interface ISaleDetail{
    idDetailSale    :   number;
    quantityProduct :   number;
    subtotal        :   number;
    idSaleHeader    :   number;
    idProduct       :   number;
}

export interface ISale{
    saleHeader      :   ISalesHeader;
    saleDetail      :   ISaleDetail[];
}