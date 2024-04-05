interface Props {
    label: string;
}

const InputField = ({ label }: Props) => {
    return (
        <div className="mt-2">
            <h2 className="text-sm my-2">{label}</h2>
            <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></input>
        </div>
    );
};

export default InputField;
