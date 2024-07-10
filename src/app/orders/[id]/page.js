"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Toman from "@/components/icons/Toman";
import AddressInputs from "@/components/layout/AddressInputs";
import Loading from "@/components/layout/Loading";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";


export default function OrderPage() {
    const { clearCart } = useContext(CartContext);
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        if (typeof window.console !== "undefined") {
            if (window.location.href.includes('success=1')) {
                clearCart();
            }
        }
        if (id) {
            setLoadingOrder(true);
            fetch('/api/orders?_id=' + id).then(response => {
                response.json().then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false);
                });
            })
        }
    }, []);

    let subtotal = 0;
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            subtotal += cartProductPrice(product);
        }
    }

    return (
        <section className="mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Your order" />
                <div className="mt-4 mb-8 border-2 border-green-800 bg-green-200 rounded-xl p-8">
                    <p className="font-bold">از سفارش شما متشکریم.</p>
                    <p>زمانی که سفارش شما آماده ارسال باشد با شما تماس خواهیم گرفت.</p>
                </div>
            </div>
            {loadingOrder && (
                <Loading />
            )}
            {order && (
                <div className="grid lg:grid-cols-2 lg:gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product} />
                        ))}
                        <div className="flex flex-col gap-3 text-right py-2 text-gray-500">
                            <div className="flex justify-between">
                                مجموع سبد خرید:
                                <span className="text-black font-bold flex">{subtotal} <Toman className="w-5 h-5 inline" /></span>
                            </div>
                            <div className="flex justify-between">
                                هزینه ارسال:
                                <span className="text-black font-bold flex">5 <Toman className="w-5 h-5 inline" /></span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 py-2 mt-2">
                                مجموع:
                                <span className="text-black font-bold flex">
                                    {subtotal + 5} <Toman className="w-5 h-5 inline" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <AddressInputs
                                disabled={true}
                                addressProps={order}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}