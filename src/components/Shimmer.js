const Shimmer = () => {
    return (

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(8).fill("").map((_, index) => (
                <div key={index} className="flex flex-col h-[350px] bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
                    <div className="w-full aspect-[4/3] bg-gray-200"></div>
                    <div className="p-4 space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                        <div className="mt-auto h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                </div>
            ))}
        </div>
        /*
        <div className="m-2 p-4 rounded-lg shadow-md bg-gray-200 w-full animate-pulse">
            <div className="rounded-lg bg-gray-300 w-full h-40"></div>
            <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        */
    )
}

export default Shimmer;