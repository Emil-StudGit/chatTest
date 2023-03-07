import React, { useState } from "react";

export default function JoinChanInput(props: {joinChan: (value : string) => void, publicChans: string[]}) {
    const [value, setValue] = useState("");

    return (
        <>
            <select onChange={(e) =>setValue(e.target.value)}>
            {props.publicChans.map(arrayChan => <option value={arrayChan}>{arrayChan}</option>)}
            </select>
            <input
                onChange={(e) => setValue(e.target.value)}
                placeholder="..."
                value={value}
            />
            <button onClick={() => props.joinChan(value)}>Join Channel</button>
        </>
    )
}