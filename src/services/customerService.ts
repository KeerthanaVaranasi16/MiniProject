import dataSource from "../DataSource/dataSource";
import { Customer } from "../entities/Customer.entity";
import { Order } from "../entities/Order.entity";
import orderService from "./orderService";

class customerService {
  private customerRepo = dataSource.getRepository(Customer);
  

  async getAllCustomers() {
    console.log("Getting all the users");
    const customers=await this.customerRepo
      .createQueryBuilder("customer").leftJoinAndSelect("customer.orders", "orders","orders.checkOut = :checkOut", { checkOut: true }).leftJoinAndSelect('orders.orderItems','orderItems')
      .orderBy("customer.customer_id", "ASC")
      .getMany();
    console.log(customers)
    return customers
  }

  async getOneCustomer(options: any) {
    console.log("Getting particular customer details");
    const specific_customer=await this.customerRepo.findOne({where:options,relations:['orders','orders.orderItems']})
    if(!specific_customer){
      throw new Error("Customer not found")
    }
      // console.log(specific_customer)
    specific_customer.orders = specific_customer.orders.filter(order => order.checkOut === true);
    console.log(specific_customer)
    return specific_customer
  }

  async createCustomer(
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    phone: string,order:{orderDate:string,totalAmount:number,Complted:boolean}[]
  ) {
    if (!firstName || !lastName || !city || !country || !phone) {
      throw new Error("Incomplete data");
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error(
        "Invalid phone number format. Phone number must contain 10 digits."
      );
    }
    const existingCustomer = await this.customerRepo.findOne({where:{phone}});
    if (existingCustomer) {
      throw new Error("Phone number already exists");
    }
    console.log("Creating new customer");
    const newCustomer = new Customer();
    newCustomer.firstName = firstName;
    newCustomer.lastName = lastName;
    newCustomer.city = city;
    newCustomer.country = country;
    newCustomer.phone = phone;
    if(order){
      newCustomer.orders = order.map((orderData: any) => {
          const order = new Order();
          order.orderDate = orderData.orderDate;
          order.totalAmount = orderData.totalAmount;
          return order;
      });
    }
    const savedCustomer =await this.customerRepo.save(newCustomer);
    console.log(savedCustomer)
    return savedCustomer
  }

  async updateCustomer(customer_id:number,updateData:any){
    const { orders,...customerDetails}=updateData
    if (!customer_id) {
      throw new Error("Customer ID is required");
    }
    const existingCustomer = await this.customerRepo.findOne({where:{customer_id}});
    if (!existingCustomer) {
      throw new Error(`Customer with ID ${customer_id} is not found`);
    }
    console.log("Updating the customer")
    const updatedCustomer=await this.customerRepo.update(customer_id,customerDetails);
    console.log(updatedCustomer)
    if(orders && orders.length>0){
      for(const order of orders){
        const { order_id, ...orderDetails } = order;
        return await orderService.updateOrder(order_id, orderDetails);
      }
    }
  }

  async deleteCustomer(customer_id:number){
    if (!customer_id) {
      throw new Error(`CustomerID is required`);
    }
    const existingCustomer = await this.customerRepo.findOne({where:{customer_id}});
    if (!existingCustomer) {
      throw new Error(`Customer with ID ${customer_id} is not found`);
    }
    console.log("Deleting the customer")
    const deletedCustomer=await this.customerRepo.delete(customer_id)
    console.log(deletedCustomer)
  }
}

export default new customerService();
