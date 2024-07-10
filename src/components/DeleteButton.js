import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed bg-black/90 inset-0 flex items-center h-full justify-center z-10">
                <div className="bg-white p-6 rounded-lg">
                    <div>آیا از حذف کردن مطمئن هستید؟</div> 
                    <div className="flex gap-3 mt-4">
                        <button type="button" className="transition-all hover:bg-gray-100" onClick={() => setShowConfirm(false)}>
                            لغو
                        </button>
                        <button
                            onClick={() => {
                                onDelete();
                                setShowConfirm(false);
                            }}
                            type="button"
                            className="primary transition-all hover:opacity-85">
                            تایید,&nbsp;حذف!
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)} className="w-full transition-all hover:bg-gray-100">
            {label}
        </button>
    );
}