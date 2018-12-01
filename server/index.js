const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`));
let onlineCount = 0;

let users = [];

io.sockets.on("connection", (socket) => {
	let addedToList = false;
	let color;
	let room;
	let currentUsersInRoom;

	socket.on("join", (join) => {
		if (addedToList) return;
		onlineCount++;
		join.id = onlineCount;
		addedToList = true;
		color = "red";
		room = join.room;
		join.color = color;
		users.push(join);
		socket.join(join.room);
		socket.userId = join.id;
		socket.emit("joined", join);
		currentUsersInRoom = users.filter((user) => {
			if (user.room === room) {
				return user;
			}
		});

		io.in(room).emit("users", currentUsersInRoom);
	});

	socket.on("drawing", (data) => {
		socket.in(data.room).emit("drawing", data);
	});

	socket.on("color-change", (data) => {
		currentUsersInRoom = users.filter((user) => {
			if (user.room === data.room) {
				if (user.id === data.id) {
					color = data.color;
					user.color = data.color;
				}
				return user;
			}
		});
		io.in(data.room).emit("users", currentUsersInRoom);
	});

	socket.on("leaveroom", (data) => {
		addedToList = false;
		users = users.filter((user) => {
			if (user.id !== socket.userId) {
				return user;
			}
		});
		let currentUsersInThisRoom = users.filter((user) => {
			if (user.room === data.room) {
				if (user.id !== socket.userId) {
					return user;
				}
			}
		});
		currentUsersInRoom = [];
		io.in(data.room).emit("users", currentUsersInThisRoom);
	});

	socket.on("clear", (clear) => {
		io.in(clear).emit("cleared", clear);
	});

	socket.on("disconnect", () => {
		addedToList = false;

		users = users.filter((user) => {
			if (user.id !== socket.userId) {
				return user;
			}
		});

		currentUsersInRoom = users.filter((user) => {
			if (user.room === room) {
				return user;
			}
		});

		io.in(room).emit("users", currentUsersInRoom);
	});
});

const path = require("path");
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

const PORT = 4010;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
