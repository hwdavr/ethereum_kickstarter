import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
require('./config')

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    global.gLocalTest ? '0xcDBdBFc6D906DBF03172CbB7BF24cA650638eF86' :
    '0x94460bfF842930BfDF69a0A1fcB5983031479078'
);

export default instance;
