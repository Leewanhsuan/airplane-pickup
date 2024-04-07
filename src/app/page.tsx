'use client'; // This is a client component
import { useState } from 'react';
import Image from 'next/image';
import useFlightData from '@/app/hooks/useFlightData';
import useFormState from '@/app/hooks/useFormState';
import { icon_success } from '@/app/components/Image';
import InputField from '@/app/components/inputField';
import { findFlightByNumber } from '@/app/utils/flightUtils';
import LoadingSpinner from '@/app/components/LoadingSpinner';

enum ApiResponse {
    Idle = 'idle',
    Success = 'success',
    NotFound = 'notFound'
}

const Home = () => {
    const { data, error, isLoading } = useFlightData();
    const { fields, errors, handleChange, validate, resetFields } = useFormState();

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse>(ApiResponse.Idle);

    /**
     * Handles form submission and performs various actions based on the input and API response.
     */
    const handleSubmitAndCheck = (): void => {
        if (!validate()) {
            return;
        }

        if (error) {
            console.log('API error');
            return;
        }

        setIsBottomSheetOpen(true);
        const result = findFlightByNumber(fields.flightNumber.toUpperCase(), data);

        if (result.isMatch) {
            setApiResponse(ApiResponse.Success);
            setTimeout(() => {
                setIsBottomSheetOpen(false);
                resetFields();
            }, 3000);
        } else {
            setApiResponse(ApiResponse.NotFound);
        }
    };

    const handleSubmitAfterCheck = () => {
        setApiResponse(ApiResponse.Success);
        setTimeout(() => {
            setIsBottomSheetOpen(false);
            resetFields();
        }, 3000);
    };

    const handleFormReset = () => {
        resetFields();
        setIsBottomSheetOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="h-1/6 bg-gray-200 p-4">
                <div className="max-w-sm mx-auto sm:max-w-md text-center">
                    <p className="text-lg font-bold">送機行程</p>
                </div>
            </header>
            <main className="flex-grow overflow-auto" style={{ height: 'calc(100vh - (100vh / 6 * 2))' }}>
                <div className="max-w-sm mx-auto p-4 sm:max-w-md">
                    <div className="mb-4">
                        <h2 className="mt-4 font-semibold">送機計畫</h2>
                        <InputField
                            label="下車機場"
                            value={fields.airport}
                            onChange={(value) => handleChange('airport', value)}
                            disabled={true}
                        />
                        <InputField
                            label="航班編號"
                            value={fields.flightNumber}
                            onChange={(value) => handleChange('flightNumber', value)}
                            error={errors.flightNumber}
                        />
                        <h2 className="mt-4 font-semibold">旅客資訊</h2>
                        <InputField
                            label="姓名"
                            description="※ 與護照相同之英文姓名"
                            value={fields.name}
                            onChange={(value) => handleChange('name', value)}
                            error={errors.name}
                        />
                        <InputField
                            label="電話"
                            value={fields.phone}
                            onChange={(value) => handleChange('phone', value)}
                            error={errors.phone}
                        />
                        <InputField
                            label="身分證字號/護照號碼"
                            description="※ 無身份字號之外國旅客請填寫護照號碼"
                            value={fields.idOrPassport}
                            onChange={(value) => handleChange('idOrPassport', value)}
                            error={errors.idOrPassport}
                        />
                        <InputField
                            label="乘車備註"
                            multiline={true}
                            value={fields.remarks}
                            onChange={(value) => handleChange('remarks', value)}
                        />
                    </div>
                </div>
            </main>
            <footer className="h-1/6 bg-gray-200 p-4">
                <div className="max-w-sm mx-auto sm:max-w-md h-full flex items-center">
                    <button
                        className="w-full p-2 border border-gray-300 rounded-md bg-blue-500 text-white"
                        onClick={handleSubmitAndCheck}>
                        下一步
                    </button>
                </div>
            </footer>
            {isBottomSheetOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
            <div
                className={`z-50 fixed inset-x-0 bottom-0 p-4 bg-white rounded-t-lg shadow-lg transform transition-transform flex flex-col items-center justify-center ${
                    isBottomSheetOpen ? 'translate-y-0 h-64' : 'translate-y-full'
                }`}>
                {isLoading ? (
                    <div className="p-2">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <>
                        {apiResponse === ApiResponse.Success ? (
                            <div
                                className={`fixed inset-x-0 bottom-0 p-4 bg-white rounded-t-lg shadow-lg 
                    transform transition-transform flex flex-col items-center justify-center ${isBottomSheetOpen ? 'translate-y-0 h-64' : 'translate-y-full'}`}>
                                <Image src={icon_success} alt="submit" className="m-5" />
                                <div className=" text-2xl">完成送機行程</div>
                            </div>
                        ) : (
                            <div className="max-w-sm mx-auto sm:max-w-md">
                                <div className="w-full">
                                    <p className="text-2xl text-left px-4">查不到「{fields.flightNumber}」航班資訊</p>
                                    <p className="text-left px-4">
                                        請確認航班資訊、起飛時間等，你也可以直接填寫此航班作為機場接送資訊
                                    </p>
                                </div>
                                <div className="w-full flex flex-col justify-center gap-4 mt-4">
                                    <button
                                        onClick={handleSubmitAfterCheck}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-blue-500 text-white">
                                        確認航班資訊，並送出
                                    </button>
                                    <button
                                        onClick={handleFormReset}
                                        className="w-full p-2 border border-gray-300 rounded-md bg-blue-500 text-white">
                                        重新填寫
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
