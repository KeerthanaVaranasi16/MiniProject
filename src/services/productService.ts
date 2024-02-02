import dataSource from "../DataSource/dataSource";
import { OrderItem } from "../entities/OrderItem.entity";
import { Product } from "../entities/Product.entity";
import { Supplier } from "../entities/Supplier.entity";
import orderItemService from "./orderItemService";
class productService{
    private productRepo = dataSource.getRepository(Product)
    private supplierRepo = dataSource.getRepository(Supplier)

    async createProduct(supplier_id: number, productName: string, unitPrice: number,packages : string, isDiscontinued:boolean){
        const supplier=await this.supplierRepo.findOne({where:{supplier_id}})
        if(!supplier){
            throw new Error(`Supplier with ID ${supplier_id} is not found`)
        }
        if(!productName || !unitPrice || !packages){
            throw new Error("Incomplete data")
        }
        console.log("Creating new product")
        const newProduct = new Product();
        newProduct.productName = productName
        newProduct.unitPrice = unitPrice
        newProduct.packages = packages
        newProduct.isDiscontinued = isDiscontinued
        newProduct.supplier = supplier
        const createdProduct= await this.productRepo.save(newProduct);
        console.log(createdProduct)
        return createdProduct
    }

    async getAllProducts(){
        console.log("Getting all products")
        const products=await this.productRepo
            .createQueryBuilder("product")
            // .leftJoinAndSelect("product.orderItems", "orderItems")
            .orderBy("product.product_id",'ASC').getMany()
        console.log(products)
        return products
    }

    async getOneProduct(options:any){
        console.log("Getting product details")
        const specificProduct = await this.productRepo.findOne({where:options})
        if(!specificProduct){
            throw new Error("Product not found")
        }
        console.log(specificProduct)
        return specificProduct
    }

    async updateProduct(product_id:number , updateData:any){
        if(!product_id){
            throw new Error("Product ID is required")
        }
        const existingProduct = await this.productRepo.findOne({where:{product_id}})
        if(!existingProduct){
            throw new Error(`Product with ID ${product_id} is not found`)
        }
        console.log(`Updating the details of product ${product_id}`)
        const { orderItems,...productDetails}=updateData
        const updatedProduct = await this.productRepo.update(product_id,productDetails)
        console.log(updatedProduct)
        if(orderItems && orderItems.length>0){
            for(const orderItem of orderItems){
              const { orderItem_id, ...orderItemDetails } = orderItem;
              console.log(`${JSON.stringify(orderItemDetails['0'])} in customers`)
              return await orderItemService.updateOrderItem(orderItem_id, orderItemDetails);
            }
          }
        return updatedProduct
    }

    async deleteProduct(product_id:number){
        if(!product_id){
            throw new Error("Product ID is required")
        }
        const existingProduct = await this.productRepo.findOne({where:{product_id}})
        if(!existingProduct){
            throw new Error(`Product with ID ${product_id} is not found`)
        }
        console.log("Deleting the product")
        const deletedProduct = await this.productRepo.delete(product_id)
        console.log(deletedProduct)
    }
}
export default new productService;