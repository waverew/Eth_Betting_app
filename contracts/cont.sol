// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.0;
contract beting {
    mapping (address => uint) public bets;
    address private owner;
    uint private amount;
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    modifier nonZeroValue(){
        if (!(msg.value > 0)) revert();
        _;
    }
    modifier isOwner() {
        require (msg.sender == owner, "you are not the owner");
        _;
    }
    event setOwneship(address indexed oldOwner, address indexed newOwner);
    constructor(){
        owner = msg.sender;
        emit setOwneship(address(0), owner);
    }
    function transferOwneship(address newOwner) public isOwner{
        emit setOwneship(owner, newOwner);
        owner = newOwner;
    }
    receive() external payable nonZeroValue{
        amount += msg.value/1 ether;
    }

    fallback() external payable nonZeroValue{
        amount += msg.value/ 1 ether;
    }
    function makeBet(uint _amount) public{
        bets[msg.sender] += _amount;
        amount+=_amount;
    }

    


}