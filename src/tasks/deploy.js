import config from '../config/config';

import Web3 from 'web3';
import fs from 'fs';

export async function deployContract(web3, creatorAccount, contractJson) {    
  const contract = new web3.eth.Contract(contractJson.abi);

  const constractInstance = contract.deploy({
    data: contractJson.bytecode
  });

  const transaction = await constractInstance.send({
    from: creatorAccount.address,
    gas: config.defaultGas,
    gasPrice: config.defaultGasPrice
  });

  contract.options.address = transaction.options.address;
  
  return contract;
}

function parseContract(fileName) { 
  const contract = fs.readFileSync(fileName);  

  return JSON.parse(contract);
}

function initAccount(web3, privateKey) {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  return account;
}

async function contractTest() {  
  const web3 = new Web3(config.web3Rpc);

// key initialiation  
  const creatorAccount = initAccount(web3, config.creatorPrivateKey);
  const ownerAccount = initAccount(web3, config.ownerPrivateKey);

// contract deploy  
  const exampleContract = await deployContract(
    web3,
    creatorAccount,
    parseContract(__dirname+'/../contracts/Main.json')
  );

// top up balances
  console.log('creatorAddress:', creatorAccount.address);
  console.log('contractAddress:', exampleContract.options.address);

  let addressBalance = await web3.eth.getBalance(creatorAccount.address);
  console.log('balanceOf(creatorAddress):', web3.utils.fromWei(addressBalance));

  addressBalance = await web3.eth.getBalance(ownerAccount.address);
  console.log('balanceOf(ownerAddress)(1):', web3.utils.fromWei(addressBalance));

// send 1.0 AMB from creator to owner account  
/*  
  let txSend = await web3.eth.sendTransaction({
    from: creatorAccount.address,
    to: ownerAccount.address,
    gas: config.defaultGas,
    gasPrice: config.defaultGasPrice,
    value: web3.utils.toWei('1.0', "ether")
  });

  addressBalance = await web3.eth.getBalance(ownerAccount.address);
  console.log('balanceOf(ownerAddress)(2):', web3.utils.fromWei(addressBalance));
*/

// call exampleMethod1 as Creator
  let methodResult = await exampleContract.methods.exampleMethod1(1, 2).call();
  console.log('contract.exampleMethod1(1, 2)(creator):', methodResult);

// call TransferOwner  
  try {
    const tx01 = await exampleContract.methods.TransferOwner(ownerAccount.address).send({
      from: creatorAccount.address,
      gas: config.defaultGas,
      gasPrice: config.defaultGasPrice
    });

    console.log('result(contract.TransferOwner)(transactionHash):', tx01.transactionHash);
    console.log('result(contract.TransferOwner)(status):', tx01.status);
  } catch(error) {
    console.log('error(contract.TransferOwner):');
    throw error;
  }
     
// call exampleMethod1 as anonymous
  methodResult = await exampleContract.methods.exampleMethod1(1, 2).call();
  console.log('contract.exampleMethod1(1, 2)(creator):', methodResult);

// call exmapleMethod2 as Owner
  methodResult = await exampleContract.methods.exampleMethod2(1, 2).call({
    from: ownerAccount.address,
    gas: config.defaultGas,
    gasPrice: config.defaultGasPrice
  });
  console.log('contract.exampleMethod2(1, 2)(owner):', methodResult);

  // call exampleMethod2 as anonymous - error generated here because ownership was transfered
  // methodResult = await exampleContract.methods.exampleMethod2(1, 2).call();
  // console.log('contract.exampleMethod2(1, 2)(creator):', methodResult);
}

contractTest();