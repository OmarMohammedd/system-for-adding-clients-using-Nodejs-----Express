const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
var {requireAuth} = require("../middleware/middleware");
var {checkIfUser} = require("../middleware/middleware");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const multer  = require('multer')
const upload = multer({storage: multer.diskStorage({})});



router.get("*", checkIfUser);
router.post("*", checkIfUser);

// Level 3


router.post("/update-profile", upload.single('avatar'),
    authController.post_profileIme
)




// Level 2

router.get("/signout", authController.get_signout);

router.get("/login", authController.get_login);

router.get("/signup", authController.get_signup);

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  authController.post_signup
);

router.post("/login", authController.post_login);

router.get("/", authController.get_welcome);


                  
router.post("/user/add.html",requireAuth, userController.user_post )

router.get("/home",requireAuth, userController.user_index_get)

router.get("/view/:id",requireAuth, userController.user_view_get)

router.delete("/edit/:id",requireAuth, userController.user_delete); 

router.put("/edit/:id",requireAuth, userController.user_put );

router.post("/search",requireAuth, userController.user_search_post);



router.get("/user/add.html", userController.user_add_get);

router.get("/user/view.html", userController.view);

router.get("/edit/:id", userController.user_edit_get);


module.exports = router;