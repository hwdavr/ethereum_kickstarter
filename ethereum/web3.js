import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // In a browser and metamask is runing
    web3 = new Web3(window.web3.currentProvider);
    console.log('In a browser and metamask is runing' + web3);
} else {
    // On a server OR metamask is not running
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/b035af3b15a7449788b306f5247aa07f'
    );
    web3 = new Web3(provider);
}

export default web3;
