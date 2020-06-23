import { Schema, SchemaTypes } from 'mongoose';

export const ActionSchema: Schema = new Schema({
    type: {
        type: SchemaTypes.String,
        required: true
    },
    platform: {
        type: SchemaTypes.String,
        required: true
    },
    browser: {
        type: SchemaTypes.String,
        required: true
    },
    date: {
        type: SchemaTypes.Date,
        required: true
    }
});
