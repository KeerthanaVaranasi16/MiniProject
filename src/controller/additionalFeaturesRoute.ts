import { Delete, JsonController, Param, Res } from "routing-controllers";
import { Response } from "express";
import supplierService from "../services/supplierService";
import customerService from "../services/customerService";

@JsonController('/additional')

class additionalFeaturesRoute{

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