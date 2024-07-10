import AddToCartButton from "@/components/menu/AddToCartButton";
import Toman from "@/components/icons/Toman"

export default function MenuItemTile({ onAddToCart, ...item }) {
    const { image, description, name, basePrice,
        sizes, extraIngredientsPrices,
    } = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientsPrices?.length > 0;

    return (
        <div className="bg-white p-4 rounded-lg text-center transition-all shadow-lg hover:shadow-black/25 hover:-translate-y-1">
            <div className="text-center">
                <img src={image} className="max-w-auto max-h-24 block mx-auto" alt="pizza" />
            </div>
            <h4 className="font-bold text-xl my-3">
                {name}
            </h4>
            <p className="text-gray-400 text-sm line-clamp-3">
                {description}
            </p>
            {hasSizesOrExtras ? (
                <p className="py-1 text-right font-semibold my-3"> از {basePrice} <Toman className="w-5 h-5 inline" /></p>
            ) : (
                <p className="py-1 text-right font-semibold my-3"> {basePrice} <Toman className="w-5 h-5 inline" /></p>
            )}
            <AddToCartButton
                hasSizesOrExtras={hasSizesOrExtras}
                onClick={onAddToCart}
                basePrice={basePrice}
            />
        </div>
    );
}