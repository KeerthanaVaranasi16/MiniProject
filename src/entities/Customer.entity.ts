import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  city: string;
  @Column()
  country: string;
  @Column({nullable:true})
  phone: string;
  @OneToMany(() => Order, (order) => order.customer,{cascade:true})
  orders: Order[];
  
}
