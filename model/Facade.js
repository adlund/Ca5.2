var db = require('../model/db.js');



var topics = [
    "Best",
    "Cool",
    "Funny"
]

function _dbSetup(){
    _createQuote({ "topic" :"Best","author": "Marilyn Monroe","reference": "ref","quote": "I'm selfish, impatient, and a little insecure. I make mistakes, I'm out of control, and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best"});
    _createQuote({ "topic" :"Best","author": "Mahatma Gandhi","reference": "ref","quote": "The best way to find yourself is to lose yourself in the service of others."});
    _createQuote({ "topic" :"Best","author": "Eli Khamarov","reference": "ref","quote": "The best things in life are unexpected - because there were no expectations."});
    _createQuote({ "topic" :"Best","author": "Theodore Roosevelt","reference": "ref","quote": "In any moment of decision, the best thing you can do is the right thing, the next best thing is the wrong thing, and the worst thing you can do is nothing."});
    _createQuote({ "topic" :"Best","author": "Peter Drucker","reference": "ref","quote": "The best way to predict the future is to create it."});

    _createQuote({ "topic" :"Funny","author": "Elbert Hubbard","reference": "ref","quote": "Do not take life too seriously. You will never get out of it alive."});
    _createQuote({ "topic" :"Funny","author": "Isaac Asimov","reference": "ref","quote": "People who think they know everything are a great annoyance to those of us who do."});
    _createQuote({ "topic" :"Funny","author": "Ron White","reference": "ref","quote": "I believe that if life gives you lemons, you should make lemonade... And try to find somebody whose life has given them vodka, and have a party."});
    _createQuote({ "topic" :"Funny","author": "Steve Martin","reference": "ref","quote": "A day without sunshine is like, you know, night."});
    _createQuote({ "topic" :"Funny","author": "Winston Churchill","reference": "ref","quote": "I may be drunk, Miss, but in the morning I will be sober and you will still be ugly."});

    _createQuote({ "topic" :"Cool","author": "Kurt Cobain","reference": "ref","quote": "Rather be dead than cool."});
    _createQuote({ "topic" :"Cool","author": "Mitch Hedberg","reference": "ref","quote": "s a hippopotamus a hippopotamus, or just a really cool Opotamus?"});
    _createQuote({ "topic" :"Cool","author": "Jay-Z","reference": "ref","quote": "I'm a mirror. If you're cool with me, I'm cool with you, and the exchange starts. What you see is what you reflect. If you don't like what you see, then you've done something. If I'm standoffish, that's because you are."});
    _createQuote({ "topic" :"Cool","author": "Paul Walker","reference": "ref","quote": "When I was younger, the pressure was just being cool. I never thought of myself as a cool guy. I always thought of myself as more of the goofy guy."});
    _createQuote({ "topic" :"Cool","author": "Robert Pattinson","reference": "ref","quote": "Sometimes just when I say hello the right way, I'm like, 'Whoa, I'm so cool.'"});
}

function _getAllUsers(callback){
    var users = db.User.find(function (err, Users){
        if(err) {
            return console.log(err);
        }
        else{
            callback( Users );
        }
    });
}

function _checkUser(user,password,callback){
    db.User.findOne({userName : user },function(err,foundUser){
        if(err) {
            return callback(err);
        }
        if(foundUser != null && foundUser.password === password){
            callback(null,true);
        } else
        {
            callback(null,false);
        }
    })
}

function _getUser(id, callback){
   db.User.findById(id, function(err, user){
       if(err) {
           return console.log(err);
       }
        else {
           callback( user );
       }
    });
}

function _getUserByUsername(username, callback){
    db.User.find({userName: username}, function(err, user){
        if(err) {
            return console.log(err);
        }
        else {
            callback( user );
        }
    });
}

function _createUser(UserJson){
var User = new db.User({firstName: UserJson.firstName, lastName: UserJson.lastName, userName: UserJson.userName, email: UserJson.email, phone: UserJson.phone, password: UserJson.password});
    User.save(function(err){
       if(err) {
           return console.log(err);
       }
       else{
               console.log(User);
           }
    });
}

function _getAllQuotesByTopic(Topic, callback){
   db.Quote.find({topic: Topic}, function(err, Quotes){
        if(err){
            console.log(err);
        }
       else{
            callback( Quotes );
        }
    });
}

function _getRandomQuote(Topic, callback){
   db.Quote.find({topic: Topic}, function(err, Quotes){
        if(err){
            console.log(err);
        }
        else{
            var ranNum = Math.floor(Math.random() * Quotes.length);
            quote = Quotes[ranNum];
            callback( quote );
        }
    });
    }



function _createQuote(QuoteJson){
    var Quote = new db.Quote({topic: QuoteJson.topic, author: QuoteJson.author, reference: QuoteJson.reference, quote: QuoteJson.quote});
    Quote.save(function(err){
        if(err) {
            return console.log(err);
        }
        else{
            console.log(Quote);
        }
});
}

function _deleteQuote(id){
    db.Quote.findByIdAndRemove(id, callback);
}

function _editQuote(id, QuoteJson) {
    db.Quote.findByIdAndUpdate(id, {topic: JSON.topic, author: JSON.author, reference: JSON.reference, quote: quote});
}

module.exports = {
    checkUser : _checkUser,
    getAllTopics : topics,
    dbSetup : _dbSetup,
    getAllUsers : _getAllUsers,
    getUser : _getUser,
    getUserByUsername : _getUserByUsername,
    createUser : _createUser,
    getAllQuotesByTopic : _getAllQuotesByTopic,
    getRandomQuote : _getRandomQuote,
    createQuote : _createQuote,
    deleteQuote : _deleteQuote,
    editQuote : _editQuote
}