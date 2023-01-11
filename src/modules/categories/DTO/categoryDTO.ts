import Joi from 'joi';
import { ICategory } from '../../../common/interfaces/category';
const createCategoryJoiSchema = Joi.object<ICategory>({
    name:Joi.string().min(3).required()

});
const updateCategoryJoiSchema = Joi.object<ICategory>({
    idCategory: Joi.number().required(),
    name:Joi.string().min(3).required()

});
export {
    createCategoryJoiSchema,
    updateCategoryJoiSchema
}