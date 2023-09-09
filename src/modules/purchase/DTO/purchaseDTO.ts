
import Joi from "joi";
import { IPurchaseHeader, IPurchase, IDetailPurchase } from '../../../common/interfaces/purchase';



const createPurchaseHeaderJoiSchema = Joi.object<IPurchaseHeader>({
    idSupplier:     Joi.number().required(),
    date:           Joi.string().required(),
    numberInvoice:  Joi.number().required(),
    subtotal:       Joi.number().required(),
    iva:            Joi.number().required(),
    email:          Joi.string().email().required(),
    dsto:           Joi.number().required(),
    total:            Joi.number().required(),

});
const createPurchaseDetailJoiSchema = Joi.object<IDetailPurchase>({
    quantity:   Joi.number().required(),
    pricePurchase:   Joi.number().required(),
    idPurchaseHeader:   Joi.number().required(),
    idProduct:   Joi.number().required(),

});
// const createPurchaseDetailJoiSchema = Joi.array().items(
//     Joi.object().keys({
//         quantity:   Joi.number().required(),
//         pricePurchase:   Joi.number().required(),
//         idPurchaseHeader:   Joi.number().required(),
//         idProduct:   Joi.number().required(),
//     }
//     )
// )




const updatePurchaseHeaderJoiSchema = Joi.object<IPurchaseHeader>({
    idPurchase:     Joi.number().required(),
    numberInvoice:  Joi.number().required(),
    email:          Joi.string().email().required(),
   

});

// const documentEs = Joi.object<DocumentEs>({
//     quantityProduct:   Joi.number().required(),
//     date:   Joi.required(),
//     description:   Joi.required(),
//     status:         Joi.string().equal("ACTIVO","INACTIVO"),
//     idProduct:   Joi.number().required(),

// });

const createPurchaseJoiSchema = Joi.object<IPurchase>({
    purchase: createPurchaseHeaderJoiSchema,
    purchaseDetail:Joi.array().allow(createPurchaseDetailJoiSchema),

});


const updatePurchaseDetailJoiSchema = Joi.object<IDetailPurchase>({
    idDetailPurchase : Joi.number().required(),
    quantity:   Joi.number().required(),
    pricePurchase:   Joi.number().required(),
    idPurchaseHeader:   Joi.number().required(),
    idProduct:   Joi.number().required(),

});

const updatePurchaseJoiSchema = Joi.object<IPurchase>({
    purchase: updatePurchaseHeaderJoiSchema});

export {
    createPurchaseJoiSchema,
    updatePurchaseJoiSchema,
    createPurchaseHeaderJoiSchema,
    createPurchaseDetailJoiSchema,
    updatePurchaseHeaderJoiSchema,
    updatePurchaseDetailJoiSchema
    
}