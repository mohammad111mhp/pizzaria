import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";
import Toman from "@/components/icons/Toman";

export default function CartProduct({ index, product, onRemove }) {

    return (
        <div className="flex items-center gap-4 border-b py-4">
            <div className="w-24">
                <Image width={240} height={240} src={product.image} alt={'product'} />
            </div>
            <div className="flex flex-col gap-1 grow">
                <h3 className="font-semibold">
                    {product.name}
                </h3>
                {product.size && (
                    <div className="text-sm">
                        سایز: <span>{product.size.name}</span>
                    </div>
                )}
                {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                        {product.extras.map(extra => (
                            <div key={extra.name}>{extra.name} ({extra.price} <Toman className="w-5 h-5 inline fill-gray-500" />)</div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex text-lg font-semibold">
                {cartProductPrice(product)} <Toman className="w-5 h-5 inline" />
            </div>
            {!!onRemove && (
                <div className="ml-2">
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="p-2">
                        <Trash className="size-6 transition-all hover:scale-125" />
                    </button>
                </div>
            )}
        </div>
    );
}