import { Router } from "express";
import * as rh from "./requesthandler/user.request.js"
import * as ad from "./requesthandler/admin.request.js"
// import Auth from "./midileware/auth.js";


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


// adminn Section
// adminn Section
// adminn Section

router.route("/admin").post(ad.adduser)
router.route("/forget").post(ad.forgetPassword)
router.route("/chainge").put(ad.chaingePassword)
router.route("/adminhome").post(ad.addminhome)
// router.route("/home").get(Auth,rh.Home)
export default router