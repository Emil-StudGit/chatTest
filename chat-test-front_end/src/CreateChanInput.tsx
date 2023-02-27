import React, { useState } from "react";

export default function CreateChanInput({createChan}:{createChan:(value : string) => void}) {
    const [value, setValue] = useState("");

    return (
        <>
            <input
                onChange={(e) => setValue(e.target.value)}
                placeholder="..."
                value={value}
            />
            <button onClick={() => createChan(value)}>Create Channel</button>
        </>
    )
}