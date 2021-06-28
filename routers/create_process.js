var express = require('express')
var router = express.Router()



router.post('/', function(req, res, next){
     var title=req.body.title
     var description=req.body.description
     /*db.query(`INSERT INTO portfolio_item (title, description) 
     VALUES(?, ?)`,[title,description])*/
    
      

     
})

module.exports=router;