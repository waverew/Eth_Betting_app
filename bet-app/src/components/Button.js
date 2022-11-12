import { useState } from "react";
import "./Button.css";
const Button = () =>{
const [team, setTeam] = useState("");
const [amount, setAmount] = useState("");
const state = {
    team:"",
    amount:""
}
    return(
        <div className="butt">
            <div>
                <div className="cont">
                    <label>
                    Enter team name:
                        <input type="text" value={team} onChange={(e)=>{setTeam(e.target.value)}} className="cont"/>
                    </label>
                    <br/>
                    <label>
                    Enter bet amount:
                        <input type="text" value={amount} onChange={(e)=>{setAmount(e.target.value)}} className="cont"/>
                    </label>
                </div>
            
                <p>{team}</p>
                <div className="b">
                    <button onClick={()=>{
                        state.team=team; 
                        state.amount=amount; 
                        console.log(state);
                        window.localStorage.setItem("", JSON.stringify(state)); 
                        console.log(window.localStorage);
                    }}>
                    Submit
                    </button>
                    <button onClick={()=>{window.localStorage.clear()}}>Clear</button>
                </div>
            </div>
        </div>
        
    )
}
export default Button;