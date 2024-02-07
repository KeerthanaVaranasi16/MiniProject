import { Body, Delete, Get, JsonController, Param, Post, Res } from "routing-controllers";
import { Response } from "express";
import supplierService from "../services/supplierService";
import customerService from "../services/customerService";
import additionalFeaturesService from "../services/additionalFeaturesService";

@JsonController('/additional')

class additionalFeaturesRoute{

    @Post('/creatingOrders/:customer_id')
    async creatingOrders(@Param('customer_id') customer_id: number, @Body() body:any, @Res() res:Response){
        try{
            console.log("products\n")
            // console.log(products)
            let products = body.products
            console.log(products)
            const orders = await additionalFeaturesService.creatingOrders(customer_id,products)
            return res.json(orders)
            // return res.status(200).json({message:"Created successfully"})
        }
        catch(error){
            if(error instanceof Error){
                return res.status(500).json({ error: error.message });
            }
        }
    }

    @Get('/orders/:customer_id')
    async getOrders(@Param('customer_id') customer_id: number, @Res() res: Response){
        try {
            console.log(customer_id)
            const numberOfOrders = await additionalFeaturesService.getNumberOfOrders(customer_id);
            console.log(`Number of orders for customer ${customer_id}: ${numberOfOrders}`);
            return res.json(numberOfOrders);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            } else {
                return res.status(500).json({ error: "An unexpected error occurred." });
            }
        }
    }

    @Delete('/deleteSupplierAccount/:supplier_id')
    async deleteSupplier(@Param("supplier_id") supplier_id: number, @Res() res: Response){
        try{
            const deletedSupplierAccount = await supplierService.deleteSupplier(supplier_id)
            console.log(deletedSupplierAccount)
            return res.status(200).json({message:"Deleted successfully"})
        }
        catch(error){
            if(error instanceof Error){
                return res.status(500).json({error: error.message})
            }
        }
    }

    @Delete('/deleteCustomerAccount/:customer_id')
    async deleteCustomer(@Param("customer_id") customer_id: number, @Res() res:Response){
        try{
            const deletedCustomerAccount = await customerService.deleteCustomer(customer_id)
            console.log(deletedCustomerAccount)
            return res.status(200).json({message:"Deleted successfully"})
        }
        catch(error){
            if(error instanceof Error){
                return res.status(500).json({error: error.message})
            }
        }
    }

    
}
export default additionalFeaturesRoute