// import path from "path";
import * as express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

const app = express.default(); // Creates a server and calls it app 

const port = 3000;
app.listen(port); // Set the server's port to 3000
console.log("Server running on http://localhost:" + port); 

// const htmlFile = path.join(__dirname, "public", "index.html"); // path to file located in "./public/index.html"
// app.get("/", (request, result) => {
//   console.log("Recieved a request and sending index.hmtl"); // outputs to console
//   result.sendFile(htmlFile); // sends file to client
// });

const config = require("../webpack.config.js");
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: "/"
}));