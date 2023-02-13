const res = require("express/lib/response");
const db = require("./parse");
const JWT = require("jose");

//Actual routes
app.get('/loads', async (req, res) => {
  let userToken = "" + req.header("Authorization")
  console.log(userToken);
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    const Loads = Parse.Object.extend("loads");
    const query = new Parse.Query(Loads);
    let results = await query.find();
    
    results = JSON.stringify(results)
    results = JSON.parse(results);
    for(var i = 0; i < results.length; i++){
      delete results[i].objectId;
      delete results[i].updatedAt;
      delete results[i].createdAt;
      results[i].id = results[i].ID;
      delete results[i].ID;
    }

    res.status(200).send(results);

  }
  else{
    res.send("You are not authorized to send a request. Please correct your token");
  }

});

app.get('/authenticate/:token', async (req, res) => {
  let userToken = "" + req.header("Authorization")
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    let decode = JWT.UnsecuredJWT.decode(req.params.token).payload;
    const User = Parse.Object.extend("MobileUsers");
    const query = new Parse.Query(User)
    query.equalTo("username", decode.username);
    let result = await query.find();

    result = JSON.stringify(result[0]);
    result = JSON.parse(result);

    delete result.objectId;
    delete result.updatedAt;
    delete result.createdAt;

    res.send(result);
  }
  else{
    res.send("You are not authorized to send a request. Please correct your token");
  }

});

app.put('/messages/:handle', async (req, res) => {
  let userToken = "" + req.header("Authorization")
  console.log(userToken);
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    const Messages = Parse.Object.extend("Messages");
    const messages = new Messages();
    messages.set("handle", req.params.handle);
    messages.save(req.body);


    res.send(req.params.handle).status(200);
  }
  else{
    res.send("You are not authorized to send a request. Please correct your token");
  }
});


//Anything below this comment is solely for rendering HTML
app.get('/messages', (req, res) => {
  res.render("messages");
});

app.get('/users', (req, res) => {
  res.render("user");
});

// Index
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/all_loads', async (req, res) => {
  res.render("loads");
});