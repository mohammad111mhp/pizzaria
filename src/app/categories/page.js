"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import Loading from "@/components/layout/Loading"
import AccessError from "@/components/layout/AccessError";
import DeleteButton from "@/components/DeleteButton";
import Trash from "@/components/icons/Trash";
import Edit from "@/components/icons/Edit";

export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories);
            });
        });
    }

    async function handleCategorySubmit(e) {
        e.preventDefault();
        const createPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName };
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(createPromise, {
            loading: editedCategory ? 'بروزرسانی دسته بندی...' : 'ساخت دسته بندی جدید...',
            success: editedCategory ? 'دسته بندی با موفقیت بروزرسانی شد.' : 'دسته بندی با موفقیت ساخته شد.',
            error: 'مشکلی رخ داده است!',
        });
    }

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(promise, {
            loading: 'درحال حذف کردن...',
            success: 'دسته بندی با موفقیت حذف شد.',
            error: 'مشکلی رخ داده است!',
        });

        fetchCategories();
    }

    if (profileLoading) {
        return (
            <Loading />
        );
    }

    if (!profileData.admin) {
        return (
            <AccessError />
        );
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'ویرایش دسته بندی' : 'دسته بندی جدید'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                            placeholder="نام دسته بندی"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)} />
                    </div>
                    <div className="pb-2 flex gap-1">
                        <button className="border border-primary transition-all hover:opacity-85" type="submit">
                            {editedCategory ? 'بروزرسانی' : 'ایجاد'}
                        </button>
                        <button
                            className="transition-all hover:bg-gray-100"
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setCategoryName('');
                            }}>
                            لغو
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">دسته بندی ها</h2>
                {categories?.length > 0 && categories.map(item => (
                    <div key={item._id} className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                        <div className="grow">
                            {item.name}
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => {
                                    setEditedCategory(item);
                                    setCategoryName(item.name);
                                }}
                                type="button"
                            >
                                <Edit className="size-6 transition-all hover:scale-125" />
                            </button>
                            <DeleteButton
                                label={<Trash className="size-6 transition-all hover:scale-125" />}
                                onDelete={() => handleDeleteClick(item._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}