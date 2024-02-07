import {Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res,} from "routing-controllers";
import productService from "../services/productService";
import { Response } from "express";

@JsonController("/products")
export class productRoute {
  @Post("/createProduct")
  async createProduct(@Body() body: any, @Res() res: Response) {
    try {
        const { supplier_id, productName, unitPrice, packages, isDiscontinued} = body;
        const savedProduct = await productService.createProduct(supplier_id, productName, unitPrice, packages, isDiscontinued);
        return savedProduct;
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
  }

  @Get("/getAllProducts")
  async getAllProducts(@Res() res: Response) {
    try {
        const products = await productService.getAllProducts();
        return res.json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
  }

  @Get("/getOneProduct")
  async getOneProduct(
    @QueryParam("product_id") product_id: number,
    @QueryParam("productName") productName: string,
    @QueryParam("unitPrice") unitPrice: string,
    @QueryParam("packages") packages: string,
    @QueryParam("isDiscontinued") isDiscontinued: string,
    @Res() res: Response
  ) {
    try{
        const options = {product_id, productName, unitPrice, packages, isDiscontinued};
        const specificProduct = await productService.getOneProduct(options)
        return res.json(specificProduct)
    }
    catch(error){
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
  }

  @Put('/updateProduct/:product_id')
  async updateProduct(@Param("product_id") product_id: number,@Body() updateData: any, @Res() res: Response){
    try{
        const updatedProduct = await productService.updateProduct(product_id,updateData)
        return res.status(200).json({message:"Updated successfully"})
    }
    catch(error){
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
  }

  @Delete('/delete/:product_id')
  async deleteProduct(@Param("product_id") product_id : number, @Res() res: Response){
    try{
        const deletedProduct = await productService.deleteProduct(product_id)
        return res.status(200).json({message:"Deleted successfully"})
    }
    catch(error){
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
  }
}
