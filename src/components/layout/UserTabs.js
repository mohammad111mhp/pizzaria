"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
    const path = usePathname();
    return (
        <div className="flex justify-center gap-2 tabs flex-wrap">
            <Link
                className={path === '/profile' ? 'active' : ''}
                href={'/profile'}>
                <span className="font-semibold">پروفایل</span>
            </Link>
            {isAdmin && (
                <>
                    <Link
                        className={path === '/categories' ? 'active' : ''}
                        href={'/categories'}>
                        <span className="font-semibold">دسته بندی ها</span>
                    </Link>
                    <Link
                        className={path.includes('menu-items') ? 'active' : ''}
                        href={'/menu-items'}>
                        <span className="font-semibold">منو</span>
                    </Link>
                    <Link
                        className={path.includes('users') ? 'active' : ''}
                        href={'/users'}>
                        <span className="font-semibold">کاربرها</span>
                    </Link>
                    <Link
                        className={path === '/orders' ? 'active' : ''}
                        href={'/orders'}>
                        <span className="font-semibold">سفارش ها</span>
                    </Link>
                </>
            )}
        </div>
    );
}