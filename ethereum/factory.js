import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x94460bfF842930BfDF69a0A1fcB5983031479078'
);

export default instance;
