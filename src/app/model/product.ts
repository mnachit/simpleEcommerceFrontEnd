import { Order } from "./order";

export class product {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    orders!: Order[];
}