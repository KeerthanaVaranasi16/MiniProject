import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";

@Entity()
export class Supplier{
    @PrimaryGeneratedColumn()
    supplier_id:number
    @Column()
    companyName:string
    @Column()
    contactName:string
    @Column()
    city:string
    @Column()
    country:string
    @Column()
    phone:string
    @OneToMany(() => Product, (product) => product.supplier, {cascade:true})
    products: Product[];
}