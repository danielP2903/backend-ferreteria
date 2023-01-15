import Joi from "joi";
import { ISupplier } from '../../../common/interfaces/supplier';

const idSupplier        = Joi.number();
const ruc               = Joi.string();
const name              = Joi.string().min(3).max(30);
const businessAdvisor   = Joi.string().min(3).max(30);
const address           = Joi.string();
const phoneCompany      = Joi.string().min(10);
const phoneAdviser      = Joi.string().min(10);
const email             = Joi.string().email({tlds:{allow:['com','co']}});
const status            = Joi.string().equal("ACTIVO","INACTIVO");

const createSupplierJoiSchema = Joi.object<ISupplier>({
    ruc:ruc.required(),
    name:name.required(),
    businessAdvisor:businessAdvisor.required(),
    address:address.required(),
    phoneCompany:phoneCompany.optional(),
    phoneAdviser:phoneAdviser.optional(),
    email:email.optional(),
    status:status.required()

});
const updateSupplierJoiSchema = Joi.object({
    idSupplier:idSupplier.required(),
    ruc:ruc.required(),
    name:name.required(),
    businessAdvisor:businessAdvisor.required(),
    address:address.required(),
    phoneCompany:phoneCompany.optional(),
    phoneAdviser:phoneAdviser.optional(),
    email:email.optional(),
    status:status.required()

});
const deleteSupplierJoiSchema = Joi.number();
export {
    createSupplierJoiSchema,
    updateSupplierJoiSchema,
    deleteSupplierJoiSchema
}