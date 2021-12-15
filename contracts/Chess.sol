//SPDX-License-Identifier: MIT
// inspired from russian roulette - https://openquest.xyz/?github_url=https://raw.githubusercontent.com/CreatorOS/Building-a-Russian-Roulette-dapp-on-Ethereum/main
// polygon contract address - https://mumbai.polygonscan.com/tx/0xc0a3af48a31235ebcd6d7e7c1cce76f973a1b42f6217ed841e823827e934e196
pragma solidity  0.8.10; 

contract Chess {
    
    address payable [2] players;
    uint8 index = 0;
    uint turn = 0;
    bool finished = false;

    constructor () {
        turn = uint(keccak256(abi.encodePacked(
        block.difficulty,
        block.timestamp,
        block.number,
        players))) % 2;
        }
    
    function register() public payable {
        require (index < 2);
        require (msg.value >= 0.00005 ether);
        players[index] =payable(msg.sender);
        index++;
        if(index == 2){
            finished = false;
        }
    }
    
    event GameOver (address loser);
    
    modifier isSenderTurn () {
        require(msg.sender == players[turn]);
        _;
    }
    
    modifier gameNotFinished(){
        require(finished == false);
        _;
    }
    
    function move(uint8 moveType) public gameNotFinished isSenderTurn{
        // 0 - not ended, 1 - ended, 2 - someone cheated
        if (moveType == 1) {
            emit GameOver(players[(turn + 1) % 2]);
            players[ (turn + 1) % 2].transfer(
                address(this).balance);
            players[0] = players [1] = payable(0);
            index = 0;
            finished = true;
        }
        if (moveType == 2) {
            emit GameOver(payable(0));
            players[turn].transfer(
                address(this).balance/2);
            players[ (turn + 1) % 2].transfer(
                address(this).balance/2);
            players[0] = players [1] = payable(0);
            index = 0;
            finished = true;
        }
        turn = (turn + 1) % 2;
        }
    
    function getTurn () public view returns (address) {
        return players[turn];
    }
    
    function isFinished () public view returns (bool) {
        return finished;
    }
}