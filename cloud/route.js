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
    res.status(400).send("You are not authorized to send a request. Please correct your token");
  }

});

app.get('/loads/:id', async (req, res) => {
  let userToken = "" + req.header("Authorization")
  console.log(userToken);
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    const Loads = Parse.Object.extend("loads");
    const query = new Parse.Query(Loads);
    query.equalTo("ID", req.params.id);
    let result = await query.find();
    
    result = JSON.stringify(result);
    result = JSON.parse(result);

    delete result.objectId;
    delete result.updatedAt;
    delete result.createdAt;
    result.id = result.ID;
    delete result.ID;

    res.status(200).send(result);

  }
  else{
    res.status(400).send("You are not authorized to send a request. Please correct your token");
  }
});

app.put('/loads', async (req, res) => {
  let userToken = "" + req.header("Authorization");
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    const Load = Parse.Object.extend("loads");
    const load = new Load();

    const query = new Parse.Query(Load);
    let result = await query.find();

    let newLoad = req.body;
    newLoad.ID = newLoad.id;
    delete newLoad.id;

    result = JSON.stringify(result);
    result = JSON.parse(result);

    let exists = false;
    let i;
    for(i = 0; i < result.length; i++){
      if(result[i].ID == newLoad.ID){
        exists = true;
        break;
      }
    }

    if(exists == false){
      await load.save(newLoad);
      res.send(req.body).status(200);
    }
    else{
      res.send("A load with the id, " + newLoad.ID + ", already exists!").status(400);
    }
  }
  else{
    res.send("You are not authorized to send a request. Please correct your token").status(400);
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
    res.statu(400).send("You are not authorized to send a request. Please correct your token");
  }

});

app.put('/authenticate', async (req, res) => {
  let userToken = "" + req.header("Authorization");
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    const User = Parse.Object.extend("MobileUsers");
    const user = new User();

    const query = new Parse.Query(User);
    let result = await query.find();

    result = JSON.stringify(result);
    result = JSON.parse(result);

    let exists = false;
    for(let i = 0; i < result.length; i++){
      if(result[i].username == req.body.username){
        exists = true;
        break;
      }
    }

    if(exists == false){
      await user.save(req.body);
      res.send(req.body).status(200);
    }
    else{
      res.send("A user with the username, " + req.body.username + ", already exists!").status(400);
    }
  }
  else{
    res.send("You are not authorized to send a request. Please correct your token").status(400);
  }
});

app.put('/messages/:handle', async (req, res) => {
  let userToken = "" + req.header("Authorization");
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    const Messages = Parse.Object.extend("Messages");
    const messages = new Messages();
    messages.set("handle", req.params.handle);
    messages.save(req.body);


    res.send(req.params.handle).status(200);
  }
  else{
    res.send("You are not authorized to send a request. Please correct your token").status(400);
  }
});

app.get('/messages', async (req, res) => {
  let userToken = "" + req.header("Authorization")
  console.log(userToken);
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    const Messages = Parse.Object.extend("Messages");
    const query = new Parse.Query(Messages);
    let results = await query.find();
    
    results = JSON.stringify(results)
    results = JSON.parse(results);

    for(var i = 0; i < results.length; i++){
      delete results[i].objectId;
      delete results[i].updatedAt;
      delete results[i].createdAt;
    }

    res.status(200).send(results);

  }
  else{
    res.status(400).send("You are not authorized to send a request. Please correct your token");
  }

});


//Anything below this comment is solely for rendering HTML
// Index
app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/message', (req, res) => {
//   res.render("messages");
// });

// app.get('/users', (req, res) => {
//   res.render("user");
// });

// app.get('/all_loads', async (req, res) => {
//   res.render("loads");
// });