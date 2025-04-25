// import React from "react";
import { useSelector } from "react-redux";

const EligibilityCheck = () => {
    const eligibility = useSelector((state) => state.schemes.eligibiltity);

    // Handle case where eligibility is null
    if (!eligibility) {
        return <div className="text-gray-500 text-center mt-5">Checking eligibility...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Eligibility Check</h2>

                {eligibility.reasons === null && eligibility.elibile ? (
                    <p className="text-green-600 font-medium text-lg">✅ You may be eligible!</p>
                ) : (
                    <div className="text-red-600 font-medium text-lg">
                        <p>❌ You may not eligible for the scheme due to:</p>
                        <ul className="mt-3 list-disc list-inside text-red-500">
                            {eligibility.reasons.map((reason, index) => (
                                <li key={index}>{reason}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EligibilityCheck;
