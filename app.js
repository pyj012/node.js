var express=require('express')
var ejs=require('ejs')
var qs = require('querystring');
var app=express()
var port=3000
var mysql = require('mysql');
const { error } = require('console');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qkrdudwns1',
  database:'portfolio'
})

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(express.static(__dirname+'/public'))
app.get('/',function(req,res){
    db.query(`SELECT * FROM portfolio_item`, function(error,portfolio_item){
    var title=`박영준의 포트폴리오`
    var head1='환영합니다'
    var head2='포기하지 않기 - 매우놀라운 - 노력하는'
    
    console.log('portfolio_item.length'+ portfolio_item.length)
    var list =''
    var i = 0
    var portfolio=''
    var n = 0
    while(i < portfolio_item.length)
    {
     list = list + `<div class="portfolio-modal modal fade" id="portfolioModal${portfolio_item[i].id}" tabindex="-1" aria-labelledby="portfolioModal1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
          <div class="modal-content">
              <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
              <div class="modal-body text-center pb-5">
                  <div class="container">
                      <div class="row justify-content-center">
                          <div class="col-lg-8">
                              <!-- Portfolio Modal - Title-->
                              <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">${portfolio_item[i].title}</h2>
                              <!-- Icon Divider-->
                              <div class="divider-custom">
                                  <div class="divider-custom-line"></div>
                                  <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                  <div class="divider-custom-line"></div>
                              </div>
                              <!-- Portfolio Modal - Image-->
                              <img class="img-fluid rounded mb-5" src="/assets/img/portfolio/cabin.png" alt="..." />
                              <!-- Portfolio Modal - Text-->
                              <p class="mb-4">${portfolio_item[i].description}</p>
                              <button class="btn btn-primary" href="#!" data-bs-dismiss="modal">
                                  <i class="fas fa-times fa-fw"></i>
                                  Close Window
                              </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      ` 
    portfolio=portfolio + `<div class="col-md-6 col-lg-4 mb-5">
        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal${portfolio_item[i].id}">
                <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                    <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="/assets/img/portfolio/cabin.png" title="cabin" alt="..." />
            </div>
        </div>
    `
      console.log('portfoliomodal : '+portfolio_item[i].id)
      console.log('portfolio_item'+i+'.id = '+ portfolio_item[i].id)
      console.log('portfolio_item'+i+'.title = '+ portfolio_item[i].title)
      console.log('portfolio_item'+i+'.description = '+portfolio_item[i].description)
      i = i+1
    }
    
    res.render('index.ejs',{
        list:list,
        portfolio:portfolio,
        title:title,
        h1:head1,
        h2:head2
    })
  })
})
app.get('/create',function(req,res){
    db.query(`SELECT * FROM portfolio_item`, function(error,portfolio_item){
        res.render('create.ejs',{
            
        })
        
    })
      
})
app.get('/create_process',function(req,res){ 
    app.get('/create.ejs',function(req,res){
        var title=req.title
        var description=req.description
        console.log(title, description)
        db.query(`INSERT INTO portfolio_item (title, description) VALUES(?, ?)`,[title, description],
        function(err,result){
           
            res.render('index.ejs',{ 

            })
            
        })
    })     
    
        
})
app.listen(port)
console.log('server start : 3000')