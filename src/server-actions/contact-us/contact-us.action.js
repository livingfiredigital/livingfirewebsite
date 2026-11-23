// contact-us.action.js

"use server";
import { addContactUsData as addContactUsDataRepo, getProductsAndBrands as getProductsAndBrandsRepo } from "../../repo/contact-us/contact-us.repo"; // Import your repo function
import { responsePayload } from "@/src/constants/reponse-payload";

// Server-side action to handle adding contact data and returning a formatted response
// export const addContactUsData = async (payload) => {
//   const result = await addContactUsDataRepo(payload).catch((err) => {
//     return [];  // In case of error, return an empty array or handle it accordingly
//   });
//   return {
//     ...responsePayload,
//     success: true,
//     message: "Inserted row",
//     result: {
//       result,
//     },
//   };
// };

// const getBaseUrl = () => {
//   if (process.env.VERCEL_URL) {
//     return `https://${process.env.VERCEL_URL}`;
//   }
//   return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// };

export const addContactUsData = async (payload) => {
  try {
    // Save to database
    const result = true
    // const result = await addContactUsDataRepo(payload);
    
    // Send to HubSpot based on the tab type
    let hubspotFormId;
    switch(payload.tab) {
      case "sales":
        hubspotFormId = "84a25776-286c-496b-b9d7-4159fabd4a7f";
        break;
      case "trade":
        hubspotFormId = "your-trade-form-id"; // Replace with actual form ID
        break;
      case "service":
        hubspotFormId = "your-service-form-id"; // Replace with actual form ID
        break;
      case "warranty":
        hubspotFormId = "your-warranty-form-id"; // Replace with actual form ID
        break;
      default:
        hubspotFormId = "84a25776-286c-496b-b9d7-4159fabd4a7f";
    }
    
    // Prepare HubSpot data
    const hubspotData = {
      fields: [
        { name: "firstname", value: payload.firstName },
        { name: "lastname", value: payload.lastName },
        { name: "phone", value: payload.phoneNumber },
        { name: "email", value: payload.email },
        { name: "message", value: payload.message },
        { name: "product", value: payload.product },
        { name: "brand", value: payload.brand },
        { name: "delivery_option", value: payload.deliveryOption },
        { name: "postcode", value: payload.postcode },
        { name: "streetaddress", value: payload.streetAddress },
        { name: "suburb", value: payload.suburb },
        { name: "state", value: payload.state },
        { name: "industry", value: payload.industry },
        { name: "serial_number", value: payload.serialNumber },
      ],
      context: {
        pageUri: "https://livingfire.com.au/contact",
        pageName: "Contact Us Form Submission",
      },
    };
    
    // Send to HubSpot
    const portalId = "23909229";
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${hubspotFormId}`;
    
    const hubspotResponse = await fetch(hubspotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hubspotData),
    });
    
    if (!hubspotResponse.ok) {
      console.error("HubSpot API error:", await hubspotResponse.text());
    }
    
    // Prepare data for email API
    let serviceName;
    switch(payload.tab) {
      case "sales":
        serviceName = "Sales Enquiry";
        break;
      case "trade":
        serviceName = "Trade Enquiry";
        break;
      case "service":
        serviceName = "Service Enquiry";
        break;
      case "warranty":
        serviceName = "Warranty Claim";
        break;
      default:
        serviceName = "General Enquiry";
    }
    
    const emailData = {
      serviceName: serviceName,
      userName: `${payload.firstName} ${payload.lastName}`,
      phone: payload.phoneNumber,
      email: payload.email,
      product: payload.product,
      message: payload.message,
      // Add any other fields your email API expects
    };
    
    // Send email
    const emailResponse = await fetch("https://www.livingfire.com.au/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });
    
    if (!emailResponse.ok) {
      console.error("Email API error:", await emailResponse.text());
    }

    return {
      ...responsePayload,
      success: true,
      message: "Data submitted successfully",
      result: {
        result,
        hubspotSuccess: hubspotResponse.ok,
        emailSuccess: emailResponse.ok,
      },
    };
  } catch (err) {
    console.error("Error in addContactUsData:", err);
    return {
      ...responsePayload,
      success: false,
      message: "Failed to submit data",
      result: {
        result: [],
      },
    };
  }
};


export const fetchProductsAndBrands = async () => {
  try {
    const result = await getProductsAndBrandsRepo().catch((err) => {
      console.error("Error in fetchProductsAndBrands:", err);
      return [];
    });
    
    return {
      ...responsePayload,
      success: true,
      message: "Fetched products and brands",
      result: {
        data: result,
      },
    };
  } catch (error) {
    console.error("Error in fetchProductsAndBrands:", error);
    return {
      ...responsePayload,
      success: false,
      message: "Failed to fetch products and brands",
      result: {
        data: [],
      },
    };
  }
};