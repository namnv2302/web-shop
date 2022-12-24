function Content({ title, children }) {
    return (
        <div className=" p-[30px] border border-[#ebebeb]">
            <h3 className="text-[18px] text-[#000] font-semibold pb-[8px] mb-[20px] border-b-[1px] border-[#ebebeb]">
                {title}
            </h3>
            {children}
        </div>
    );
}

export default Content;
