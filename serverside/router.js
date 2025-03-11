import { Router } from "express";
import * as rh from "./requesthandler/user.request.js"
import * as ad from "./requesthandler/admin.request.js"
import Auth from "./middilware/auth.js";


const router=Router();
router.route("/adduser").post(rh.adduser)
router.route("/login").post(rh.logine)
router.route("/forgetuser").post(rh.forgetPassword)
router.route("/chaingeuser").put(rh.chaingePassword)
router.route("/profiledata").post(rh.profile)
router.route("/saveprofile").put(rh.saveprofile)

// address
// address
// address
router.route("/addaddress").post(rh.addaddress)
router.route("/showaddress").post(rh.showaddress)
router.route("/deleteaddress").post(rh.deleteaddress)

//product section
//product section
//product section

router.route("/addproduct").post(rh.addProduct)
router.route("/fetchproduct").post(rh.fetchProduct)
router.route("/deleteproduct").post(Auth,rh.deleteproduct)
router.route("/showproduct").post(rh.showproduct)
router.route("/updateproduct").post(rh.updateproduct)
router.route("/addoffer").post(rh.addoffer)
router.route("/block").post(rh.blockProduct)
router.route("/showsingleproduct").post(rh.showsingleproduct)
router.route("/addtocart").post(rh.addtocart)
router.route("/checkcart").post(rh.checkcart)
router.route("/showcart").post(rh.showcart)
router.route("/removecart").post(rh.removecart)
router.route("/filter").post(rh.filter)

// order section
router.route("/buyproduct").post(rh.buyproduct)
router.route("/orders").post(rh.orderdetails)


// adminn Section
// adminn Section
// adminn Section

router.route("/admin").post(ad.adduser)
router.route("/forget").post(ad.forgetPassword)
router.route("/chainge").put(ad.chaingePassword)
router.route("/adminhome").post(ad.addminhome)
router.route("/showusers").get(ad.showusers)
router.route("/blockuser").post(ad.blockuser)
router.route("/showproductadmin").get(ad.showproduct)

// router.route("/home").get(Auth,rh.Home)
export default router