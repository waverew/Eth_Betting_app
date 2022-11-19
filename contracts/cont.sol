// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.0;
contract beting {
    mapping (address => uint) private betAmount; 
    mapping(address => bool) private userBetted;
    mapping(address => bool) private userVoted;
    mapping(string => uint) private amountOfTeamVotes;
    mapping(address => string) private teamUserBetted;
    mapping(address => bool) private userWon;
    address[] public participants; // people who are betting
    string[] public teams; // teams to bet on
    string public winnerTeam;
    address[] public winners;
    address private owner;
    uint private amount;
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    modifier nonZeroValue(){
        if (!(msg.value > 0)) revert();
        _;
    } // prevents zero value calls
    modifier isOwner() {
        require (msg.sender == owner, "you are not the owner"); 
        _;
    }
    event setOwneship(address indexed oldOwner, address indexed newOwner);
    constructor(string[] memory _teams){
        teams = _teams;
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
    function makeBet(uint _amount, string memory _team) nonZeroValue public payable{
        require(userBetted[msg.sender]== false, "You already betted");
        userBetted[msg.sender] = true;
        teamUserBetted[msg.sender] = _team;
        amount += _amount;
    }
    function voteWinner(string memory _team) public{
        require(userBetted[msg.sender] == true, "You did not bet");
        require(userVoted[msg.sender] == false, "You already voted");
        userVoted[msg.sender] = true;
        amountOfTeamVotes[_team]+=1;
    }
    function getWinner() public returns (address[] memory _winner){
        for (uint i; i<participants.length; i++){
            require(userVoted[participants[i]]==true, "Everybody has to vote");
        }
        uint maxVotes = 0;
        for (uint i; i<teams.length; i++){
            if(amountOfTeamVotes[teams[i]]>maxVotes){
                maxVotes = amountOfTeamVotes[teams[i]];
                winnerTeam = teams[i];
            }
        }
        for (uint i; i<participants.length; i++){
            if (keccak256(abi.encodePacked(teamUserBetted[participants[i]])) == keccak256(abi.encodePacked(winnerTeam))){
                if(userWon[participants[i]] == false){
                    userWon[participants[i]] = true;
                    winners.push(participants[i]);
                }
            }
        }
        return winners;
    }
    function transferAmount() public isOwner{
        uint bal = address(this).balance;
        for(uint i = 0; i<winners.length;i++){
            (bool sent, ) = payable(winners[i]).call{value: (bal/winners.length - 10000000000000000)}("");
            require(sent, "Failed to send Ether");
        }
        selfdestruct(payable(owner));
    }
}