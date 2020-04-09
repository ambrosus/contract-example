# contract-example
example of how to use smart contracts in ambrosus network

# files
\contracts\example\example.sol - simple contract with example methods

TransferOwner(address) - transfer ownership, only owner can call

exampleMethod1(v1, v2) - adds v1+v2, anyone can call

exampleMethod2(v1, v2) - adds v1+v2, only owner can call

prod.env - variables for example

\contract-example\src\tasks\deploy.js - example of how to deploy and call methods

# usage
1. change deploy parameters in prod.env (replace example adresses WEB3_CREATOR_PRIVATEKEY and WEB3_OWNER_PRIVATEKEY with your own)
2. make sure addresses for WEB3_CREATOR_PRIVATEKEY and WEB3_OWNER_PRIVATEKEY have at least 1 AMB each
3. execute:
	yarn build:sol
	yarn deploy

