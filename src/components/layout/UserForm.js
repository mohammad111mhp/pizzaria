"use client";
import { useState } from "react";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({ user, onSave }) {

    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }

    return (
        <div className="flex gap-4 max-sm:block">
            <div>
                <div className="p-2 rounded-lg relative max-sm:block">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form
                className="grow"
                onSubmit={e => onSave(e, { name: userName, image, phone, streetAddress, postalCode, city, country, admin })}
            >
                <label>نام و نام خانوادگی</label>
                <input type="text" placeholder="نام و نام خانوادگی" value={userName} onChange={e => setUserName(e.target.value)} />
                <label>ایمیل</label>
                <input type="email" placeholder="ایمیل" disabled={true} value={user?.email} />
                <AddressInputs
                    addressProps={{ phone, streetAddress, postalCode, city, country }}
                    setAddressProp={handleAddressChange}
                />

                {loggedInUserData.admin && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 mb-2 cursor-pointer" htmlFor="adminCb">
                            <input id="adminCb" type="checkbox" className="cursor-pointer"
                                value={'1'}
                                checked={admin}
                                onChange={e => setAdmin(e.target.checked)}
                            />
                            <span>دسترسی مدیر داده شود.</span>
                        </label>
                    </div>
                )}

                <button type="submit" className="transition-all hover:opacity-85">ذخیره</button>
            </form>
        </div>
    );
}