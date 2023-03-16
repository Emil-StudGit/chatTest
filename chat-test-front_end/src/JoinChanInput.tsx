import React, { useState } from "react";

export default function JoinChanInput(props: {joinChan: (value : string) => void, publicChans: string[]}) {
    const [value, setValue] = useState("");
    //TO DO : add password field + auto select 1st option if exist

    return (
        <>
            <select onChange={(e) =>setValue(e.target.value)}>
            {props.publicChans.map(arrayChan => <option value={arrayChan}>{arrayChan}</option>)}
            </select>
            <input
                onChange={(e) => setValue(e.target.value)}
                placeholder="select channel"
                value={value}
            />
            <button onClick={() => props.joinChan(value)}>Join Channel</button>
        </>
    )
}