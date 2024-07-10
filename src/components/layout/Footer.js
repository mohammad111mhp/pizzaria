"use client";
import Instagram from "@/components/icons/Instagram";
import Facebook from "@/components/icons/Facebook";
import Twitter from "@/components/icons/Twitter";
import Youtube from "@/components/icons/Youtube";
import Send from "@/components/icons/Send";

export default function Footer() {
    return (
        <footer className="border-t p-3 text-center text-gray-500 mt-16">
            <div className="w-full flex justify-start flex-row-reverse gap-4 max-sm:justify-center">
                <a href="https://www.instagram.com" className="border border-gray-500 p-2 rounded-full transition-all hover:scale-125">
                    <Instagram />
                </a>
                <a href="https://www.facebook.com" className="border border-gray-500 p-2 rounded-full transition-all hover:scale-125">
                    <Facebook />
                </a>
                <a href="https://www.x.com" className="border border-gray-500 p-2 rounded-full transition-all hover:scale-125">
                    <Twitter />
                </a>
                <a href="https://www.youtube.com" className="border border-gray-500 p-2 rounded-full transition-all hover:scale-125">
                    <Youtube />
                </a>
            </div>
            <div className="grid grid-cols-2 mt-6 max-sm:grid-cols-1">
                <div className="grid grid-rows-2 gap-3">
                    <div className="flex flex-col">
                        <p className="text-primary font-bold text-lg"> هرگز تخفیفات شگفت انگیز را در پیزاریا از دست <br /> ندهید! </p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-right"> اکنون ثبت نام کنید </label>
                        <div className="flex items-center gap-3">
                            <input type="email" placeholder="ایمیل" style={{
                                margin: '0',
                            }} />
                            <div
                                className="flex justify-center items-center bg-primary px-4 py-3 rounded-xl cursor-pointer"
                            >
                                <Send className="size-6 rotate-180 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div>
                        <p className="font-bold text-lg mb-3" id="contact"> راه های ارتباطی </p>
                        <ul className="flex flex-col gap-2 text-left max-sm:text-center">
                            <li className="hover:underline">Email: Pizzaria@gmail.com</li>
                            <li className="hover:underline">Phone: +98 910 123 4567</li>
                            <li className="hover:underline">Tel: 021 123 456</li>
                            <li className="hover:underline">Address: Lorem ipsum lorem </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <a target="_blank" href="https://icons8.com/icon/M0MbJcRU5D5R/pizza">Pizza</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            </div>
            &copy; 2024 All rights reserved
        </footer>
    );
}
