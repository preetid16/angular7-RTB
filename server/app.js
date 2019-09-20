const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json());
app.use("/",expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth']}));

app.post('/api/auth', function(req, res) {
    
    const body = req.body;
    
    var token = jwt.sign({userID: req.username}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
    res.send({token});
});

app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});
