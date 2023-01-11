import { Products } from "../../../common/schemas/product-schema";
export class DaoTestRepository {

    public async getTestRepo(){
        // const mock = {
        //     name: "Juan",
        //     apellido: "Gutierrez",
        //     edad:23,
        //     estadoCivil:"soltero",
        //     madre:"doña alexa :v"
        // }

        const product = await Products.findAll();
        return product;
    }
}