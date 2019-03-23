import React, {Component} from 'react';
import { 
    Form,
    Button,
    Message,
    Card,
    Grid,
} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributionForm from '../../components/ContributionForm';
import {Link} from  '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        console.log('Show campaign: ' + props.query.address);

        const campaign = new Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {  
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            address: props.query.address,
        };
    }

    renderCards() {
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
        } = this.props;

        const items = [
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'The Minimum Contribution',
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'Number of requests'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance',
                description: 'Campaign Balance',
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of Approvers',
            }
        ];

        return <Card.Group items={items}/>;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid >
                    <Grid.Row>
                        <Grid.Column width={10}>
                            { this.renderCards() }
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributionForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                        <Link route={'/campaigns/'+this.props.address+'/requests'}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }

}

export default CampaignShow;