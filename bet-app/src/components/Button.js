import { useState } from "react";
const Button = () =>{
const [s, setS] = useState(null);
var state = {
    team:null,
    amount:null
}
const handleSubmit = (event)=>{
    setS(event);
    console.log(state);
    console.log(s);

    
}
    return(
        <form >
            <label>
                Enter team name
                <input type="text" value={state.team} onInput={()=>{handleSubmit()}}/>
            </label>
            <label>
                Enter bet amount
                <input type="text" value={state.amount} onInput={()=>{handleSubmit()}}/>
            </label>
            <input type="submit"/>

        </form>
    )
}
export default Button;