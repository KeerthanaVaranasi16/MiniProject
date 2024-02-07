import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "./Supplier.entity";
import { OrderItem } from "./OrderItem.entity";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    product_id:number
    @Column()
    productName:string
    @Column()
    unitPrice:number
    @Column()
    packages:string
    @Column()
    isDiscontinued:boolean
    @ManyToOne(type => Supplier, supplier => supplier.products,{onDelete:'CASCADE'})
    supplier: Supplier;
    @OneToMany(type => OrderItem, orderItem => orderItem.product ,{cascade:true})
    orderItems: OrderItem[];
    @Column({default:true})
    isAvailable:boolean
}