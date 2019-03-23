pragma solidity ^0.4.17;

contract CampaignFactory {
    Campaign[] deployedCampaigns;
    
    function createCampaign(uint min) public {
        Campaign newCompaign = new Campaign(min, msg.sender);
        deployedCampaigns.push(newCompaign);
    }
    
    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    constructor(uint min, address creator) public {
       manager = creator;
       minimumContribution = min;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        if (approvers[msg.sender] == false) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;  //The other codes to be replace here
    }
    
    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
