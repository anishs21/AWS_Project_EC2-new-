import { saveEnquiry } from "../models/enquiryModel.js";
import { v4 as uuidv4 } from "uuid";
import { fetchAllEnquiries } from "../models/enquiryModel.js";

export const submitEnquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const enquiry = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      phone,
      message,
      createdAt: new Date().toISOString()
    };

    await saveEnquiry(enquiry);

    res.status(201).json({ message: "Enquiry submitted successfully" });
  } catch (err) {
    console.error("Error saving enquiry:", err);
    res.status(500).json({ message: "Server error while saving enquiry" });
  }
};


export const getAllEnquiries = async (req, res) => {
  try {
    console.log("I am hereS");
    const enquiries = await fetchAllEnquiries();
    
    res.status(200).json(enquiries);
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};