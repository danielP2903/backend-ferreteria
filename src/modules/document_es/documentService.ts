import { DocumentEsRepo } from './documentRepo';
import { DocumentEs } from '../../common/interfaces/document_es';
export class DocumentEsService {

   async  save(data:DocumentEs[],transaction:any){
        
        try {
            const daoDocument = new DocumentEsRepo();

            await daoDocument.saveMultipleItems(data,transaction);

        } catch (error) {
            throw new Error("Ha ocurrido un error al guardar el descuento");
            
        }
    }

}