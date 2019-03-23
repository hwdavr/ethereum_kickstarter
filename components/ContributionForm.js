import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributionForm extends Component {
    state = {
        value: '',
        errMessage: '',
        loading: false,
    }

    onSubmit = async (event) => {
        event.preventDefault()

        this.setState({loading: true, errMessage: ''});
        const campaign = Campaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            Router.pushRoute('/');
        } catch(err) {
            this.setState({errMessage: err.message});
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                    value={this.state.value}
                    onChange={event => this.setState({value: event.target.value})}
                    label='ether' labelPosition='right'>
                    </Input>
                </Form.Field>
                <Message negative error>
                    <Message.Header>Oops!</Message.Header>
                    <p>{this.state.errMessage}</p>
                </Message>
                <Button loading={this.state.loading} primary type='submit' >
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributionForm;