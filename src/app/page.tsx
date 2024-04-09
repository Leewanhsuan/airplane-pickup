'use client'; // This is a client component
import { useState } from 'react';
import useFlightData from '@/app/hooks/useFlightData';
import useFormState from '@/app/hooks/useFormState';
import InputField from '@/app/components/inputField';
import { findFlightByNumber } from '@/app/service/flightFormat';
import { ApiResponse } from '@/app/utils/status';
import ButtonSheet from '@/app/components/ButtonSheet';

const Home = () => {
    const { data, error, isLoading } = useFlightData();
    const { fields, errors, handleChange, validate, resetFields } = useFormState();

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse>(ApiResponse.Idle);

    const closeBottomSheetAndReset = (milliseconds: number) => {
        setTimeout(() => {
            setIsBottomSheetOpen(false);
            resetFields();
        }, milliseconds);
    };

    const handleSubmitAndCheck = () => {
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
            closeBottomSheetAndReset(3000);
        } else {
            setApiResponse(ApiResponse.NotFound);
        }
    };

    const handleSubmitAfterCheck = () => {
        setApiResponse(ApiResponse.Success);
        closeBottomSheetAndReset(3000);
    };

    const handleFormReset = () => {
        resetFields();
        setIsBottomSheetOpen(false);
    };

    return (
        <div
            className="flex flex-col bg-gray-100"
            style={{ height: '100vh', maxHeight: '-webkit-fill-available', overscrollBehavior: 'none', overflowY: 'hidden' }}>
            <header className=" bg-secondary-blue p-4" style={{ height: '8vh' }}>
                <div className="max-w-sm mx-auto sm:max-w-md text-center">
                    <p className="text-lg font-bold text-white">送機行程</p>
                </div>
            </header>
            <main className="flex-grow overflow-auto" style={{ height: '82vh' }}>
                <div className="max-w-sm mx-auto p-4 sm:max-w-md">
                    <div className="mb-4">
                        <h2 className="mt-4 font-semibold ">送機計畫</h2>
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
            <footer className=" bg-white p-4" style={{ height: '10vh' }}>
                <div className="max-w-sm mx-auto sm:max-w-md h-full flex items-center">
                    <button
                        className="w-full p-2 border border-gray-300 rounded-md bg-main-blue text-white"
                        onClick={handleSubmitAndCheck}>
                        下一步
                    </button>
                </div>
            </footer>
            {isBottomSheetOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
            <ButtonSheet
                isBottomSheetOpen={isBottomSheetOpen}
                isLoading={isLoading}
                apiResponse={apiResponse}
                fields={fields}
                handleSubmitAfterCheck={handleSubmitAfterCheck}
                handleFormReset={handleFormReset}
            />
        </div>
    );
};

export default Home;
