import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props)=> {
    const user1 = {
        "name": "mass",
        "class": "9B"
    }
    const [state, setState] = useState(user1);
    const update = () =>{
        setTimeout(() => {
            setState({
                "name": "pratik",
                "class": "B Tech"
            })
            
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;