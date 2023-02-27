import React, { useState } from "react";

export default function JoinChanInput({joinChan}:{joinChan:(value : string) => void}) {
    const [value, setValue] = useState("");

    return (
        <>
            <input
                onChange={(e) => setValue(e.target.value)}
                placeholder="..."
                value={value}
            />
            <button onClick={() => joinChan(value)}>Join Channel</button>
        </>
    )
}