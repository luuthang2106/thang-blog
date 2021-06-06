// server.js
const next = require('next')
const express = require('express')
const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const {sequelize} = require('./database/db')

const tagRoute = require('./apis/tag')
const postRoute = require('./apis/post')
const staticRoute = require('./apis/io')
app.prepare().then(async () => {
  const server = express();

  server.use(express.json());

  await sequelize.sync();

  server.use('/api', tagRoute)
  server.use('/api', postRoute)
  server.use('/api', staticRoute)

  server.get("*", (req, res) => {
      return handle(req, res);
  })
  server.listen(port, () => {
      console.log('App is runing on port ', port);
  })

}).catch((error) => {
  console.log(error);
  process.exit(1);
})