import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model,QueryTypes } from 'sequelize';
import { ProformaHeader } from '../../../common/schemas/headerProforma-schema';
import { Proforma } from '../../../common/interfaces/proforma';
import dbConnection from '../../../common/dbConnection';
export class ProformaRepository extends DaoCrudGeneric<Proforma>{
    constructor(condition?:any){
        super(ProformaHeader as unknown as Model,condition)
    }

   async getProforma(){
        const item = await dbConnection.query(`SELECT header_proforma.id_proforma_header, header_proforma.date ,header_proforma.observation,header_proforma.status,clients.names,clients.lastnames FROM header_proforma  INNER JOIN clients ON clients.id_client = header_proforma.id_client`,{
            type:QueryTypes.SELECT
        })
        return item as Proforma[];
    }
}