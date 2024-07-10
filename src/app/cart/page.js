"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useProfile } from "@/components/UseProfile";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Toman from "@/components/icons/Toman";

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({phone: '', streetAddress: '', postalCode: '', city: ''});
    const [isPaymentOnSpot, setIsPaymentOnSpot] = useState(false);
    const [isPaymentFailed, setIsPaymentFailed] = useState(false);
    const { data: profileData } = useProfile();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                setIsPaymentFailed(true);
            }
        }
    }, []);

    if (isPaymentFailed) {
        toast.error('پرداخت ناموفق بود.');
        setIsPaymentFailed(false);
    }

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, city, postalCode, country } = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            };
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    async function proceedToCheckout(e) {
        e.preventDefault();
        // address and shopping cart products
        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts,
                    isPaymentOnSpot,
                }),
            }).then(async (response) => {
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                } else {
                    reject();
                }
            });
        });

        if (isPaymentOnSpot) {
            await toast.promise(promise, {
                loading: 'در حال پردازش سفارش...',
                success: 'سفارش شما با موفقیت ثبت شد.',
                error: 'مشکلی رخ داده است!',
            })
        } else {
            await toast.promise(promise, {
                loading: 'در حال پردازش سفارش...',
                success: 'انتقال به صفحه پرداخت...',
                error: 'مشکلی رخ داده است!',
            })
        }
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart" />
                <p className="mt-4">سبد خرید شما خالی است.</p>
            </section>
        );
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2 max-lg:grid-cols-1 max-md:text-sm">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>هیچ محصولی در سبد خرید شما یافت نشدد.</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                            key={product._id}
                            index={index}
                            product={product}
                            onRemove={removeCartProduct}
                        />
                    ))}
                    <div className="flex flex-col gap-3 text-right py-2 text-gray-500">
                        <div className="flex justify-between">
                            مجموع سبد خرید:
                            <span className="text-black font-bold flex">{subtotal} <Toman className="w-5 h-5 inline" /></span>
                        </div>
                        <div className="flex justify-between">
                            هزینه ارسال:
                            <span className="text-black font-bold flex">20000 <Toman className="w-5 h-5 inline" /></span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 py-2 mt-2">
                            مجموع:
                            <span className="text-black font-bold flex">
                                {subtotal + 20000} <Toman className="w-5 h-5 inline" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="font-bold text-2xl text-gray-800 text-center">پرداخت</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                onChange={() => setIsPaymentOnSpot(prev => !prev)}
                            />
                            <label>پرداخت در محل</label>
                        </div>
                        {isPaymentOnSpot && (
                            <button type="submit">پرداخت در محل ({subtotal + 20000}<Toman className="w-5 h-5 inline fill-white" />)</button>
                        )}
                        {!isPaymentOnSpot && (
                            <button type="submit">پرداخت ({subtotal + 20000}<Toman className="w-5 h-5 inline fill-white" />)</button>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}