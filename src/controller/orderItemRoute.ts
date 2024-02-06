import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import orderItemService from "../services/orderItemService";
import { Response } from "express";

@JsonController('/orderItems')

export class orderItemRoute{

    @Post('/createOrderItem')
    async createOrderItem(@Body() orderItemData: { product_id: number; quantity: number },@Res() res: Response){
        try {
            const { product_id, quantity } = orderItemData;
            const orderItem = await orderItemService.createOrderItem(product_id, quantity);
            return orderItem
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    @Get('/getOrderItems')
    async getAllOrderItems(@Res() res: Response){
        try{
            const orderItems = await orderItemService.getAllOrderItems();
            return res.json(orderItems);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    @Get('/getOneOrderItem')
    async getOneOrderItem(
        @QueryParam("orderItem_id") orderItem_id: number,
        @QueryParam("quantity") quantity: Date,
        @QueryParam("unitPrice") unitPrice: number,
        @Res() res: Response
    ){
        try {
            const options = { orderItem_id, quantity, unitPrice };
            const orderItem = await orderItemService.getOneOrderItem(options);
            return res.json(orderItem);
          } catch (error) {
            return res.status(500).json({ error: error.message });
          }
    }

    @Put('/updateOrderItem/:orderItem_id')
    async updateOrderItem(@Param("orderItem_id") orderItem_id: number, @Body() updateData: any, @Res() res: Response){
        try {
            await orderItemService.updateOrderItem(orderItem_id, updateData);
            return res.status(200).json({message:"Updated successfully"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    @Delete('/deleteOrderItem/:orderItem_id')
    async deleteOrderItem(@Param("orderItem_id") orderItem_id: number, @Res() res: Response){
        try {
            await orderItemService.deleteOrderItem(orderItem_id);
            return res.status(200).json({message:"Deleted successfully"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    @Post('/addOrderItemsToOrders')
    async addOrderItemstoOrders(@Body() body: any, @Res() res: Response){
        try{
            const {order_id, customer_id, orderItem_ids} = body
            await orderItemService.addOrderItemToOrder(order_id, customer_id, orderItem_ids)
            return res.status(200).json({message:"Added successfully"})
        }
        catch (error) {
            if(error instanceof Error){
                return res.status(500).json({ error: error.message });
            }
        }
    }
}