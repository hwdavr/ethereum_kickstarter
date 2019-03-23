import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link, Router } from  '../../../routes';
import {
    Form,
    Button,
    Input,
    Message,
    Table,
} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const {address} = props.query;
        const campaign = new Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );

        console.log(requests);

        return {address, requests, requestCount, approversCount};
    }

    onApprovedOrFinalized = () => {
        Router.pushRoute('/campaigns/'+this.props.address+'/requests');
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
            <RequestRow 
              key={index}
              id={index}
              request={request}
              address={this.props.address}
              approversCount={this.props.approversCount}
              onReload={this.onApprovedOrFinalized}
            />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={'/campaigns/'+this.props.address+'/requests/new'}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>

                <Table>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finailize</HeaderCell>
                    </Row>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>

                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        );
    }
}

export default RequestIndex;