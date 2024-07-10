"use client";
import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Toman from "@/components/icons/Toman";

export default function MenuItem(menuItem) {
    const {
        image, name, description, basePrice,
        sizes, extraIngredientsPrices,
    } = menuItem;

    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const { addToCart } = useContext(CartContext);

    async function handleAddToCartButtonClick() {
        const hasOptions = sizes?.length > 0 || extraIngredientsPrices?.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        addToCart(menuItem, selectedSize, selectedExtras);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowPopup(false);
        toast.success('به سبد خرید شما اضافه شد.');
    }

    function handleExtraThingClick(ev, extraThing) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing]);
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extraThing.name);
            });
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }
    
    return (
        <>
            {showPopup && (
                <div
                    onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-30">
                    <div
                        onClick={ev => ev.stopPropagation()}
                        className="my-8 bg-white p-2 rounded-lg max-w-md">
                        <div
                            className="overflow-y-scroll p-2"
                            style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image
                                src={image}
                                alt={name}
                                width={300} height={200}
                                className="mx-auto" />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">
                                {description}
                            </p>
                            {sizes?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700"> انتخاب سایز </h3>
                                    {sizes.map(size => (
                                        <label
                                            key={size._id}
                                            className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                            <input
                                                type="radio"
                                                onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                name="size" />
                                            {size.name} ({basePrice + size.price} <Toman className="w-5 h-5 fill-gray-600 inline" />)
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredientsPrices?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700"> تاپینگ اضافه؟ </h3>
                                    {extraIngredientsPrices.map(extraThing => (
                                        <label
                                            key={extraThing._id}
                                            className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                            <input
                                                type="checkbox"
                                                onChange={ev => handleExtraThingClick(ev, extraThing)}
                                                checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                                                name={extraThing.name} />
                                            {extraThing.name} ({extraThing.price}+ <Toman className="w-5 h-5 fill-gray-600 inline" />)
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button
                                type="button"
                                className="primary sticky bottom-2"
                                onClick={handleAddToCartButtonClick}
                            >
                                افزودن ({selectedPrice} <Toman className="w-5 h-5 fill-white inline" />)
                            </button>
                            <button
                                className="mt-2"
                                onClick={() => setShowPopup(false)}>
                                لغو
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile
                onAddToCart={handleAddToCartButtonClick}
                {...menuItem} />
        </>
    );
}