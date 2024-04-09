import { useState } from 'react';

interface FormErrors {
    airport?: string;
    flightNumber?: string;
    name?: string;
    phone?: string;
    idOrPassport?: string;
    remarks?: string;
}

export interface FormFields {
    airport: string;
    flightNumber: string;
    name: string;
    phone: string;
    idOrPassport: string;
    remarks: string;
}

interface FieldValidation {
    [key: string]: {
        regex: RegExp;
        errorMessage: string;
    };
}

const initialValues = {
    airport: '桃園國際機場 第一航廈',
    flightNumber: '',
    name: '',
    phone: '',
    idOrPassport: '',
    remarks: ''
};

const initialErrors = {
    airport: '',
    flightNumber: '',
    name: '',
    phone: '',
    idOrPassport: ''
};

const fieldValidations: FieldValidation = {
    flightNumber: {
        regex: /^[A-Za-z0-9]+$/,
        errorMessage: '格式錯誤，應由英文數字組成'
    },
    name: {
        regex: /^[A-Za-z ]+$/,
        errorMessage: '格式錯誤，請填寫與護照姓名相同的英文姓名'
    },
    phone: {
        regex: /^\d{10}$/,
        errorMessage: '格式錯誤，應由數字組成 ex.0912345678'
    },
    idOrPassport: {
        regex: /^[A-Za-z0-9]+$/,
        errorMessage: '格式錯誤，應由英文數字組成'
    }
};

const useFormState = () => {
    const [fields, setFields] = useState<FormFields>(initialValues);
    const [errors, setErrors] = useState<FormErrors>(initialErrors);

    const validate = () => {
        let isValid = true;
        const newErrors: FormErrors = {};

        Object.entries(fieldValidations).forEach(([field, { regex, errorMessage }]) => {
            const value = fields[field as keyof FormFields];
            if (!value.trim()) {
                newErrors[field as keyof FormErrors] = '請填入資訊';
                isValid = false;
            } else if (!regex.test(value)) {
                newErrors[field as keyof FormErrors] = errorMessage;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (field: string, value: string) => {
        setFields((prev) => ({ ...prev, [field]: value }));
    };

    const resetFields = () => {
        setFields(initialValues);
        setErrors(initialErrors);
    };

    return { fields, errors, handleChange, validate, resetFields };
};

export default useFormState;
