const {web3} = require("@openzeppelin/test-helpers/src/setup");
const {expectRevert} = require("@openzeppelin/test-helpers");

const PredMarketFactory = artifacts.require("PredMarketFactory.sol");

contract("PredMarketFactory", (accounts) => {
    const [owner, tokenPred, tokenStaked, oracle] = 
            [accounts[0],accounts[1], accounts[2], accounts[3]];

    let predMarketFactory;

    beforeEach(async() => {
        predMarketFactory = await PredMarketFactory.new({from: accounts[0]});
    });

    it("Doesn't do anything", async() => {
        const _owner = await predMarketFactory.owner();
        assert(_owner === accounts[0]);
    });

    it("Deploys a market", async() => {
        let add = await predMarketFactory.markets(tokenPred, tokenStaked);
        assert(add === "0x0000000000000000000000000000000000000000");
        await predMarketFactory.createMarket(
            tokenPred,
            tokenStaked,
            oracle,
            owner,
            owner,
            900,
            60,
            web3.utils.toWei("1"),
            60
        );
        add = await predMarketFactory.markets(tokenPred, tokenStaked);
        console.log(add);
        assert(add != "0x0000000000000000000000000000000000000000");
    });

    it("Doesn't deploy a market twice", async() => {
        await predMarketFactory.createMarket(
            tokenPred,
            tokenStaked,
            oracle,
            owner,
            owner,
            900,
            60,
            web3.utils.toWei("1"),
            60
        );
        
        await expectRevert(
            predMarketFactory.createMarket(
                tokenPred,
                tokenStaked,
                oracle,
                owner,
                owner,
                900,
                60,
                web3.utils.toWei("1"),
                60
            ),
            "Already deployed"
        );
    });

    it("Does not deploy if not the owner", async() => {
        await expectRevert(
            predMarketFactory.createMarket(
                tokenPred,
                tokenStaked,
                oracle,
                owner,
                owner,
                900,
                60,
                web3.utils.toWei("1"),
                60,
                {from: accounts[2]}
            ),
            "Only owner function"
        );
    });
});