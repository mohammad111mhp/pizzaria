"use client";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { useContext, useState } from "react";
import Logo from "@/components/icons/Logo";
import Link from "next/link";
import UserIcon from "@/components/icons/UserIcon";

export default function Header() {
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    const { cartProducts } = useContext(CartContext);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    const mobileNavLine = 'w-6 h-[2px] bg-gray-700 rounded-md transition-all';
    const mobileNavLineActive1 = 'w-6 h-[2px] bg-gray-700 rounded-md transition-all rotate-45 translate-y-1 z-10';
    const mobileNavLineActive2 = 'w-6 h-[2px] bg-gray-700 rounded-md transition-all hidden';
    const mobileNavLineActive3 = 'w-6 h-[2px] bg-gray-700 rounded-md transition-all -rotate-45 -translate-y-1 z-10';

    const mobileMenuActive = 'fixed right-0 top-0 bottom-0 w-80 h-full flex flex-col gap-4 bg-gray-300 shadow-2xl shadow-slate-700 z-10 p-4 transition-all';
    const mobileMenuDeactive = 'fixed -right-80 top-0 bottom-0 w-80 h-full flex flex-col gap-4 bg-gray-300 shadow-2xl shadow-slate-700 z-10 p-4 transition-all';


    return (
        <header className="w-full sticky top-0 bg-white z-20">
            <div className="hidden max-md:flex items-center justify-between">

                {/* RIGHT SIDE */}
                <Logo />
                <div className={isMobileNavOpen ? mobileMenuActive : mobileMenuDeactive} onClick={() => setIsMobileNavOpen(false)}>
                    <div className="text-primary font-semibold text-2xl text-center py-4 border-b">
                        <Logo />
                    </div>
                    {status === 'authenticated' && (
                        <>
                            <Link href={'/profile'}><span className="italic mb-4">سلام, </span> {userName}</Link>
                            <div className="flex flex-col gap-4 mt-3">
                                <Link href={'/'} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    خانه
                                </Link>
                                <Link href={'/menu'} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    منو
                                </Link>
                                <Link href={'/#about'} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    درباره ما
                                </Link>
                                <Link href={'/#contact'} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    ارتباط با ما
                                </Link>
                                <Link href={'/profile'} className="flex items-center gap-3 pb-4 border-b">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    پروفایل
                                </Link>
                            </div>
                            <button onClick={() => signOut()} className="flex items-center bg-primary rounded-full text-white px-8 py-2">خروج</button>
                        </>
                    )}

                    {status === 'unauthenticated' && (
                        <>
                            <div className="flex flex-col gap-4 mt-3">
                                <Link href={'/'} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    خانه
                                </Link>
                                <Link href={'/menu'} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    منو
                                </Link>
                                <Link href={'/#about'} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    درباره ما
                                </Link>
                                <Link href={'/#contact'} className="flex items-center gap-3 pb-4 border-b">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    ارتباط با ما
                                </Link>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <Link href={'/login'} className="border rounded-full px-8 py-2">ورود</Link>
                                <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2 text-center">ثبت نام</Link>
                            </div>
                        </>
                    )}
                </div>

                {/* LEFT SIDE */}
                <div className="flex gap-8">
                    <Link href={'/cart'} className="relative">
                        <ShoppingCart />
                        {cartProducts?.length > 0 && (
                            <div className="flex items-center justify-center absolute -top-3 -right-4 bg-primary text-white text-xs font-bold py-1 px-2 rounded-full">
                                <span>{cartProducts.length}</span>
                            </div>
                        )}
                    </Link>
                    <div
                        className="flex flex-col justify-evenly cursor-pointer"
                        onClick={() => setIsMobileNavOpen(prev => !prev)}
                    >
                        {true && (
                            <>
                                <div className={isMobileNavOpen ? mobileNavLineActive1 : mobileNavLine}></div>
                                <div className={isMobileNavOpen ? mobileNavLineActive2 : mobileNavLine}></div>
                                <div className={isMobileNavOpen ? mobileNavLineActive3 : mobileNavLine}></div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between max-md:hidden">
                <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                    <Logo />
                    <Link href={'/'} className="transition-all hover:scale-110">خانه</Link>
                    <Link href={'/menu'} className="transition-all hover:scale-110">منو</Link>
                    <Link href={'/#about'} className="transition-all hover:scale-110">درباره ما</Link>
                    <Link href={'/#contact'} className="transition-all hover:scale-110">ارتباط با ما</Link>
                </nav>
                <nav className="flex items-center gap-6 text-gray-500 font-semibold">
                    {status === 'authenticated' && (
                        <>
                            <Link href={'/profile'} className="flex pt-1 transition-all hover:scale-110">{userName} <UserIcon className="size-5" /></Link>
                            <button onClick={() => signOut()} className="flex items-center bg-primary rounded-full text-white px-8 py-2 transition-all hover:opacity-85">خروج</button>
                        </>
                    )}

                    {status === 'unauthenticated' && (
                        <>
                            <Link href={'/login'} className="transition-all hover:scale-110">ورود</Link>
                            <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2 transition-all hover:opacity-85">ثبت نام</Link>
                        </>
                    )}
                    <Link href={'/cart'} className="relative">
                        <ShoppingCart />
                        {cartProducts?.length > 0 && (
                            <div className="flex items-center justify-center absolute -top-3 -right-4 bg-primary text-white text-xs font-bold py-1 px-2 rounded-full">
                                <span>{cartProducts.length}</span>
                            </div>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}