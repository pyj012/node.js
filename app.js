var express=require('express')
var app=express()
var fs=require('fs')
var port=3000
var mysql = require('mysql')

var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qkrdudwns1',
  database:'portfolio'
})

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/upload',function(req,res){
    var dir='./uploadedFiles'
    if(!fs.existsSync(dir)) fs.mkdirSync(dir)
})



app.get('/',function(req,res){
    db.query(`SELECT * FROM portfolio_item`, function(error,portfolio_item){
        var title=`박영준의 포트폴리오`
        var head1='환영합니다'
        var head2='포기하지 않기 - 매우놀라운 - 노력하는'
      
        var list =''
        var i = 0
        var portfolio=''
        
       
        while(i < portfolio_item.length)
        {
        var n = portfolio_item[i].id
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
                                    닫기
                                </button>
                                <a class="nofont" href="/update?id=${n}"> 
                                    <button class="btn btn-primary">
                                    <i class="fas fa-times fa-fw"></i>
                                    수정하기
                                    </button>
                                </a>
                                <a class="nofont" href="/delete?id=${n}"> 
                                    <button class="btn btn-primary">
                                    <i class="fas fa-times fa-fw"></i>
                                    삭제하기
                                    </button>
                                </a>
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
        console.log('id : '+n)
        i=i+1
        
       
        
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

app.get('/update',function(req,res){
    var title =''
    var description = ''
    var id=req.query.id
    db.query('SELECT * from portfolio_item WHERE id=?',[id],function(err, result, fields){
        if(err) {
            console.log(err)
        }
        else {
            title = result[0].title
            description = result[0].description
        }
        res.render('update.ejs',{
            title:title,
            description:description,
            id:id
        })
    })
 })

app.post('/update_process',function(req,res){
    var data=req.body.id
    var title=req.body.title
    var description=req.body.description
    console.log('update:'+data)
     db.query(`UPDATE portfolio_item SET title=?, description=? WHERE id=?`,[title,description,data])
    res.redirect('/')
})

app.post('/create',function(req,res){
   
    db.query(`SELECT * FROM portfolio_item`,function(err,req){
        var id=req.length+1
        console.log(id)
        res.render('create.ejs',{
            id:id
        })
    })

})

app.post('/create_process',function(req,res){
    var id=req.body.id
    var title=req.body.title
    var description=req.body.description
    var file=req.file.avatar

    fs.readFile(file,function(err,data){
        fs.writeFileSync(file,data)
    })



     db.query(`INSERT INTO portfolio_item (id, title, description) 
     VALUES(?, ?, ?)`,[id,title,description])
     res.redirect('/')
})
app.get('/delete',function(req,res){
    var id=req.query.id
    db.query('DELETE FROM portfolio_item WHERE id=?',[id],function(err, result, fields){
        res.redirect('/')
    })
 })

 


app.listen(port)
console.log('server start : 3000')