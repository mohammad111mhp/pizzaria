import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
});

const MenuItemSchema = new Schema({
    image: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    category: {type: mongoose.Types.ObjectId},
    basePrice: { type: "Number" },
    sizes: {type: [ExtraPriceSchema]},
    extraIngredientsPrices: {type: [ExtraPriceSchema]},
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);