"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useProfile } from "@/components/UseProfile";
import { useContext, useEffect, useState } from "react";
import Left from "@/components/icons/Left";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import Toman from "@/components/icons/Toman";

export default function PaymentPage() {
    const { cartProducts } = useContext(CartContext);
    const { data: profileData } = useProfile();
    const [address, setAddress] = useState({});

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

    async function successButtonAction(e) {
        e.preventDefault();
        // address and shopping cart products

        const promise = new Promise((resolve, reject) => {
            fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts,
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

        await toast.promise(promise, {
            loading: 'بررسی پرداخت...',
            success: 'پرداخت با موفقیت انجام شد.',
            error: 'مشکلی رخ داده است!',
        })
    }

    return (
        <section className="mt-8">
            <div className="text-center mb-8">
                <SectionHeaders mainHeader="پرداخت" />
            </div>
            <Link
                className="flex gap-2 border max-w-28 px-4 py-1 rounded-full cursor-pointer"
                href={'/cart?canceled=1'}
            >
                <span>بازگشت</span>
                <Left className="w-4" />
            </Link>
            <div className="grid grid-cols-2 gap-8 shadow-md shadow-gray-300 p-8 my-4 max-md:grid-cols-1">
                {/* LEFT SIDE */}
                <div className="">
                    <div className="mb-8">
                        <span className="bg-orange-200 text-orange-500 font-bold text-xs px-2 py-1 rounded-lg">تست</span>
                        <p className="text-sm mt-2">پیزاریا</p>
                        <p className="text-lg font-bold">{subtotal + 20000} <Toman className="w-5 h-5 inline" /> </p>
                    </div>
                    <div>
                        {cartProducts?.length > 0 && cartProducts.map(product => (
                            <div key={product._id} className="flex justify-between items-center mb-2">
                                <div className="flex gap-4">
                                    <Image src={product.image} width={60} height={60} alt="food image" />
                                    <div className="flex flex-col">
                                        <p className="font-bold"> {product.name} </p>
                                        {product.extras?.length > 0 && (
                                            <div>
                                                {product.extras.map(extra => (
                                                    <div key={extra.name} className="text-sm text-gray-400">{extra.name} {extra.price}+ <Toman className="w-5 h-5 inline fill-gray-400" /></div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="font-bold"> {cartProductPrice(product)} <Toman className="w-5 h-5 inline" /> </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between border-t border-spacing-1 border-gray-300 py-4">
                        <p>مجموع سبد خرید</p>
                        <p className="font-bold"> {subtotal} <Toman className="w-5 h-5 inline" /></p>
                    </div>
                    <div className="flex justify-between border-t border-spacing-1 border-gray-300 py-4">
                        <p>هزینه ارسال</p>
                        <p className="font-bold"> 20000 <Toman className="w-5 h-5 inline" /></p>
                    </div>
                    <div className="flex justify-between border-t border-spacing-1 border-gray-300 py-4">
                        <p>مجموع</p>
                        <p className="font-bold"> {subtotal + 20000} <Toman className="w-5 h-5 inline" /></p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col justify-between">
                    <div>
                        <label>شماره کارت</label>
                        <input type="text" placeholder="0000-0000-0000-0000" disabled />

                        <div className="flex gap-3">
                            <div>
                                <label>تاریخ انقضا</label>
                                <input type="text" placeholder="Year / Month" disabled />
                            </div>

                            <div>
                                <label>CVV2</label>
                                <input type="text" placeholder="1234" disabled />
                            </div>
                        </div>

                        <label>ایمیل</label>
                        <input type="text" placeholder="example@gmail.com" disabled />
                    </div>

                    <p className="text-center bg-gray-100 text-gray-500 bold text-xs px-2 py-1 rounded-lg">نوع پرداخت آزمایشی را انتخاب کنید</p>

                    <div className="mt-2">
                        <button className="flex items-center h-12 mb-2" onClick={successButtonAction}>پرداخت موفق</button>
                        <button className="flex items-center h-12">
                            <Link href={'/cart?canceled=1'}>پرداخت ناموفق</Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}