'use client'; // This is a client component
import Image from 'next/image';
import { icon_success } from '@/app/components/Image';
import { useState } from 'react';
import InputField from '@/app/components/inputField';

enum ApiStatus {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Failed = 'failed'
}
const Home = () => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [apiStatus, setApiStatus] = useState<ApiStatus>(ApiStatus.Idle);
    const handleSubmit = () => {
        setIsBottomSheetOpen(true);
        setApiStatus(ApiStatus.Failed);

        // if (apiStatus === ApiStatus.Success) {
        //     setTimeout(() => {
        //         setIsBottomSheetOpen(false);
        //     }, 3000);
        // }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="flex-none h-1/6 bg-gray-200 p-4">
                <div className="max-w-sm mx-auto sm:max-w-md text-center">
                    <p className="text-lg font-bold">送機行程</p>
                </div>
            </header>
            <main className="flex-grow">
                <div className="max-w-sm mx-auto p-4 sm:max-w-md">
                    <div className="mb-4">
                        <h2 className="mt-4 font-semibold">送機計畫</h2>
                        <InputField label="下車機場" />
                        <InputField label="航班編號" />
                        <h2 className="mt-4 font-semibold">旅客資訊</h2>
                        <InputField label="姓名" />
                        <InputField label="電話" />
                        <InputField label="身分證字號/護照號碼" />
                        <InputField label="乘車備註" />
                    </div>
                </div>
            </main>
            <footer className="w-full flex-none h-1/6 bg-gray-200 p-4">
                <div className="max-w-sm mx-auto sm:max-w-md h-full flex items-center">
                    <button
                        className="w-full p-2 border border-gray-300 rounded-md bg-blue-500 text-white"
                        onClick={handleSubmit}>
                        下一步
                    </button>
                </div>
            </footer>
            {isBottomSheetOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
            <div
                className={`z-50 fixed inset-x-0 bottom-0 p-4 bg-white rounded-t-lg shadow-lg transform transition-transform flex flex-col items-center justify-center ${
                    isBottomSheetOpen ? 'translate-y-0 h-64' : 'translate-y-full'
                }`}>
                {apiStatus === ApiStatus.Success ? (
                    <div
                        className={`fixed inset-x-0 bottom-0 p-4 bg-white rounded-t-lg shadow-lg 
                    transform transition-transform flex flex-col items-center justify-center ${isBottomSheetOpen ? 'translate-y-0 h-64' : 'translate-y-full'}`}>
                        <Image src={icon_success} alt="FBB Logo" className="m-5" />
                        <div className=" text-2xl">完成送機行程</div>
                    </div>
                ) : (
                    <div className="max-w-sm mx-auto sm:max-w-md">
                        <div className="w-full">
                            <p className="text-2xl text-left px-4">查不到「ＸＸＸ」航班資訊</p>
                            <p className="text-left px-4">請確認航班資訊、起飛時間等，你也可以直接填寫此航班作為機場接送資訊</p>
                        </div>
                        <div className="w-full flex flex-col justify-center gap-4 mt-4">
                            <button
                                onClick={() => setIsBottomSheetOpen(false)}
                                className="w-full p-2 border border-gray-300 rounded-md bg-blue-500 text-white">
                                確認航班資訊，並送出
                            </button>
                            <button
                                onClick={() => setIsBottomSheetOpen(false)}
                                className="w-full p-2 border border-gray-300 rounded-md bg-blue-500 text-white">
                                重新填寫
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
