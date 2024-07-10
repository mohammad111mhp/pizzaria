"use client";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const { loading, data: profile } = useProfile();

    useEffect(() => {
        fetchOrders();
    }, []);

    function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(response => {
            response.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            });
        });
    }

    return (
        <section className="mt-8 mx-auto">
            <UserTabs isAdmin={profile.admin} />
            <div className="mt-8">
                {loadingOrders && (
                    <Loading />
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div
                        key={order._id}
                        className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
                        <div className="grow flex flex-col md:flex-row items-center gap-6">
                            <div>
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-400')
                                    + ' p-2 rounded-md text-white w-24 text-center text-sm font-semibold'
                                }>
                                    {order.paid ? 'پرداخت شده' : 'پرداخت نشده'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex gap-2 items-center mb-1">
                                    <div className="grow">{order.userEmail}</div>
                                    <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                            <Link href={"/orders/" + order._id} className="button text-sm font-semibold transition-all hover:bg-gray-300">
                                نمایش سفارش
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}