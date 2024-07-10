"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Loading from "@/components/layout/Loading"
import AccessError from "@/components/layout/AccessError"
import { useEffect, useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import Right from "@/components/icons/Right";

export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        })
    }, []);

    if (loading) {
        return <Loading />
    }

    if (!data.admin) {
        return <AccessError />
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button transition-all hover:bg-gray-100"
                    href={'/menu-items/new'}>
                    <Right />
                    ساخت آیتم منوی جدید
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">ویرایش آیتم منو</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link key={item._id} href={'/menu-items/edit/' + item._id}
                            className="bg-gray-200 rounded-lg p-4 transition-all hover:bg-white hover:shadow-md hover:shadow-black/25 hover:-translate-y-1"
                        >
                            <div className="relative">
                                <CldImage
                                    className="rounded-md mx-auto"
                                    width="100"
                                    height="100"
                                    src={item.image}
                                    alt="food image"
                                />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}