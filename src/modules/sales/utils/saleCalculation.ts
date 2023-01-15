import { ISale } from "../../../common/interfaces/sales";
export class SaleCalculation{
    private Sale:ISale;
    private subtotal:number = 0;
    constructor(data:ISale){
        this.Sale = data;
    }
    public main(){
        this.calculateSubtotal(this.Sale);
        const resp = this.calculateTotal(this.subtotal,this.Sale.saleHeader.iva);
        return resp;
    }
    public calculateSubtotal(data:ISale){
        const totalByProducts:number[] =[];
        data.saleDetail.map(data => {
            data.quantityProduct * data.subtotal
            totalByProducts.push(data.quantityProduct * data.subtotal);
        });
         
        totalByProducts.map(value => this.subtotal +=value);
        this.Sale.saleHeader.subtotal = this.subtotal;
    }

    public calculateTotal(subtotal:number,iva:number){

        const total = subtotal + iva;
        this.Sale.saleHeader.total = total;
        return this.Sale;

    }
}