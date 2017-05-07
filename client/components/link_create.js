// Show a form that a user can use to create a new link
import React, { Component } from 'react';

class LinkCreate extends Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			error: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		Meteor.call('links.insert', this.refs.link.value, (err) => {
			if(err) {
				this.setState({ error: 'You must enter a valid URL e.g https://www.example.com' });
			} else {
				this.setState({ error: '' });
				this.refs.link.value = '';
			}
		});
	}
	
	render() {
		return (
			<div className="row">
				<form className="form-inline" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label for="userLink">Link to shorten</label>
						<input type="text" ref="link" className="link-form-input form-control" placeholder="Link"/>
					</div>
					<button type="submit" className="link-form-submit btn btn-primary">Shorten!</button>
					{this.state.error.length > 1 && <div className="form-group alert alert-danger link-form-error text-danger">{this.state.error}</div>}
				</form>
			</div>
		);
	}
}

export default LinkCreate;