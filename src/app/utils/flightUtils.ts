export interface FlightData {
    FlightDate: string;
    FlightNumber: string;
    AirlineID: string;
    DepartureAirportID: string;
    ArrivalAirportID: string;
    ScheduleDepartureTime: string;
    ActualDepartureTime: string;
    EstimatedDepartureTime: string;
    DepartureRemark: string;
    Terminal: string;
    Gate: string;
    IsCargo: boolean;
    CheckCounter: string;
    UpdateTime: string;
}

interface FlightMatchResult {
    airlineID?: string;
    flightNumber?: string;
    isMatch: boolean;
}

/**
 * Finds a flight in the given flight data array based on the flight number.
 * @param flightNumber - The flight number to search for.
 * @param data - An array of flight data objects containing information about flights.
 * @returns An object indicating whether a match was found and the extracted airline ID and flight number if applicable.
 */
export const findFlightByNumber = (flightNumber: string, data: FlightData[]): FlightMatchResult => {
    // Check if the flight number matches the pattern of one or more alphabetic characters followed by one or more numeric characters
    const match = flightNumber.match(/^([A-Za-z]+)(\d+)$/);

    if (match) {
        const airlineID = match[1];
        const flightNumber = match[2];

        // Check if the airline ID and flight number exist in the flight data
        const isMatch = data.some((d) => d.AirlineID === airlineID && d.FlightNumber === flightNumber);

        if (isMatch) {
            return { airlineID, flightNumber, isMatch: true };
        }
    }

    return { isMatch: false };
};
