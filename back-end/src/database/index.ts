import mongoose from 'mongoose';
import { IAction } from './interfaces'
import { ActionSchema } from './schemas'

export const ActionModel = mongoose.model<IAction>('action', ActionSchema);

export const initConnetion = async () => {
    try {
    return await mongoose.connect('mongodb://lemesh:Ol917364@ds125341.mlab.com:25341/site-analizer', {useNewUrlParser: true});
    } catch(err) {
        console.error('FATAL: connection to database failed', err);
        process.abort();
    }
}
