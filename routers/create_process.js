var express = require('express')
var router = express.Router()
 
router.get('/', function(req, res){
     res.send('title : ' + req.body.title)
     console.log('title : ' + req.body.title)
})

module.exports=router;