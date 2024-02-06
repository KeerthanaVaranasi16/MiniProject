import dataSource from "../DataSource/dataSource";
import { Customer } from "../entities/Customer.entity";
import { Order } from "../entities/Order.entity";
import { OrderItem } from "../entities/OrderItem.entity";
import orderItemService from "./orderItemService";


class orderService{
    private orderRepo = dataSource.getRepository(Order)
    private customerRepo = dataSource.getRepository(Customer)

    async createOrder(customer_id:number, orderItem ?:OrderItem[]){
        const customer=await this.customerRepo.findOne({where:{customer_id}})
        if(!customer){
            throw new Error("Customer not found")
        }
        console.log("Creating new order")
        const order = new Order()
        order.orderDate = new Date()
        order.totalAmount = 0
        order.customer = customer
        if(orderItem){
            order.orderItems = orderItem.map((orderItemData : any)=>{
                const newOrderItem = new OrderItem()
                newOrderItem.quantity = orderItemData.quantity
                newOrderItem.unitPrice = orderItemData.unitPrice
                order.totalAmount += newOrderItem.quantity * newOrderItem.unitPrice
                return newOrderItem
            })
        }
        const createdOrder= await this.orderRepo.save(order)
        console.log(createdOrder)
        return createdOrder
    }

    async getAllOrders(){
        console.log("Getting all orders")
        const orders=await this.orderRepo
            .createQueryBuilder("order").leftJoinAndSelect("order.customer", "customer").leftJoinAndSelect("order.orderItems","orderItems")
            .orderBy("order.order_id", "ASC")
            .getMany();
        console.log(orders)
        return orders
    }

    async getOneOrder(options: any) {
        console.log("Getting particular order details");
        const specific_order=await this.orderRepo.findOne({where:options,relations:['customer','orderItems']})
        if(!specific_order){
          throw new Error("Order not found")
        }else{
          console.log(specific_order)
        }
        return specific_order
    }

    async updateOrder(order_id:number,updateOrder:any){
        const order=await this.orderRepo.findOne({where:{order_id}})
        if(!order){
            throw new Error("Order not found")
        }
        const { orderItems,...orderDetails} = updateOrder
        console.log(`Updating the order with ${JSON.stringify(updateOrder)} `)
        const updatedOrderItem=await this.orderRepo.update(order_id,orderDetails);
        console.log(updatedOrderItem)
        if(orderItems && orderItems.length>0){
            for(const orderItem of orderItems){
                const {orderItem_id, ...orderItemDetails} = orderItem
                return await orderItemService.updateOrderItem(orderItem_id,orderItemDetails)
            }
        }
        return updatedOrderItem
    }

    async deleteOrder(order_id:number){
        if (!order_id) {
            throw new Error("Order ID is required");
          }
          const existingOrder = await this.orderRepo.findOne({where:{order_id}});
          if (!existingOrder) {
            throw new Error("Order not found");
          }
          console.log("Deleting the customer")
          console.log(existingOrder)
          await this.orderRepo.delete(order_id)
          console.log("Deleted")
        }
}
export default new orderService