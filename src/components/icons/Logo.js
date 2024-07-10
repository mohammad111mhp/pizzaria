import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link className="flex flex-col items-center text-primary font-extrabold text-xs transition-all hover:scale-110" href={'/'}>
            <Image src={'/logo2.png'} width={45} height={45} alt="logo" />
            PIZZARIA
        </Link>
    );
}