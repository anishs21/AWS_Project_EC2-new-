import express from "express";
import { submitEnquiry,getAllEnquiries } from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/enquiry", submitEnquiry);
router.get("/enquiries", getAllEnquiries);
export default router;