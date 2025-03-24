import { Document, Types } from 'mongoose';

export interface IProductDocument extends Document {
    uuid: string;
    name: string;
    price: number;
    quantity: number;
    _id: Types.ObjectId;
};