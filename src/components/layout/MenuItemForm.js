import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import MeniItemPriceProps from "@/components/layout/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientsPrices, setExtraIngredientsPrices] = useState(menuItem?.extraIngredientsPrices || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);

    return (
        <div className="mt-8 max-w-2xl mx-auto">
            <div className="grid items-start gap-4 max-sm:block"
                style={{
                    gridTemplateColumns: '.3fr .7fr'
                }}>
                <div>
                    {image && (
                        <CldImage
                            width="150"
                            height="150"
                            src={image}
                            alt="avatar"
                            className="mb-2 rounded-lg mx-auto"
                        />
                    )}
                    {!image && (
                        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                            بدون تصویر
                        </div>
                    )}
                    <label>
                        <CldUploadWidget
                            options={{
                                sources: ['local'],
                                maxFiles: 1
                            }}
                            signatureEndpoint={'/api/upload'}
                            onSuccess={(result, { widget }) => {
                                setImage(result?.info.secure_url);
                                widget.close();
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <button
                                        className="transition-all hover:bg-gray-100"
                                        onClick={() => open()}
                                    >
                                        ویرایش
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </label>
                </div>
                <form className="grow" onSubmit={e =>
                    onSubmit(e, {
                        image, name, description, basePrice, sizes, extraIngredientsPrices, category,
                    })
                }
                >
                    <label>نام آیتم</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <label>توضیحات</label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <label>دسته بندی</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option
                                value={c._id}
                                key={c._id}
                            >
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <label>قیمت پایه</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={e => setBasePrice(e.target.value)}
                    />

                    <MeniItemPriceProps
                        name={'سایز ها'}
                        addLabel={'افزودن سایز های مختلف'}
                        props={sizes}
                        setProps={setSizes}
                    />

                    <MeniItemPriceProps
                        name={'تاپینگ اضافه'}
                        addLabel={'افزودن تاپینگ اضافه'}
                        props={extraIngredientsPrices}
                        setProps={setExtraIngredientsPrices}
                    />
                    <button type="submit" className="transition-all hover:opacity-85">ذخیره</button>
                </form>
            </div>
        </div>
    );
}