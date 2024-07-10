export default function AddToCartButton({ hasSizesOrExtras, onClick, basePrice }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center mt-4 bg-primary text-white text-sm rounded-full px-8 py-2 transition-all hover:opacity-85 max-[840px]:text-xs max-md:text-sm">
            <span className="py-1"> افزودن به سبد خرید </span>
        </button>
    );
}