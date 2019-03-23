import React, {
    Component
} from 'react';
import Layout from '../../../components/Layout';
import {
    Form,
    Button,
    Input,
    Message
} from 'semantic-ui-react';
import factory from '../../../ethereum/factory'
import web3 from '../../../ethereum/web3';
import { Router, Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';

class RequestNew extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        errMessage: '',
        loading: false,
    }

    static async getInitialProps(props) {
        const {address} = props.query;

        return {address};
    }

    onSubmit = async (event) => {
        event.preventDefault()

        this.setState({loading: true, errMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = new Campaign(this.props.address);
            const { description, value, recipient } = this.state;

            await campaign.methods.createRequest(description, 
                web3.utils.toWei(value, 'ether'), recipient)
                .send({from: accounts[0]});
        } catch (err) {
            this.setState({errMessage: err.message});
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <Layout>
                <Link route={'/campaigns/'+this.props.address+'/requests'}>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                        value={this.state.description}
                        onChange={event => this.setState({description: event.target.value })}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Value</label>
                        <Input 
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value })}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                        value={this.state.recipient}
                        onChange={event => this.setState({recipient: event.target.value })}/>
                    </Form.Field>
                    <Message negative error>
                        <Message.Header>Oops!</Message.Header>
                        <p>{this.state.errMessage}</p>
                    </Message>
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;