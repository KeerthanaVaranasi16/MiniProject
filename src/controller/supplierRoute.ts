import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res } from "routing-controllers";
import supplierService from "../services/supplierService";
import { Response } from "express";

@JsonController("/supplier")
export class supplierRoute{
    @Post("/create")
    async createSupplier(@Body() body:any, @Res() res:Response){
        try{
            const {companyName, contactName, city, country, phone, products}=body
            const savedSupplier = await supplierService.createSupplier(companyName, contactName, city, country, phone, products);
            return savedSupplier;
        }
        catch(error){
            if(error instanceof Error){
                return res.status(500).json({ error: error.message });
            }
        }
    }

    @Get("/getAll")
    async getAllSuppliers(@Res() res: Response){
        try {
            const customers = await supplierService.getAllSuppliers();
            return res.json(customers);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    @Get("/getOne")
  async getOneSupplier(
    @QueryParam("supplier_id") supplier_id: number,
    @QueryParam("companyName") companyName: string,
    @QueryParam("contactName") contactName: string,
    @QueryParam("city") city: string,
    @QueryParam("country") country: string,
    @QueryParam("phone") phone: number,
    @Res() res: Response
  ) {
    try {
      const options = {
        supplier_id,
        companyName,
        contactName,
        city,
        country,
        phone,
      };
      const customer = await supplierService.getOneSupplier(options);
      return res.json(customer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

    @Put("/update/:supplier_id")
    async updateSupplier(@Param("supplier_id") supplier_id: number, @Body() updateData: any, @Res() res: Response){
        try {
            await supplierService.updateSupplier(supplier_id, updateData);
            return res.status(200).json({message:"Updated successfully"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    @Delete("/delete/:supplier_id")
    async deleteSupplier(@Param("supplier_id") supplier_id:number, @Res() res: Response){
        try {
            await supplierService.deleteSupplier(supplier_id);
            return res.status(200).json({message:"Deleted successfully"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}