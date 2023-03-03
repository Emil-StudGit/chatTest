import React, { useState } from "react";

export default function ToggleChanInput({toggleChan}:{toggleChan:(value : string) => void}) {
    const [value, setValue] = useState("");

    return (
        <>
            <input
                onChange={(e) => setValue(e.target.value)}
                placeholder="..."
                value={value}
            />
            <button onClick={() =>toggleChan(value)}>Select Channel</button>
        </>
    )
}