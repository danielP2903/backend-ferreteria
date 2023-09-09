import cors from "cors";
import express, { Application } from 'express';
import dbConnection from "../../../common/dbConnection";
import testRoutes from "../../routes/apiTest.routes";
import supplierRoutes from "../../routes/apiSupplier.routes";
import categoryRoutes from "../../routes/apiCategory.routes";
import productRoutes from "../../routes/apiProducts.routes";
import purchaseRoutes from "../../routes/apiCPurchase.routes";
import clienteRoutes from "../../routes/apiClient.routes";
import saleRoutes from "../../routes/apiSale.routes";
import unityRoutes from "../../routes/apiUnities.routes";
import ivaRoutes from "../../routes/apiIva.routes";
import dotenv from "dotenv";
import inventoryRoutes from "../../routes/apiInventory.routes"
import saleDetailRoutes from "../../routes/apiSaleDetail.routes"
import purchaseDetailRoutes from "../../routes/apiPurchaseDetail.routes"
import UserRoutes from "../../routes/apiUser.routes"
import AuthRoutes from "../../routes/apiAuth.routes"
import ProformaRoutes from "../../routes/apiProforma.routes"

dotenv.config();
class Server {
    private app: Application;
    private port:String;
    private apiPaths = {
        
        test        :   '/api/test',
        supplier    :   '/api/supplier',
        category    :   '/api/category',
        products    :   '/api/product',
        purchases   :   '/api/purchases',
        client      :   '/api/client',
        sale        :    '/api/sale',
        unity       :   '/api/unity',
        iva         :   '/api/iva',
        inventory   :   '/api/inventory',
        saleDetail  :   '/api/saleDetail',
        purchaseDetail  :   '/api/purchaseDetail',
        user        :   '/api/user',
        auth        :   '/api/auth',
        proforma        :   '/api/proforma'



}

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';  
        this.dbConnection();
        this.middlewares();
        this.routes();

    }
      //TODO conectar bd

      async dbConnection(){
        try {
            await dbConnection.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error( 'error');
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura del body
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.apiPaths.test,testRoutes);
        this.app.use(this.apiPaths.supplier,supplierRoutes);
        this.app.use(this.apiPaths.category,categoryRoutes);
        this.app.use(this.apiPaths.products,productRoutes);
        this.app.use(this.apiPaths.purchases,purchaseRoutes);
        this.app.use(this.apiPaths.category,categoryRoutes)
        this.app.use(this.apiPaths.client,clienteRoutes);
        this.app.use(this.apiPaths.sale,saleRoutes);
        this.app.use(this.apiPaths.unity,unityRoutes);
        this.app.use(this.apiPaths.iva,ivaRoutes);
        this.app.use(this.apiPaths.inventory,inventoryRoutes);
        this.app.use(this.apiPaths.saleDetail,saleDetailRoutes);
        this.app.use(this.apiPaths.purchaseDetail,purchaseDetailRoutes);
        this.app.use(this.apiPaths.user,UserRoutes);
        this.app.use(this.apiPaths.auth,AuthRoutes);
        this.app.use(this.apiPaths.proforma,ProformaRoutes);


        
        

        this.app.get("/", (_req, res) => res.status(200).json({ ok: true }));

    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto!!' + this.port);
        })
    }
}export default Server;