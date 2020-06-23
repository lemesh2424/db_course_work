import { Document } from 'mongoose';

export interface IAction extends Document {
    type: string;
    date: Date;
    browser: string;
    platform: string;
}
