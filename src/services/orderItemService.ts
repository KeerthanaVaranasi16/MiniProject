import { Or } from "typeorm";
import dataSource from "../DataSource/dataSource";
import { OrderItem } from "../entities/OrderItem.entity";
import productService from "./productService";
import { Product } from "../entities/Product.entity";
import { Order } from "../entities/Order.entity";
import orderService from "./orderService";

class orderItemService{
    private orderItemRepo = dataSource.getRepository(OrderItem)
    private productRepo = dataSource.getRepository(Product)
    private orderRepo = dataSource.getRepository(Order)

    async createOrderItem( product_id: number, quantity: number){
        const existingProduct = await this.productRepo.findOne({where:{product_id}})
        if(!existingProduct){
            throw new Error(`Product with ID ${product_id} not found`)
        }
        console.log("Creating new OrderItem")
        const unitPrice = existingProduct.unitPrice
        const newOrderItem = new OrderItem()
        newOrderItem.quantity = quantity
        newOrderItem.unitPrice = unitPrice
        newOrderItem.product = existingProduct
        const savedOrderItem = await this.orderItemRepo.save(newOrderItem)
        console.log(savedOrderItem)
        return newOrderItem
    }

    async addOrderItemToOrder(order_id: number, customer_id: number, orderItem_ids: number[]){
        let existingOrder: Order | undefined = await this.orderRepo.findOne({where:{order_id}})
        if (!existingOrder) {
            existingOrder = await orderService.createOrder(customer_id)
        }
        // const existingOrderItem = await this.orderItemRepo.findOne({where:{orderItem_id}})
        // console.log(`Existing orderItem ${existingOrderItem}`)
        // if(!existingOrderItem){
        //     throw new Error(`OrderItem with ID ${orderItem_id} not found`)
        // }
        // if (!existingOrder.orderItems) {
        //     existingOrder.orderItems = [];
        // }
        // console.log(`Adding the orderItem to order`)
        // existingOrder.orderItems.push(existingOrderItem);
        // existingOrder.totalAmount += existingOrderItem.unitPrice * existingOrderItem.quantity;

        for (const orderItem_id of orderItem_ids) {
            const existingOrderItem = await this.orderItemRepo.findOne({ where: { orderItem_id } });
            console.log(`Existing orderItem ${existingOrderItem}`);
            if (!existingOrderItem) {
                throw new Error(`OrderItem with ID ${orderItem_id} not found`);
            }
            if (!existingOrder.orderItems) {
                existingOrder.orderItems = [];
            }
            console.log(`Adding the orderItem to order`);
            existingOrder.orderItems.push(existingOrderItem);
            existingOrder.totalAmount += existingOrderItem.unitPrice * existingOrderItem.quantity;
        }
        const addedOrderItem = await this.orderRepo.save(existingOrder)
        console.log(addedOrderItem)
    }
    

    async getAllOrderItems(){
        console.log("Getting all OrderItems")
        const orderItems=await this.orderItemRepo
            .createQueryBuilder("orderItem").leftJoinAndSelect("orderItem.product", "product")
            .orderBy("orderItem.orderItem_id", "ASC")
            .getMany();
        console.log(orderItems)
        return orderItems
    }

    async getOneOrderItem(options: any){
        console.log("Getting particular OrderItem details");
        const specific_order=await this.orderItemRepo.findOne({where:options ,relations:['product']})
        if(!specific_order){
          throw new Error("Order not found")
        }
        console.log(specific_order)
        return specific_order
    }

    async updateOrderItem(orderItem_id:number, updateOrderItem :any){
        const orderItem=await this.orderItemRepo.findOne({where:{orderItem_id}})
        if(!orderItem){
            throw new Error(`OrderItem with ID ${orderItem_id} is not found`)
        }
        console.log(`Updating the order with ${JSON.stringify(updateOrderItem)} `)
        const result=await this.orderItemRepo.update(orderItem_id,updateOrderItem);
        console.log(result)
    }

    async deleteOrderItem(orderItem_id:number){
        if (!orderItem_id) {
            throw new Error("OrderItem ID is required");
        }
        const existingOrderItem = await this.orderItemRepo.findOne({where:{orderItem_id}});
        if (!existingOrderItem) {
            throw new Error(`OrderItem with ID ${orderItem_id} is not found`);
        }
        console.log("Deleting the customer")
        console.log(existingOrderItem)
        await this.orderItemRepo.delete(orderItem_id)
        console.log("Deleted")
    }
}
export default new orderItemService;