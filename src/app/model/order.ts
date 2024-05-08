import { User } from "./User";
import { product } from "./product";

export class Order {
    id!: number;
    date!: string;
    status!: string;
    total!: number;
    user!: User;
    product!: product;
}