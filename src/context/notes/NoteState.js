import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "Sonia",
        "class": "7n"
    }
    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Sonia Singh",
                "class": "first class"
            })
        }, 1000)
    }

    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;