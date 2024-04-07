import React, { ReactNode } from 'react';
import Image from 'next/image';
import { icon_validate_alert } from '@/app/components/Image';

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: ReactNode;
    disabled?: boolean;
    multiline?: boolean;
    description?: string;
}

const InputField = ({ label, value, onChange, error, disabled, multiline, description }: Props) => {
    return (
        <div className="mt-2">
            <h2 className="text-sm my-2">{label}</h2>
            <span className="text-xs text-stone-500">{description}</span>
            {multiline ? (
                <textarea
                    rows={4}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md ${disabled ? 'text-stone-300' : 'text-stone-950'}`}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md ${disabled ? 'text-stone-300' : 'text-stone-950'}`}
                />
            )}
            {error && (
                <div className="text-red-600 text-sm flex flex-row items-center py-1">
                    <div className="inline-block m-1">
                        <Image src={icon_validate_alert} alt="validate error" width={15} height={15} />
                    </div>
                    {error}
                </div>
            )}
        </div>
    );
};

export default InputField;
