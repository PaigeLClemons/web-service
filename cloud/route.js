const res = require("express/lib/response");
const db = require("./parse");
const jwt = require('jsonwebtoken');

// Index
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/all_loads', async (req, res) => {
 /*const Load = Parse.Object.extend("loads");
  const load = new Load();

  let result = load.save(
    {
      "trip_planner_enabled": true,
      "stops": [
        {
          "truck": {
            "width": 8.53,
            "weight_per_axle": 17000,
            "type": "tractor_truck",
            "trailer_count": 1,
            "traffic_rerouting": false,
            "limited_weight": 80000,
            "length": 72,
            "height": 13.5
          },
          "time_window": {
            "to": "2022-05-10T12:30:00.0000+00:00",
            "from": "2022-05-10T00:01:00.0000+00:00"
          },
          "stop_type": "Live Load",
          "stop_number": 2,
          "state": "TN",
          "route_options": {
            "avoid_tunnels": false,
            "avoid_toll_roads": true,
            "avoid_dirt_roads": true
          },
          "product": "Paper",
          "prevent_navigation": false,
          "postal_code": "38012",
          "name": "DOMTAR (DOMBRO)",
          "location": {
            "longitude": -89.236944444,
            "latitude": 35.600555555
          },
          "identifiers": [],
          "enable_map_interaction_in_navigation": false,
          "current": true,
          "contact": {},
          "city": "Brownsville",
          "allow_reporting_issue_in_navigation": false,
          "address": "1621 Welch St"
        }
      ],
      "stickers": [],
      "special_notes": "",
      "sort": 18,
      "shipper": {
        "truck": {
          "width": 8.53,
          "weight_per_axle": 17000,
          "type": "tractor_truck",
          "trailer_count": 1,
          "traffic_rerouting": false,
          "limited_weight": 80000,
          "length": 72,
          "height": 13.5
        },
        "time_window": {
          "to": "2022-05-10T10:29:00.0000+00:00",
          "from": "2022-05-10T10:29:00.0000+00:00"
        },
        "stop_type": "Hook Empty Trailer",
        "stop_number": 1,
        "state": "AR",
        "route_options": {
          "avoid_tunnels": false,
          "avoid_toll_roads": true,
          "avoid_dirt_roads": true
        },
        "product": "Unknown",
        "prevent_navigation": false,
        "postal_code": "72301",
        "name": "USA TRUCK (USAWES)",
        "location": {
          "longitude": -90.152103611,
          "latitude": 35.158129444
        },
        "identifiers": [],
        "enable_map_interaction_in_navigation": false,
        "current": false,
        "contact": {},
        "city": "West Memphis",
        "allow_reporting_issue_in_navigation": false,
        "address": "2600 N Service Rd"
      },
      "route_options": {
        "hide_total_miles": false,
        "avoid_tunnels": false,
        "avoid_toll_roads": false,
        "avoid_dirt_roads": true
      },
      "prevent_navigation": false,
      "pickup_title": "Start",
      "order_number": "7471413",
      "load_status_label": "Started",
      "load_status": "STARTED",
      "include_in_compliance_report": true,
      "ID": "7471413",
      "hazmat": false,
      "fields": [],
      "enable_map_interaction_in_navigation": false,
      "display_identifier": "7471413",
      "dispatch": "PLN",
      "customer_name": "5881 @ ECHO GLOBAL LOGISTICS (ECHCHI)",
      "current": true,
      "active":true
    }); */
  res.render("loads");
});

app.get('/loads', async (req, res) => {
  let userToken = "" + req.header("Authorization")
  console.log(userToken);
  const PARAM = {"token": userToken};

  if(await Parse.Cloud.run('authorize', PARAM) == true){
    const Loads = Parse.Object.extend("loads");
    const query = new Parse.Query(Loads);
    var results = await query.find();
    
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

app.get('/users', (req, res) => {
  /* const User = Parse.Object.extend("MobileUsers");
  const user = new User();

  let result = user.save(
    {
      "username": "PAIGE",
      "full_name": "Paige",
      "password": "test",
      "menu_code": "DEFAULT_MENU",
      "dashboard_code": "DEFAULT_DASHBOARD",
      "custom_settings_form_code": "SETTINGS",
      "theme": "#F56600"
    }); */
  res.render("user");
});


app.get('/autenticate:token', async (req, res) => {
  let userToken = "" + req.header("Authorization")
  console.log(userToken);
  const PARAM = {"token": userToken};

  // if(await Parse.Cloud.run('authorize', PARAM) == true){
  //   const Users = Parse.Object.extend("MobileUsers");
  //   const query = new Parse.Query(Users);
  //   var results = await query.find();
    
  //   results = JSON.stringify(results)
  //   results = JSON.parse(results);
  //   for(var i = 0; i < results.length; i++){
  //     delete results[i].objectId;
  //     delete results[i].updatedAt;
  //     delete results[i].createdAt;
  //     results[i].id = results[i].ID;
  //     delete results[i].ID;
  //   }

  //   res.send(results);

  // }
  // else{
  //   res.send("You are not authorized to send a request. Please correct your token");
  // }
});