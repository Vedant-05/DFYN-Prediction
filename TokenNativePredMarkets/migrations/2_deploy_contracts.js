require('dotenv').config();
const PredMarketFactory = artifacts.require("PredMarketFactory.sol");
const admin = process.env.ADMIN;
const operator = process.env.OPERATOR;

const weth = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
const wbtc = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6";

const ethOracle = "0xF9680D99D6C9589e2a93a78A04A279e509205945";
const btcOracle = "0xc907E116054Ad103354f2D350FD2514433D57F6f";


module.exports = async function (deployer, _network) {
    
    if(_network === "matic"){
        await deployer.deploy(PredMarketFactory);

        const predMarketFactory = await PredMarketFactory.deployed();
        
        //Deploy ETH prediction market with native token as staking token
        await predMarketFactory.createMarket(
            weth, 
            ethOracle,
            admin,
            operator,
            900,
            60,
            web3.utils.toWei("1"),
            60
            );

        const ethMarketAdd = await predMarketFactory.markets(weth);
        console.log("ETH prediction market deployed at address :" + ethMarketAdd);

        //Deploy BTC prediction market with native token as staking token
        await predMarketFactory.createMarket(
            wbtc, 
            btcOracle,
            admin,
            operator,
            900,
            60,
            web3.utils.toWei("1"),
            60
            );
            
        const btcMarketAdd = await predMarketFactory.markets(wbtc);
        console.log("BTC prediction market deployed at address :" + btcMarketAdd);

    }
};
