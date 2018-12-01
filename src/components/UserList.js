import React, { Component } from "react";

export default class UserList extends Component {
	render() {
		let userList = this.props.userList.map((user) => {
			return (
				<span key={user.id} style={{ color: user.color }}>
					{user.username}
				</span>
			);
		});
		return <div className="user-list">{userList}</div>;
	}
}
