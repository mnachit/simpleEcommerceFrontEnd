import { Order } from "./order";

export class product {
    id!: number;
    name!: string;
    description!: string;
    quantity!: number;
    price!: number;
    orders!: Order[];
    userId!: number;
}