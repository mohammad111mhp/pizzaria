export default function SectionHeaders({ subHeader, mainHeader, underLine="hidden" }) {
    return (
        <>
            <h3 className="uppercase text-gray-500 font-semibold leading-4">
                {subHeader}
            </h3>
            <h2 className="flex justify-center items-center gap-4 text-primary font-extrabold text-4xl italic">
                {mainHeader}
            </h2>
            <div className={underLine}></div>
        </>
    );
}