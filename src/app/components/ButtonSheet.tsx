import { ApiResponse } from '@/app/utils/status';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import Image from 'next/image';
import { icon_success } from '@/app/components/Image';
import { FormFields } from '@/app/hooks/useFormState';

interface Props {
    isBottomSheetOpen: boolean;
    isLoading: boolean;
    apiResponse: ApiResponse;
    fields: FormFields;
    handleSubmitAfterCheck: () => void;
    handleFormReset: () => void;
}

const ButtonSheet = ({ isBottomSheetOpen, isLoading, apiResponse, fields, handleSubmitAfterCheck, handleFormReset }: Props) => {
    return (
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
                                    className="w-full p-2 border border-gray-300 rounded-md bg-main-blue text-white">
                                    確認航班資訊，並送出
                                </button>
                                <button
                                    onClick={handleFormReset}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-main-blue text-white">
                                    重新填寫
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ButtonSheet;
