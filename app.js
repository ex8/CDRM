const express = require(`express`);
const mongoose = require(`mongoose`);
const path = require('path');
const createError = require('http-errors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const authenticationRouter = require('./routes/authentication');
const accountRouter = require('./routes/account');

const app = express();

mongoose
    .connect(`mongodb://127.0.0.1:27017/cdrm`, {useNewUrlParser: true})
    .then(() => console.log(`MongoDB connection successful`))
    .catch(err => {
        console.log(`MongoDB connection error: ${err}`);
        createError(500)
    });
mongoose.set('useCreateIndex', true);

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `pug`);

app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, `public`)));

app.use(session({
    secret: 'LOVE',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.render('landing', {
        title: `CDRM | Client-Developer Relation Manager`
    });
});

app.use('/account', authenticationRouter);
app.use('/account', accountRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((req, res, next) => {
    next(createError(500));
});

app.listen(3000, () => console.log(`Express running...`));
