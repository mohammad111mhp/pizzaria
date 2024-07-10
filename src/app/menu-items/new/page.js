"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import AccessError from "@/components/layout/AccessError"
import Loading from "@/components/layout/Loading";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage() {
    const [redirectToItems, setRedirectToItems] = useState(false);
    const { loading, data } = useProfile();

    async function handleFormSubmit(e, data) {
        e.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'درحال ذخیره سازی...',
            success: 'آیتم منو با موفقیت ذخیره شد.',
            error: 'مشکلی رخ داده است!',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return <Loading />
    }

    if (!data.admin) {
        return <AccessError />
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button transition-all hover:bg-gray-100">
                    <span>نمایش تمام آیتم های منو</span>
                    <Left />
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    );
}