import './Main.css';
import { ethers } from "ethers";
import { useEffect, useRef, useState } from 'react';
import {abb} from "./ABI";
import Button from './Button';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const abi = abb;
const userKey = "boobaEilish";
const Main = () => {
    
    const getState = JSON.parse(window.localStorage.getItem(userKey));
    const [con, setCon] = useState(null);
    async function beb() {
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const bal = await provider.getBalance(address);
        console.log(ethers.utils.formatEther(bal));
        const con = new ethers.Contract("0xcED09C43F41ba7799E68576BC7B6A42971d35d32", abi, signer);
        console.log(con.address);
        setCon(con);
    }
    const amount = parseInt(getState.amount);
    console.log(amount);
    const team = (getState.team);
    console.log(team);

    /* useEffect(()=>{
        console.log(con)
    },[con])
    */

   const makeBet = (amount, name)=>{
    con.makeBet(amount, name,{value:amount});
   }
    return (
        <div className="main">
                <div className='mr'>
                    <Button userKey={userKey}/>
                </div>
                <div className="buttons-cont">
                    <div>
                    <button onClick={() => { beb() }}>
                    press
                    </button>
                    <br/>
                    <button onClick={() => {
                        makeBet(ethers.utils.parseEther("0.0000002"), "dota");
                    }}>
                    makeBet
                    </button>
                    </div>
                </div>
        </div>
    )
}
export default Main;