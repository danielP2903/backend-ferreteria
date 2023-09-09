import { ProformaDetail } from '../../common/interfaces/proforma';
import { ProformaDetailRepository } from './proformaDetailRepo';
import { ProductsService } from '../products/services/productService';
export class ProformaDetailService {
    
    public async buildObjectProformaDetail(data: ProformaDetail[], proformaId: number) {
        data.map(data => data.idProformaHeader = proformaId);
        return data;
    }
    public async saveProformaDetail(data: ProformaDetail[],transaction:any) {

        const proformaDetailRepository = new ProformaDetailRepository();
        const productService = new ProductsService();
        const arrayPromises = await data.map(async data => {
            await productService.findProductById(data.idProduct);
        })
        const resp = Promise.all(arrayPromises).then(async datas => {
            console.log(datas);
            await proformaDetailRepository.saveMultipleDetails(data,transaction);
            
        }).catch(err => this.errorInPromise(err))
        console.log(resp);
        return resp;
    }

    
    public errorInPromise(err: any) {
        throw new Error(err.message)
    }
}