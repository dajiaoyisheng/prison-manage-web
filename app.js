var app = require('express')();
// var app = express();
// var Mock = require('mockjs');
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8081, function () {
  console.log((new Date()) + ' Server is listening on port 8081');
});

wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', function (reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});











//设置跨域访问
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1');
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// app.get('/getPrisonersData', function (req, res) {
//   res.send({
//     "status": 0,
//     "statusinfo": "",
//     "data": {
//       "personnum": "3789",
//       "data": [{
//           area: "监区一",
//           pNumItem: "234"
//         },
//         {
//           area: "监区二",
//           pNumItem: "234"
//         },
//         {
//           area: "监区三",
//           pNumItem: "234"
//         },
//         {
//           area: "监区四",
//           pNumItem: "234"
//         },
//         {
//           area: "监区五",
//           pNumItem: "234"
//         },
//         {
//           area: "监区六",
//           pNumItem: "234"
//         },
//         {
//           area: "监区七",
//           pNumItem: "234"
//         },
//         {
//           area: "监区八",
//           pNumItem: "234"
//         },
//         {
//           area: "监区九",
//           pNumItem: "234"
//         },
//         {
//           area: "监区十",
//           pNumItem: "234"
//         }
//       ]
//     }
//   });
// });
// app.get('/getBenchChartPie', function (req, res) {
//   res.send({
//     "status": 0,
//     "statusinfo": "",
//     "data": {
//       columns: ['date', 'PV', 'Order', 'OrderRate'],
//       rows: [
//         { 'date': '1/1', 'PV': 1393, 'Order': 1093, 'OrderRate': 0.32 },
//         { 'date': '1/2', 'PV': 3530, 'Order': 3230, 'OrderRate': 0.26 },
//         { 'date': '1/3', 'PV': 2923, 'Order': 2623, 'OrderRate': 0.76 },
//         { 'date': '1/4', 'PV': 1723, 'Order': 1423, 'OrderRate': 0.49 },
//         { 'date': '1/5', 'PV': 3792, 'Order': 3492, 'OrderRate': 0.323 },
//         { 'date': '1/6', 'PV': 4593, 'Order': 4293, 'OrderRate': 0.78 }
//       ]
//     }
//   });
// });
// app.get('/getBenchChartbarData', function (req, res) {
//   res.send({
//     "status": 0,
//     "statusinfo": "",
//     "data": {
//       columns: ['日期', '访问用户'],
//       rows: [
//         { '日期': '1/1', '访问用户': 1393 },
//         { '日期': '1/2', '访问用户': 3530 },
//         { '日期': '1/3', '访问用户': 2923 },
//         { '日期': '1/4', '访问用户': 1723 },
//         { '日期': '1/5', '访问用户': 3792 },
//         { '日期': '1/6', '访问用户': 4593 }
//       ]
//     }
//   });
// });
// app.get('/prisonersStutas', function (req, res) {
//   res.send({
//     "status": 0,
//     "statusinfo": "",
//     "data": {
//       "personnum": "3789",
//       "data": [{
//           area: "监区一",
//           pNumItem: "234"
//         },
//         {
//           area: "监区二",
//           pNumItem: "234"
//         },
//         {
//           area: "监区三",
//           pNumItem: "234"
//         },
//         {
//           area: "监区四",
//           pNumItem: "234"
//         },
//         {
//           area: "监区五",
//           pNumItem: "234"
//         },
//         {
//           area: "监区六",
//           pNumItem: "234"
//         },
//         {
//           area: "监区七",
//           pNumItem: "234"
//         },
//         {
//           area: "监区八",
//           pNumItem: "234"
//         },
//         {
//           area: "监区九",
//           pNumItem: "234"
//         },
//         {
//           area: "监区十",
//           pNumItem: "234"
//         }
//       ]
//     }
//   });
// });
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
