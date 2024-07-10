"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

export default function EditableImage({ link, setLink }) {
    return (
        <>
            {link && (
                <Image
                    width="120"
                    height="120"
                    src={link}
                    alt="avatar"
                    className="mb-2 rounded-lg mx-auto"
                />
            )}
            {/* {link && (
                <CldImage
                    width="120"
                    height="120"
                    src={link}
                    alt="avatar"
                    className="mb-2 rounded-lg mx-auto"
                />
            )} */}
            {!link && (
                <CldImage
                    width="120"
                    height="120"
                    src="https://res.cloudinary.com/dm9deqpf0/image/upload/v1717275007/profile-pic_jlhtju.jpg"
                    alt="avatar"
                    className="mb-2 rounded-lg mx-auto"
                />
            )}
            <label>
                <CldUploadWidget
                    options={{
                        sources: ['local'],
                        maxFiles: 1
                    }}
                    signatureEndpoint={'/api/upload'}
                    onSuccess={(result, { widget }) => {
                        setLink(result?.info.secure_url);
                        widget.close();
                    }}
                >
                    {({ open }) => {
                        return (
                            <button 
                            onClick={() => open()}
                            className="transition-all hover:bg-gray-100"
                            >
                                تغییر پروفایل
                            </button>
                        );
                    }}
                </CldUploadWidget>
            </label>
        </>
    );
}
