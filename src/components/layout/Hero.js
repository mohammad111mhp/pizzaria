import Image from "next/image";
import Left from "@/components/icons/Left";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero mt-4">
            <div className="py-12">
                <h1 className="text-4xl font-black">
                    <span className="text-primary">پیتزا</span>
                    <br />
                    جایی که رویاها
                    <br />
                    تبدیل به تاپینگ
                    <br />
                    می شوند!
                </h1>
                <p className="my-6 text-gray-500 text-sm"> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. </p>
                <div className="flex justify-between text-sm max-[850px]:text-xs max-md:text-sm max-sm:flex-col ">
                    <button className="bg-primary uppercase flex justify-center items-center gap-1.5 text-white px-4 py-2 rounded-full transition-all hover:opacity-85"> <Link href={'/menu'}>  ثبت سفارش  </Link> <Left /> </button>
                    <button className="flex items-center border-0 gap-2 py-2 text-gray-500 font-semibold rounded-full transition-all hover:bg-gray-100"> <Link href={'/#about'}> بیشتر بدانید </Link> <Left /> </button>
                </div>
            </div>
            <div className="relative max-md:hidden">
                <Image src={'/heropic1.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
            </div>
        </section>
    );
}