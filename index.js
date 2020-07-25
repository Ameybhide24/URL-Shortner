const express=require('express');
const mongoose=require('mongoose');

//const genenrateShortUrl=require('./service/hash_service');
const ShortUrl=require('./models/shortUrl');
const app=express();

mongoose.connect('mongodb+srv://ameybhide2406:Yema@2406@cluster1.xj4xx.mongodb.net/URL_Shortner?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

app.get('/',async(req,res)=>{
    const shortUrls = await ShortUrl.find();
    res.render('index',{shortUrls:shortUrls,alreadyExists:false});
});

app.post('/shortUrls',async(req,res)=>{
    const url=await ShortUrl.findOne({full:req.body.fullurl});
    if(url){

        const shortUrls = await ShortUrl.find();
        res.render('index',{shortUrls:shortUrls,alreadyExists:true});
    }
    else{
        await ShortUrl.create({full:req.body.fullurl})
        res.redirect('/');
    }
   
});

app.post('/clear',async(req,res)=>{
    await ShortUrl.deleteMany();
    res.redirect('/');
});

app.get('/:shortUrl', async(req,res)=>{
    const shortUrl=await ShortUrl.findOne({short:req.params.shortUrl});
    if(shortUrl==null)return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
});





app.listen(process.env.PORT || 5000);