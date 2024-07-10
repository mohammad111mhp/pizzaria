import Image from "next/image";

export default function Gallery() {
    return (
        <div className="container mx-auto mt-4">
            <div className="-m-1 flex flex-wrap md:-m-2">
                <div className="flex w-1/2 flex-wrap">
                    <div className="w-1/2 p-1 md:p-2">
                        <Image className="block h-full w-full rounded-2xl object-cover object-center" src={'/gallery4.jpg'} width={300} height={200} alt="gallery" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <Image className="block h-full w-full rounded-2xl object-cover object-center" src={'/gallery1.jpg'} width={300} height={200} alt="gallery" />
                    </div>
                    <div className="w-full p-1 md:p-2">
                        <Image className="block h-full w-full rounded-2xl object-cover object-center" src={'/gallery2.jpg'} width={300} height={200} alt="gallery" />
                    </div>
                </div>
                <div className="flex w-1/2 flex-wrap">
                    <div className="w-full p-1 md:p-2">
                        <Image className="block h-full w-full rounded-2xl object-cover object-center" src={'/gallery5.jpg'} width={300} height={200} alt="gallery" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <Image className="block h-full w-full rounded-2xl object-cover object-center" src={'/gallery3.jpg'} width={300} height={200} alt="gallery" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <Image className="block h-full w-full rounded-2xl object-cover object-center" src={'/gallery6.jpg'} width={300} height={200} alt="gallery" />
                    </div>
                </div>
            </div>
        </div>
    );
}