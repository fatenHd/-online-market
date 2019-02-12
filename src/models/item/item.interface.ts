export interface item {
    id: string;
    name: string;
    type: string;
    price: number;
    quantity: number;
    discount?: number;
    offerValidity?: Date;
    image: string;
}