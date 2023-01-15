export interface IPurchaseHeader {
    idPurchase      :   number;
    idSupplier      :   number;
    date            :   Date;
    numberInvoice   :   number;
    subtotal        :   number;
    iva             :   number;
    email           :   string;
    dsto            :   string;
    total           :   number;    
}


export interface IDetailPurchase {
    idDetailPurchase?   :   number;
    quantity            :   number;
    pricePurchase       :   number;
    idPurchaseHeader    :   number;
    idProduct           :   number;
}

export interface IPurchase {
    purchase        : IPurchaseHeader;
    purchaseDetail  : IDetailPurchase[];
}