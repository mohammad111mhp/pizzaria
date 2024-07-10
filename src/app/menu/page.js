"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import ChevronUp from "@/components/icons/ChevronUp";

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        fetch('/api/categories').then(response => {
            response.json().then(categories => setCategories(categories))
        });
        fetch('/api/menu-items').then(response => {
            response.json().then(menuItems => setMenuItems(menuItems));
        });
    }, []);

    useEffect(() => {
        const toggleVisibility = () => {
            window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
        }
        window.addEventListener("scroll", toggleVisibility)

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: "auto",
            })
    }

    return (
        <section className="mt-8">
            <div className="flex flex-wrap justify-center gap-2 my-4">
                {categories?.length > 0 && categories.map(c => (
                    <div key={c._id} className="border border-gray-300 px-4 py-2 rounded-lg transition-all hover:scale-110">
                        <Link href={`/menu/#${c._id}`} className=""> {c.name} </Link>
                    </div>
                ))}
            </div>
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id}>
                    <div className="text-center" id={c._id}>
                        <SectionHeaders mainHeader={c.name} underLine="bg-primary w-100 h-1 rounded-full" />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-6 mb-12 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {menuItems.filter(item => item.category === c._id).map(item => (
                            <MenuItem key={item._id} {...item} />
                        ))}
                    </div>
                </div>
            ))}
            <div
                className={
                    `fixed bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200 bg-gray-200 cursor-pointer 
                    ${isVisible ? "opacity-100" : "opacity-0"}`
                }
                onClick={scrollToTop}
            >
                <ChevronUp />
            </div>
        </section>
    );
}