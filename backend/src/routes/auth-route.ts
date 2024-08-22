import { Router } from "express";
import { register,login,logout, getLoginStatus, google } from "../controllers/user-controller";
import authenticateUser from "../middleware/authentication-middleware";

const router:Router = Router();



router.post('/register', register)
router.post('/login',login);
router.post('/google',google);
router.get("/logout",logout);
router.get("/getLoginStatus",getLoginStatus)

export default router;