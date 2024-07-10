import Image from "next/image";

export default function Loading() {
    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 bg-white mx-auto">
            <div className="flex justify-center items-center h-screen">
                <div className="rounded-full h-20 w-20 animate-ping">
                    <div className="flex flex-col items-center text-primary font-semibold text-md transition-all hover:scale-110">
                        <Image src={'/logo2.png'} width={80} height={80} alt={'logo'} />
                        PIZZARIA
                    </div>
                </div>
            </div>
        </section>
    );
}