"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Loading from "@/components/layout/Loading"
import AccessError from "@/components/layout/AccessError";
import { useEffect, useState } from "react";
import Link from "next/link";
import Edit from "@/components/icons/Edit";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
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
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div
                        key={user._id}
                        className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="grid grid-cols-2 gap-4 grow max-md:grid-cols-1">
                            <div className="text-gray-900 transition-all hover:underline">
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray-500 transition-all hover:underline">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/' + user._id}>
                                <Edit className="size-6 transition-all hover:scale-125" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}