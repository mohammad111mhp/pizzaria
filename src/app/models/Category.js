import { model, Schema, models } from "mongoose";

const CategorySchema = new Schema({
    name: { type: "string", required: true },
}, { timestamps: true });

export const Category = models?.Category || model('Category', CategorySchema);