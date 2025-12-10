"use client";

import Script from "next/script";

const TawkTo = () => {
    const tawkId = process.env.NEXT_PUBLIC_TAWK_TO_ID;

    if (!tawkId) return null;

    return (
        <Script
            src={`https://embed.tawk.to/${tawkId}`}
            strategy="afterInteractive"
        />
    );
};

export default TawkTo;
