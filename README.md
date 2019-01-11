# Draw Things

## technologies

- react.js
- socket.io
- canvas
- express
- SCSS

# Getting started

Clone the repo onto your local machine

`cd` into the project directory

step 1.)

```js
npm install
```

step 2.) navigate to `/src/components/WhiteBoard.js` and enter your local IP address as the connection string with the correct protocol and port (the default port is 4010)

example

```js
const socket = socketIOClient("http://192.168.1.5:4010");
```

step 3.)

to start the react dev server

```js
npm start
```

to start the express server

```js
node server/index.js
```

step 4.)

Anyone on your same Local Network will be able to join and draw together by navigating to the host machines IP address at port 4010 in any browser connected to the same network.

example:
`http://192.168.1.5:4010`
