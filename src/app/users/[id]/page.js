"use client";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Loading from "@/components/layout/Loading"
import AccessError from "@/components/layout/AccessError";
import UserForm from "@/components/layout/UserForm";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const { loading, data } = useProfile()
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch('/api/profile?_id=' + id).then(response => {
            response.json().then(user => {
                setUser(user);
            });
        })
    }, []);

    async function handleSaveButtonClick(e, data) {
        e.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id }),
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(promise, {
            loading: 'درحال ذخیره...',
            success: 'کاربر با موفقیت ذخیره شد.',
            error: 'مشکلی رخ داده است!',
        });
    }

    if (loading) {
        return <Loading />
    }

    if (!data.admin) {
        return <AccessError />
    }

    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}