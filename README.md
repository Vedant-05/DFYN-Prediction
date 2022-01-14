Token Price Prediction Market Factory
-------------------------------------

This project demonstrates the ability to scale token price prediction markets. It uses the native token price prediction game contract of DFYN protocol and introduces minor changes to try to scale the game to different tokens. 

It has 2 directories: 

*TokenNativePredMarkets 
*TokenTokenPredMarkets

TokenNativePredMarkets
-----------------------

This allows us to create a token price prediction market for which betting is done in native currency.



TokenTokenPredMarkets
----------------------

This allows us to create two kinds of price prediction markets.

* tokenPred = tokenStaked
=>  The token on which prediction is made is the same as the betting token

* tokenPred != tokenStaked
=> The token on which prediction is made is different from the betting token.


-----------------------------------------------------------------------
