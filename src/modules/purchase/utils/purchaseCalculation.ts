import { IPurchase } from '../../../common/interfaces/purchase';
export class PurchaseCalculation{
    private purchase:IPurchase;
    private subtotal:number = 0;
    constructor(data:IPurchase){
        this.purchase = data;
    }
    public main(){
        this.calculateSubtotal(this.purchase);
        const resp = this.calculateTotal(this.subtotal,this.purchase.purchase.iva,this.purchase.purchase.dsto);
        return resp;
    }
    public calculateSubtotal(data:IPurchase){
        const totalByProducts:number[] =[];
        data.purchaseDetail.map(data => {
            data.pricePurchase * data.quantity
            totalByProducts.push(data.pricePurchase * data.quantity);
        });
         
        totalByProducts.map(value => this.subtotal +=value);
        this.purchase.purchase.subtotal = this.subtotal;
    }

    public calculateTotal(subtotal:number,iva:number,dsto:string){
        let dstoValid;
        dstoValid = parseInt(dsto)
        let total = subtotal + iva;
        total = total - dstoValid;
        this.purchase.purchase.total = total;
        return this.purchase;

    }
}