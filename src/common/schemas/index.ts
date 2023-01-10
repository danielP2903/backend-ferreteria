
import { Category, CategorySchema } from "./category-schema";
import { Clients, ClientSchema } from "./client-schema";
import { DetailProforma, DetailProformaSchema } from "./detailProforma-schema";
import { DetailPurchase, DetailPurchaseSchema } from "./detailPurchase-schema";
import { DetailSale, DetailSaleSchema } from "./detailSale-schema";
import { DocumentES, DocumentEsSchema } from "./documentEs-Schema";
import { HeaderProformaSchema, ProformaHeader } from "./headerProforma-schema";
import { Inventory, InventorySchema } from "./inventory-schema";
import { Products,ProductSchema } from "./product-schema"
import { PurchaseHeader, PurchaseHeaderSchema } from "./purchaseHeader-schema";
import { Role, RolSchema } from "./rol-schema";
import { SaleHeader, SaleHeaderSchema } from "./saleHeader-schema";
import { Supplier, SupplierSchema } from "./supplier-schema";
import { Unity, UnitySchema } from "./unity-schema";
import { User, UserSchema } from "./user-schema";

function setupModels(sequelize:any){
    Category.init(CategorySchema,Category.config(sequelize));
    Products.init(ProductSchema,Products.config(sequelize));
    Unity.init(UnitySchema,Unity.config(sequelize));
    Supplier.init(SupplierSchema,Supplier.config(sequelize));
    PurchaseHeader.init(PurchaseHeaderSchema,PurchaseHeader.config(sequelize));
    DetailPurchase.init(DetailPurchaseSchema,DetailPurchase.config(sequelize));
    Clients.init(ClientSchema,Clients.config(sequelize));
    SaleHeader.init(SaleHeaderSchema,SaleHeader.config(sequelize));
    DetailSale.init(DetailSaleSchema,DetailSale.config(sequelize));
    ProformaHeader.init(HeaderProformaSchema,ProformaHeader.config(sequelize));
    DetailProforma.init(DetailProformaSchema,DetailProforma.config(sequelize));
    DocumentES.init(DocumentEsSchema,DocumentES.config(sequelize));
    Inventory.init(InventorySchema,Inventory.config(sequelize));
    Role.init(RolSchema,Role.config(sequelize));
    User.init(UserSchema,User.config(sequelize));

    Category.associate();
    Products.associate();
    Unity.associate();
    Supplier.associate();
    PurchaseHeader.associate();
    DetailPurchase.associate();
    Clients.associate();
    SaleHeader.associate();
    DetailSale.associate();
    ProformaHeader.associate();
    DetailProforma.associate();
    DocumentES.associate();
    Inventory.associate();
    Role.associate();
    User.associate();
}

export default setupModels;