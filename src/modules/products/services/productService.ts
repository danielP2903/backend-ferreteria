
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { IProduct } from '../../../common/interfaces/product';
import { DaoProductsRepo } from '../repository/daoProductRepository';
import dbConnection from '../../../common/dbConnection';
import { OperationsInventory } from '../../inventory/utils/operationsInventory';
import { InventoryService } from '../../inventory/services/inventoryService';
export class ProductsService{


    public async getProducts():Promise<ServiceResponse<IProduct>>{
        const daoProducts =  new DaoProductsRepo();
        const res         =  await daoProducts.getItem();
        const result: ServiceResponse<IProduct> = {
            httpStatus: HttpStatus.OK,
            message: MessagesSuccess.CONSULT,
            listData: res,
          };
          return result;
    }

    public async saveProducts(data:IProduct):Promise<ServiceResponse<IProduct>>{
        const transactional = await dbConnection.transaction();
        const daoProducts = new DaoProductsRepo();
        const existProductByName = await daoProducts.validExistProduct(data);
       
        if(existProductByName){
            throw new Error("Ya existe el producto con el nombre ingresado")
        }
       
        const res = await daoProducts.saveItem(data,transactional);
        const operationInventory = new OperationsInventory();
        const inventoryBuild = await  operationInventory.buildObjectCreateInventory(res.dataValues.idProduct,data.name);
        const inventoryService = new InventoryService();
        const respInventory = await inventoryService.saveInventory(inventoryBuild,transactional);
        if(!respInventory) {
            throw new Error("Ha ocurrido un error al crear el producto o el inventario");
            
        }
        
        const result:ServiceResponse<IProduct> ={
            httpStatus:HttpStatus.CREATED,
            message:MessagesSuccess.CREATED,
            data:res.dataValues
        }
        return result;
    }
    public async updateProducts(data:IProduct):Promise<ServiceResponse<IProduct>>{
        const condition = { where: { idProduct: data.idProduct } };
        const daoProducts = new DaoProductsRepo(condition);
        const existProductById = await daoProducts.findPkItem(data.idProduct);
        const existProduct = await daoProducts.validExistProduct(data);
        if(!existProductById){
            throw new Error("No se pudo encontrar el producto ingresado")
        }
        if(existProduct){
            throw new Error("Ya existe el producto con el nombre ingresado")
        }
        await daoProducts.updateItem(data);
        const result:ServiceResponse<IProduct> ={
            httpStatus:HttpStatus.OK,
            message:MessagesSuccess.UPDATED
        }
        return result;
    }
    public async deleteProducts(id:number):Promise<ServiceResponse<IProduct>>{
        const daoProductsRepo = new DaoProductsRepo();
        await daoProductsRepo.deleteItem(id);

        const result: ServiceResponse<IProduct> = {
        httpStatus: HttpStatus.OK,
        message: MessagesSuccess.DELETED,
        };
        return result;
    }

    public async findProductById(idProduct:number){
        const daoProductsRepo = new DaoProductsRepo();

        const resp = await daoProductsRepo.findPkItem(idProduct);
        if(!resp){
            throw new Error("El producto ingresado no existe para guardar el detalle de la venta")
        }
        return resp.dataValues;
    }
}
