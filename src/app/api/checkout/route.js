import { authOptions } from "@/app/options";
import { MenuItem } from "@/app/models/MenuItem";
import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const { cartProducts, address, isPaymentOnSpot } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (isPaymentOnSpot) {
        const orderDoc = await Order.create({
            userEmail,
            ...address,
            cartProducts,
            paid: false,
        });


        for (const cartProduct of cartProducts) {

            const productInfo = await MenuItem.findById(cartProduct._id);

            let productPrice = productInfo.basePrice;
            if (cartProduct.size) {
                const size = productInfo.sizes
                    .find(size => size._id.toString() === cartProduct.size._id.toString());
                productPrice += size.price;
            }
            if (cartProduct.extras?.length > 0) {
                for (const cartProductExtraThing of cartProduct.extras) {
                    const productExtras = productInfo.extraIngredientsPrices;
                    const extraThingInfo = productExtras
                        .find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
                    productPrice += extraThingInfo.price;
                }
            }
        }

        return Response.json('https://pizzaria-pearl.vercel.app/orders/' + orderDoc._id + '?success=1');
    } else {

        return Response.json('https://pizzaria-pearl.vercel.app/payment');
    }
}