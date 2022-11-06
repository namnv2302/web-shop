function Loading() {
    return (
        <div className="m-auto h-[100vh] flex flex-col items-center justify-center">
            <div className="w-[144px] h-[3px] rounded-[99px] bg-[#ddd] relative overflow-x-hidden">
                <div className="absolute top-0 left-0 h-[100%] w-[50%] bg-[#333] animate-loading"></div>
            </div>
        </div>
    );
}

export default Loading;
