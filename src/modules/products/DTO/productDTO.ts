import { IProduct } from './../../../common/interfaces/product';
import Joi from 'joi';
const createProductJoiSchema = Joi.object<IProduct>({
    name:Joi.string().min(3).required(),
    brand:Joi.string().min(3).required(),
    price:Joi.number().required(),
    status:Joi.string().equal("ACTIVO","INACTIVO").required(),
    idCategory:Joi.number().required(),
    idUnity:Joi.number().required(),
    idIva:Joi.number().required()

});
const updateProductJoiSchema = Joi.object<IProduct>({
    idProduct: Joi.number().required(),
    name:Joi.string().min(3).required(),
    brand:Joi.string().min(3).required(),
    price:Joi.number().required(),
    status:Joi.string().equal("ACTIVO","INACTIVO").required(),
    idCategory:Joi.number().required(),
    idUnity:Joi.number().required(),
    idIva:Joi.number().required()

});
export {
    createProductJoiSchema,
    updateProductJoiSchema
}