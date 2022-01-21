pragma solidity ^0.8.0;
import './PredMarket.sol';

contract PredMarketFactory{

    address public owner;
 
    //tokens contract => market contract
    mapping(address => address) public markets;

    event MarketCreated(address indexed token, address contractAdd);

    constructor(){
        owner = msg.sender;
    }

    function createMarket(
        address _token,
        address _oracle,
        address _admin,
        address _operator,
        uint256 _interval1,
        uint256 _interval2,
        uint256 _buffer,
        uint256 _minBetAmount,
        uint256 _oracleUpdateAllowance
    )
    external
    onlyOwner
    {
        require(markets[_token] == address(0), "Already deployed");
        
        PredMarket pred = new PredMarket(
            _token,
            _oracle,
            _admin,
            _operator,
            _interval1,
            _interval2,
            _buffer,
            _minBetAmount,
            _oracleUpdateAllowance
        );

        markets[_token] = address(pred);

        emit MarketCreated(_token, address(pred));

    }

    function changeOwner(address _owner) public onlyOwner{
        owner = _owner;
    }

    modifier onlyOwner{
        require(owner == msg.sender, "Only owner function");
        _;
    }
}