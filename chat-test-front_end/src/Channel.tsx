import React from "react";

export default function Channel({channels}:{channels : Map<string, string[]>}) {
    const chanJoined : string[] = [];
    channels.forEach((c, k) => {
        chanJoined.push(k)
    });

    return (
        <div>
            {chanJoined.map((message, index) => (
                <div key={index}>{message}</div>
            ))}
        </div>
    )
}