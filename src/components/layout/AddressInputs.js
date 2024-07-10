export default function AddressInputs({ addressProps, setAddressProp, disabled }) {
    const { phone, streetAddress, postalCode, city, country } = addressProps;
    return (
        <>
            <label>تلفن</label>
            <input type="tel" dir="rtl" placeholder="شماره تلفن"
                value={phone}
                disabled={disabled}
                onChange={e => setAddressProp('phone', e.target.value)} />

            <label>آدرس</label>
            <input type="text" placeholder="آدرس"
                value={streetAddress}
                disabled={disabled}
                onChange={e => setAddressProp('streetAddress', e.target.value)} />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>کد پستی</label>
                    <input type="text" placeholder="کد پستی"
                        value={postalCode}
                        disabled={disabled}
                        onChange={e => setAddressProp('postalCode', e.target.value)} />
                </div>
                <div>
                    <label>شهر</label>
                    <input type="text" placeholder="شهر"
                        value={city}
                        disabled={disabled}
                        onChange={e => setAddressProp('city', e.target.value)} />
                </div>
            </div>
            {/* <label>Country</label>
            <input type="text" placeholder="Country"
                value={country}
                onChange={e => setAddressProp('country', e.target.value)} /> */}
        </>
    );
}