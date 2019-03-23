const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
require('./config')

let provider;

if (global.gLocalTest) {
  console.log('Deploy on local node');
  provider = new Web3.providers.HttpProvider(
    'http://localhost:7545'
  );
} else {
  console.log('Deploy on remote node');
  provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/b035af3b15a7449788b306f5247aa07f'
  );
}

const web3 = new Web3(provider);

const deploy = async () => {
  // Get a list of all accounts
  const accounts = await web3.eth.getAccounts();
  console.log('Attempt to deploy from', accounts[0]);
  // Use one of those accounts to deploy the contract
  const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });
  
  console.log('Contract deployed to', result.options.address);
  // ADD THIS ONE LINE RIGHT HERE!!!!! <---------------------
  //result.setProvider(provider);
};

deploy();