const express = require('express')
const app = express()
const port = 3050

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})