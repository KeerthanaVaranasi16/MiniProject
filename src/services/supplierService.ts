import dataSource from "../DataSource/dataSource";
import { Supplier } from "../entities/Supplier.entity";
import { Product } from "../entities/Product.entity";
import productService from "./productService";

class supplierService{
    private supplierRepo = dataSource.getRepository(Supplier);
    async getAllSuppliers() {
        console.log("Getting all the users");
        const allSuppliers=await this.supplierRepo
          .createQueryBuilder("supplier").leftJoinAndSelect("supplier.products", "products")
          .orderBy("supplier.supplier_id", "ASC")
          .getMany();
        console.log(allSuppliers)
        return allSuppliers
    }
    async createSupplier(companyName: string, contactName: string, city: string, country: string, phone: string,
        product:{productName:string, unitPrice: number, packages: string, isDiscontinued: boolean }[]){
        if(!companyName || !contactName || !city || !country || !phone){
            throw new Error("Incomplete Data")
        }
        const phoneRegex=/^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error(
              "Invalid phone number format. Phone number must contain 10 digits."
            );
        }
        const existingSupplier = await this.supplierRepo.findOne({where:{phone}});
        if (existingSupplier) {
            throw new Error("Phone number already exists");
        }
        console.log("Creating new Supplier")
        const newSupplier = new Supplier();
        newSupplier.companyName = companyName;
        newSupplier.contactName = contactName;
        newSupplier.city = city;
        newSupplier.country = country;
        newSupplier.phone = phone;
        if(product){
            newSupplier.products = product.map((productData : any)=>{
                const newProduct = new Product()
                newProduct.productName = productData.productName
                newProduct.unitPrice = productData.unitPrice
                newProduct.packages = productData.packages
                newProduct.isDiscontinued = productData.isDiscontinued
                return newProduct
            })
        }
        const createdSupplier=await this.supplierRepo.save(newSupplier);
        console.log(createdSupplier)
        return createdSupplier
    }

    async getOneSupplier(options: any) {
        console.log("Getting particular customer details");
        const specific_supplier=await this.supplierRepo.findOne({where:options, relations:['products']})
        if(!specific_supplier){
            throw new Error("Supplier not found")
        }
        console.log(specific_supplier)
        return specific_supplier
      }

    async updateSupplier(supplier_id:number,updateData:any){
        if(!supplier_id){
            throw new Error("Supplier ID is required")
        }
        const existingSupplier = await this.supplierRepo.findOne({where:{supplier_id}})
        if(!existingSupplier){
            throw new Error("Supplier not found")
        }
        const {products, ...supplierDetails} = updateData
        console.log("Updating the supplier")
        const updatedSupplier=await this.supplierRepo.update(supplier_id,supplierDetails)
        console.log(updatedSupplier)
        if(products){
            for(const product of products){
                const {product_id, ...productDetails} = product
                return await productService.updateProduct(product_id,productDetails)
            }
        }
        return updatedSupplier
    }

    async deleteSupplier(supplier_id:number){
        if(!supplier_id){
            throw new Error("Supplier ID is required")
        }
        const existingSupplier = await this.supplierRepo.findOne({where:{supplier_id}})
        if(!existingSupplier){
            throw new Error("Supplier not found")
        }
        const deletedSupplier= await this.supplierRepo.delete(supplier_id)
        console.log(deletedSupplier)
        return deletedSupplier
    }

}
export default new supplierService;