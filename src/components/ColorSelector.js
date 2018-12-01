import React, { Component } from "react";
import { CirclePicker } from "react-color";

export default class ColorSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: false
		};
	}

	componentDidMount() {
		//remove when live
		this.toggleFullScreen();
	}

	toggleFullScreen = () => {
		if (
			window.innerWidth < 800 &&
			!window.screenTop &&
			!window.screenY &&
			!/iPhone|iPad|iPod/i.test(navigator.userAgent)
		) {
			let doc = window.document;
			let docEl = doc.documentElement;

			let requestFullScreen =
				docEl.requestFullscreen ||
				docEl.mozRequestFullScreen ||
				docEl.webkitRequestFullScreen ||
				docEl.msRequestFullscreen;
			let cancelFullScreen =
				doc.exitFullscreen ||
				doc.mozCancelFullScreen ||
				doc.webkitExitFullscreen ||
				doc.msExitFullscreen;

			if (
				!doc.fullscreenElement &&
				!doc.mozFullScreenElement &&
				!doc.webkitFullscreenElement &&
				!doc.msFullscreenElement
			) {
				requestFullScreen.call(docEl);
			} else {
				cancelFullScreen.call(doc);
			}
		}
	};

	toggler = () => {
		this.setState((prevState) => {
			return {
				toggle: !prevState.toggle
			};
		});
	};

	render() {
		const { toggle } = this.state;
		return (
			<div className="button-container">
				{toggle ? (
					<div onClick={this.toggler}>
						<CirclePicker
							onChange={this.props.selectColor}
							className="color-swatch"
							color={this.props.currentColor}
						/>
					</div>
				) : null}
				<div className="clear">
					<button onClick={this.props.clearBoard}>Clear</button>
				</div>
				<div className="fullscreen-mode">
					<button
						onClick={() => {
							this.toggleFullScreen();

							this.props.leave();
							this.props.leaveRoom();
						}}>
						Leave Room
					</button>
					<button onClick={this.toggler}>
						{this.state.toggle ? "Hide Colors" : "Show Colors"}
					</button>
				</div>
			</div>
		);
	}
}
