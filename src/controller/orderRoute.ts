import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import orderService from "../services/orderService";
import { Response } from "express";

@JsonController("/orders")
export class orderRoute {
  @Post("/createOrder")
  async createOrder(
      @Body() orderData: any,
      @Res() res: Response
    ) {
      try {
        const { customer_id,  orderItems } = orderData;
        const order = await orderService.createOrder(customer_id, orderItems);
        return order
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  }
  
  @Get("/getAllOrders")
  async getAllOrders(@Res() res:Response){
    try{
      const orders = await orderService.getAllOrders();
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Get("/getOneOrder")
  async getOneCustomer(
    @QueryParam("order_id") order_id: number,
    @QueryParam("orderDate") orderDate: Date,
    @QueryParam("totalAmount") totalAmount: number,
    @Res() res: Response
  ) {
    try {
      const options = {
        order_id,
        orderDate,
        totalAmount
      };
      const order = await orderService.getOneOrder(options);
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Put("/updateOrder/:order_id")
  async updateOrder(@Param("order_id") order_id:number,@Body() updateData: any, @Res() res: Response){
    try {
      await orderService.updateOrder(order_id, updateData);
      return res.status(200).json({message:"Updated successfully"})
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Delete("/deleteOrder/:order_id")
  async deleteOrder(@Param("order_id") order_id:number,@Res() res:Response){
    try {
        await orderService.deleteOrder(order_id);
        return res.status(200).json({message:"Deleted successfully"})
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  }
}
