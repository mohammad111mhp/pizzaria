"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(response => {
            response.json().then(menuItems => {
                setBestSellers(menuItems.slice(0, 8));
            });
        });
    }, []);

    return (
        <section>
            <div className="absolute left-0 right-0">
                <div className="absolute -top-[100px] left-0 -z-10 max-xl:hidden">
                    <Image src={'/right3.png'} width={200} height={200} alt={'coca'}></Image>
                </div>
                <div className="absolute -top-[70px] -right-14 -z-10 -rotate-45">
                    <Image src={'/left1.png'} width={200} height={200} alt={'french fries'}></Image>
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeaders
                    subHeader={'دیدن منو'}
                    mainHeader={'پر فروش ترین ها'}
                />
            </div>
            <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item} />
                ))}
            </div>
        </section>
    );
}