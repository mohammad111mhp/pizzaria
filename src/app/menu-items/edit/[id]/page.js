"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import AccessError from "@/components/layout/AccessError"
import Loading from "@/components/layout/Loading";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage() {
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            });
        })
    }, []);

    async function handleFormSubmit(e, data) {
        e.preventDefault();

        data = { ...data, _id: id };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE',
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        toast.promise(promise, {
            loading: 'درحال حذف کردن...',
            success: 'آیتم با موفقیت حذف شد.',
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            <div className="max-w-2xl mx-auto mt-2 max-sm:w-full">
                <div className=" mr-auto max-w-[459px] max-md:max-w-[421px] max-sm:max-w-full">
                    <DeleteButton
                        label={'حذف'}
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    );
}