const User = require("../Models/authUser");
var moment = require("moment");
var jwt = require('jsonwebtoken');


                                    // post data
const user_post = (req,res) => {

  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  User.updateOne({ _id: decoded.id }, { $push: 
    { customerInfo: {
      fireName: req.body.fireName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      age: req.body.age,
      country: req.body.country,
      gender: req.body.gender,
      createdAt: new Date()
    } } 
  
  })
    .then( result => {
      res.redirect("/home");
    })
    .catch( err => {
      console.log(err);
    });
}
                                  // get data
const user_index_get = (req,res) => {

  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  User.findById(decoded.id) // سطر

  .then((result) => {
    res.render("index", { arr: result.customerInfo, moment : moment  });
  }).catch((err) => {
    console.log(err);
  });
}

                                // get single object
const user_view_get = (req,res) => {

  User.findOne({ "customerInfo._id": req.params.id })
  .then((result) => {
    const clickedObject = result.customerInfo.find((item) => {
      return item._id == req.params.id;
    });

    res.render("user/view", { obj: clickedObject, moment: moment });
  })
  .catch((err) => {
    console.log(err);
  });
}

                                 // delete object
const user_delete =  (req, res) => {
  User.updateOne(
    { "customerInfo._id" : req.params.id },
    { $pull: { customerInfo: { _id: req.params.id } } }
  )
    .then((result) => {
      res.redirect("/home");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

                                   // update data
const user_put  =  (req, res) => {
  User.updateOne(
    { "customerInfo._id": req.params.id },
    { "customerInfo.$.fireName": req.body.fireName,
    "customerInfo.$.lastName": req.body.lastName,
    "customerInfo.$.email": req.body.email,
    "customerInfo.$.phoneNumber": req.body.phoneNumber,
    "customerInfo.$.age": req.body.age,
    "customerInfo.$.country": req.body.country,
    "customerInfo.$.gender": req.body.gender,
    "customerInfo.$.updatedAt": new Date(),
  }
  )
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
}

                                  // Search 
const user_search_post =  (req, res) => {

  const searchText = req.body.searchText.trim();
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  User.findOne({ _id: decoded.id })
    .then((result) => {
      console.log(result.customerInfo)
      const searchCustomers = result.customerInfo.filter((item) => {
        return (
          item.fireName.includes(searchText) ||
          item.lastName.includes(searchText)
        );
      });
      res.render("user/search", { arr: searchCustomers, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
}

const user_edit_get = (req, res) => {

  User.findOne({ "customerInfo._id": req.params.id })
  .then((result) => {
    const clickedObject = result.customerInfo.find((item) => {
      return item._id == req.params.id;
    });

    res.render("user/edit", { obj: clickedObject, moment: moment });
  })
  .catch((err) => {
    console.log(err);
  });

}


const user_add_get = (req, res) => {
  res.render("user/add")
}

const view = (req, res) => {
  res.render("user/view")
}


module.exports = { 
  view ,
  user_add_get ,
  user_edit_get ,
  user_post ,
  user_index_get ,
  user_delete ,
  user_view_get ,
  user_search_post ,
  user_put ,
}