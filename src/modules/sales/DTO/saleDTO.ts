
import Joi from "joi";
import { ISalesHeader, ISaleDetail, ISale } from '../../../common/interfaces/sales';



const createSaleHeaderJoiSchema = Joi.object<ISalesHeader>({
    date:           Joi.string().required(),
    number:         Joi.number().required(),
    subtotal:       Joi.number().required(),
    iva:            Joi.number().required(),
    total:          Joi.number().required(),
    status:         Joi.string().equal("ACTIVO","INACTIVO"),
    idClient:       Joi.number().required()

});
const createSaleDetailJoiSchema = Joi.object<ISaleDetail>({
    quantityProduct:   Joi.number().required(),
    subtotal:   Joi.number().required(),
    idSaleHeader:   Joi.number().required(),
    idProduct:   Joi.number().required(),

});

// const documentEs = Joi.object<DocumentEs>({
//     quantityProduct:   Joi.number().required(),
//     date:   Joi.required(),
//     description:   Joi.required(),
//     status:         Joi.string().equal("ACTIVO","INACTIVO"),
//     idProduct:   Joi.number().required(),

// });

const createSaleJoiSchema = Joi.object<ISale>({
    saleHeader: createSaleHeaderJoiSchema.required(),
    saleDetail:Joi.array().allow(createSaleDetailJoiSchema).required(),

});






export {
    createSaleJoiSchema,
    createSaleHeaderJoiSchema,
    createSaleDetailJoiSchema,
   
    
}