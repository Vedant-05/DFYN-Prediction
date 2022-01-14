pragma solidity ^0.8.0;
import './PredMarket.sol';

contract PredMarketFactory{

    address public owner;

    //tokensPred + tokenStaked => market contract
    mapping(address => mapping(address => address)) public markets;

    event MarketCreated(
        address indexed tokenPred, 
        address indexed tokenStaked
        );

    constructor(){
        owner = msg.sender;
    }

    function createMarket(
        address _tokenPred,
        address _tokenStaked,
        address _oracle,
        address _admin,
        address _operator,
        uint256 _interval,
        uint256 _buffer,
        uint256 _minBetAmount,
        uint256 _oracleUpdateAllowance
    )
    external
    onlyOwner
    {
        require(
            markets[_tokenPred][_tokenStaked] == address(0), 
            "Already deployed"
            );
        
        PredMarket pred = new PredMarket(
            _tokenPred,
            _tokenStaked,
            _oracle,
            _admin,
            _operator,
            _interval,
            _buffer,
            _minBetAmount,
            _oracleUpdateAllowance
        );

        markets[_tokenPred][_tokenStaked] = address(pred);

        emit MarketCreated(_tokenPred, _tokenStaked);

    }

    function changeOwner(address _owner) public onlyOwner{
        owner = _owner;
    }

    modifier onlyOwner{
        require(owner == msg.sender, "Only owner function");
        _;
    }
    
}