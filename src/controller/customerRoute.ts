import {Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res} from "routing-controllers";
import customerService from "../services/customerService";
import { Response } from "express";

@JsonController("/customer")
export class customerRoute {
  @Post("/create")
  async createCustomer(@Body() body: any, @Res() res: Response) {
    try {
      const { firstName, lastName, city, country, phone ,orders} = body;
      const savedCustomer = await customerService.createCustomer(firstName, lastName, city, country, phone,orders);
      return savedCustomer;
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }

  @Get("/getAll")
  async gettAllCustomers(@Res() res: Response) {
    try {
      const customers = await customerService.getAllCustomers();
      return res.json(customers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Get("/getOne")
  async getOneCustomer(
    @QueryParam("customer_id") customer_id: number,
    @QueryParam("firstName") firstName: string,
    @QueryParam("lastName") lastName: string,
    @QueryParam("city") city: string,
    @QueryParam("country") country: string,
    @QueryParam("phone") phone: number,
    @Res() res: Response
  ) {
    try {
      const options = {
        customer_id,
        firstName,
        lastName,
        city,
        country,
        phone,
      };
      const customer = await customerService.getOneCustomer(options);
      return res.json(customer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Put("/update/:customer_id")
  async updateCustomer(@Param("customer_id") customer_id: number, @Body() updateData: any, @Res() res: Response) {
    try {
      await customerService.updateCustomer(customer_id, updateData);
      return res.status(200).json({message:"Updated successfully"})
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Delete("/delete/:customer_id")
  async deleteCustomer( @Param("customer_id") customer_id: number, @Res() res: Response) {
    try {
      await customerService.deleteCustomer(customer_id);
      return res.status(200).json({message:"Deleted successfully"})
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
export default customerRoute;
