import useSWR from 'swr';

const API_URL =
    'https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?$orderby=ScheduleDepartureTime&$format=JSON';
const fetcher = (...args: [input: RequestInfo, init?: RequestInit]) => fetch(...args).then((res) => res.json());

const useFlightData = () => {
    const { data, error, isValidating } = useSWR(API_URL, fetcher);

    return {
        data,
        error,
        isLoading: isValidating
    };
};

export default useFlightData;
