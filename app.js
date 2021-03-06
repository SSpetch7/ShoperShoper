const   express         = require('express'),
        app             = express(),
        path = require('path'),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        flash           = require('connect-flash'),
        methodOverride  = require('method-override'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        Collection      = require('./models/item'),
        Comment         = require('./models/comment'),
        User            = require('./models/user'),
        expressValidator = require('express-validator'),
        session = require('express-session'),
        seedDB          =  require('./seeds');


        
var itemRoutes = require('./routes/item'),
    commentRoutes    = require('./routes/comments'),
    indexRoutes    = require('./routes/index'),
    cartRoutes = require('./routes/cart');

// cart 

    
// database
mongoose.connect('mongodb://localhost/BItem');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(methodOverride('_method'));
//Static File( CSS )
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.use(flash());
app.use('/css',express.static(__dirname+'public/css'))
//seedDB();

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});
/* Express validator */
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(function(req,res,next){
    res.locals.currentUser = req.user ;
    next();
})

/*CSS*/ 
app.use('/public',function(req,res,next){
    next();
});

app.use('/',indexRoutes);
app.use('/item',itemRoutes);
app.use('/item/:id/comments',commentRoutes);
app.use('/cart',cartRoutes);
/*app.use('/do-comment',commentV2Routes);*/

app.listen(4000,function(){
    console.log('SHOPERSHOPER is started.');
});
