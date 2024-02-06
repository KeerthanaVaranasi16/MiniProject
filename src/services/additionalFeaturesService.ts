import dataSource from "../DataSource/dataSource";
import { Customer } from "../entities/Customer.entity";
import { OrderItem } from "../entities/OrderItem.entity";
import { Product } from "../entities/Product.entity";
import { Order } from "../entities/Order.entity";
import orderItemService from "./orderItemService";
import orderService from "./orderService";


class additionalFeaturesService{
    private customerRepo = dataSource.getRepository(Customer)
    private productRepo = dataSource.getRepository(Product)
  
    async getNumberOfOrders(customer_id : number){
        console.log(customer_id)
        const customer = await this.customerRepo.findOne({
          where: { customer_id },
          relations: ["orders"],
        });
     
        if (!customer) {
          throw new Error(`Customer with ID ${customer_id} not found`);
        }
        const numberOfOrders = customer.orders.length;
        console.log(`Number of orders for customer ${customer_id}: ${numberOfOrders}`);
        return numberOfOrders;
    }

    async creatingOrders(customer_id: number, products: { productName: string; quantity: number }[]) {
      const customer = await this.customerRepo.findOne({where:{customer_id}});
      if (!customer) {
        throw new Error(`Customer with ID ${customer_id} not found`);
      }
      // console.log(customer)
      const orderItemsData = [];
      // console.log(products)
      for(let index=0;index<products.length;index++){
        console.log("Hello")
      }
      console.log("hi")
      for (let index=0;index<products.length;index++) {
        console.log(index)
        let productName = products[index].productName
        let quantity = products[index].quantity
        console.log(productName)
        const product = await this.productRepo.findOne({ where: { productName }});
        console.log(product);
        if (!product) {
            throw new Error(`Product with name ${productName} not found`);
        }
        const product_id = product.product_id;
        console.log(`ProductId is ${product_id}`);
        const createdOrderItem = await orderItemService.createOrderItem(product_id, quantity);
        console.log(createdOrderItem);
        orderItemsData.push(createdOrderItem);
      }
      const createdOrder = await orderService.createOrder(customer_id, orderItemsData);
      console.log(createdOrder);
      return createdOrder;
      // console.log(orderItemsData)
  } 
}
export default new additionalFeaturesService