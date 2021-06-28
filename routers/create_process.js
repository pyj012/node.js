var express = require('express')
var router = express.Router()
 
router.get('/', function(req, res, next){
     res.send('title : ' + req.body.title)
     console.log('title : ' + req.body.title)
})

module.exports=router;