import React, {
    Component
} from 'react';
import Layout from '../../components/Layout';
import {
    Form,
    Button,
    Input,
    Message
} from 'semantic-ui-react';
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errMessage: '',
        loading: false,
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await factory.methods.createCampaign((this.state.minimumContribution))
            .send({
                from: accounts[0],
                gas: '1000000'
            });

            Router.pushRoute('/');
        } catch(err) {
            this.setState({errMessage: err.message });
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <Layout>
                <h1>Create a Campaign</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                        label='wei'
                        labelPosition='right'
                        value={this.state.minimumContribution}
                        onChange={event =>
                            this.setState({minimumContribution: event.target.value })}/>
                    </Form.Field>
                    <Message negative error>
                        <Message.Header>Oops!</Message.Header>
                        <p>{this.state.errMessage}</p>
                    </Message>
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
                
            </Layout>
        );
    }
}

export default CampaignNew;