// "use client";
// import "./contactus.css";
// import { useEffect, useState } from "react";
// import Head from "next/head";
// import { motion, AnimatePresence } from "framer-motion";
// import dynamic from "next/dynamic";
// import { useContactUs, useProductsAndBrands } from "./hooks/useContactUs"; // Import the new hook

// // Lazy load the AddressDetails component
// const AddressDetails = dynamic(() => import("./AddressDetails"), {
//   loading: () => <p>Loading address information...</p>,
//   ssr: false,
// });

// const ContactUs = () => {
//   const [tab, setTab] = useState("sales");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const initialFormData = {
//     loggedEmail: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     deliveryOption: "",
//     streetAddress: "",
//     suburb: "",
//     state: "",
//     postcode: "",
//     message: "",
//     brand: "",
//     product: "",
//     industry: "",
//     serialNumber: "",
//     tab: tab,
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const { mutate, isLoading, isError, isSuccess, error, data } = useContactUs();
//   const { data: productsAndBrandsData, isLoading: isLoadingData } =
//     useProductsAndBrands();

//   useEffect(() => {
//     setIsMounted(true);
//     return () => setIsMounted(false);
//   }, []);

//   useEffect(() => {
//     // Process products and brands data when it's loaded
//     if (productsAndBrandsData && productsAndBrandsData.length) {
//       // Extract unique brands
//       const uniqueBrands = [
//         ...new Set(productsAndBrandsData.map((item) => item.brand_name)),
//       ];
//       setBrands(["Others", ...uniqueBrands]);
//       setProducts(productsAndBrandsData);

//       // Initially show all products
//       setFilteredProducts(productsAndBrandsData);
//     }
//   }, [productsAndBrandsData]);

//   useEffect(() => {
//     // Filter products when brand changes
//     if (formData.brand === "Others") {
//       setFilteredProducts([{ product_name: "Others", brand_name: "Others" }]);
//       setFormData((prev) => ({ ...prev, product: "Others" }));
//     } else if (formData.brand) {
//       const filtered = products.filter(
//         (product) => product.brand_name === formData.brand
//       );
//       setFilteredProducts([
//         ...filtered,
//         { product_name: "Others", brand_name: formData.brand },
//       ]);
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [formData.brand, products]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // If product is selected and it's not "Others", set the corresponding brand
//     if (name === "product" && value !== "Others") {
//       const selectedProduct = products.find((p) => p.product_name === value);
//       if (selectedProduct) {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value,
//           brand: selectedProduct.brand_name,
//         }));
//         return;
//       }
//     }

//     // If product is "Others", keep the current brand
//     if (name === "product" && value === "Others") {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//       return;
//     }

//     // For all other cases
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Add the current tab to the form data
//     const formDataWithTab = {
//       ...formData,
//       tab: tab,
//     };

//     mutate(formDataWithTab);
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       setIsSubmitting(false);
//       setFormData(initialFormData);
//     }
//   }, [isLoading, isSuccess]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         when: "beforeChildren",
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   const tabContentVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//       },
//     },
//     exit: { opacity: 0, x: 20 },
//   };

//   if (!isMounted) return null;

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       style={{ backgroundColor: "#f7f7f5", margin: "50px 0" }}
//     >
//       <Head>
//         <title>Contact Us</title>
//         <link rel="stylesheet" href="/index.css" />
//         <link rel="stylesheet" href="/contactus.css" />
//       </Head>

//       <motion.div className="contact-us" variants={itemVariants}>
//         <motion.h1
//           className="contactus-text"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           style={{ fontFamily: "Satoru" }}
//         >
//           Contact Us
//         </motion.h1>
//       </motion.div>

//       <motion.section variants={itemVariants}>
//         <AddressDetails />
//       </motion.section>

//       <motion.section variants={itemVariants}>
//         <div className="contactus-form">
//           <div className="container">
//             <div
//               id="tabList"
//               role="tablist"
//               aria-label="rowdescription"
//               className="contactforms"
//             >
//               <motion.div variants={itemVariants}>
//                 <div className="tab-list">
//                   {["sales", "trade", "service", "warranty"].map((tabName) => (
//                     <motion.span
//                       key={tabName}
//                       className={`tablist-text ${
//                         tab === tabName ? "active" : ""
//                       }`}
//                       onClick={() => {
//                         setTab(tabName);
//                         setFormData(initialFormData);
//                       }}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       {tabName === "sales" && "Sales Enquiry"}
//                       {tabName === "trade" && "Trade Enquiry"}
//                       {tabName === "service" && "Service Enquiry"}
//                       {tabName === "warranty" && "Warranty Claim"}
//                     </motion.span>
//                   ))}
//                 </div>
//                 <div className="lineeleven_one"></div>
//               </motion.div>

//               <motion.div
//                 id="tabpanel01"
//                 role="tabpanel"
//                 aria-labelledby="tab01"
//                 className="column_one tabcontent"
//                 variants={containerVariants}
//               >
//                 <AnimatePresence mode="wait">
//                   {tab === "sales" && (
//                     <motion.div
//                       key="sales"
//                       variants={tabContentVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                     >
//                       <form className="service-form" onSubmit={handleSubmit}>
//                         <motion.p
//                           className="form-description"
//                           variants={itemVariants}
//                         >
//                           To get more information about a specific product or to
//                           receive a quote, fill out the form and our care team
//                           will get in touch.
//                         </motion.p>

//                         <motion.div
//                           className="form-group"
//                           variants={itemVariants}
//                         >
//                           <div className="input-wrapper">
//                             <input
//                               name="firstName"
//                               type="text"
//                               placeholder="First Name*"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.firstName}
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <input
//                               name="lastName"
//                               type="text"
//                               placeholder="Last Name*"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.lastName}
//                             />
//                           </div>
//                         </motion.div>

//                         <motion.div
//                           className="form-group"
//                           variants={itemVariants}
//                         >
//                           <div className="input-wrapper">
//                             <input
//                               name="phoneNumber"
//                               type="text"
//                               placeholder="Phone Number*"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.phoneNumber}
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <input
//                               name="email"
//                               type="email"
//                               placeholder="Email*"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.email}
//                             />
//                           </div>
//                         </motion.div>

//                         <motion.div
//                           className="form-group"
//                           variants={itemVariants}
//                         >
//                           <div className="input-wrapper">
//                             <input
//                               name="deliveryOption"
//                               type="text"
//                               placeholder="Pickup or delivery?"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.deliveryOption}
//                             />
//                           </div>
//                           <div className="input-wrapper">
//                             <input
//                               name="postcode"
//                               type="text"
//                               placeholder="Postcode*"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.postcode}
//                             />
//                           </div>
//                         </motion.div>

//                         <motion.div
//                           className="form-group"
//                           variants={itemVariants}
//                         >
//                           <div className="input-wrapper">
//                             <select
//                               name="brand"
//                               value={formData.brand}
//                               onChange={handleInputChange}
//                               disabled={isLoadingData}
//                             >
//                               <option value="">Select Brand</option>
//                               {brands.map((brand, index) => (
//                                 <option key={index} value={brand}>
//                                   {brand}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                           <div className="input-wrapper">
//                             <select
//                               name="product"
//                               value={formData.product}
//                               onChange={handleInputChange}
//                               disabled={isLoadingData || !formData.brand}
//                             >
//                               <option value="">Select Product</option>
//                               {filteredProducts.map((product, index) => (
//                                 <option
//                                   key={index}
//                                   value={product.product_name}
//                                 >
//                                   {product.product_name}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         </motion.div>

//                         <motion.div
//                           className="input-wrapper-full"
//                           variants={itemVariants}
//                         >
//                           <textarea
//                             name="message"
//                             placeholder="How can we help?*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.message}
//                           ></textarea>
//                         </motion.div>

//                         <motion.div
//                           className="columnsubmit"
//                           variants={itemVariants}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <button
//                             className="submit"
//                             type="submit"
//                             disabled={isSubmitting || isLoading}
//                           >
//                             {isSubmitting || isLoading
//                               ? "Submitting..."
//                               : "Submit"}
//                           </button>
//                         </motion.div>
//                       </form>
//                     </motion.div>
//                   )}
//                   {tab === "trade" && (
//                     <motion.div
//                       key="trade"
//                       variants={tabContentVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                     >
//                       <div
//                         id="tabpanel01"
//                         role="tabpanel"
//                         aria-labelledby="tab01"
//                         className="column_one tabcontent"
//                       >
//                         <form className="service-form" onSubmit={handleSubmit}>
//                           <p className="form-description ui text">
//                             If you are an architect, builder, landscaper or
//                             installer and you have an enquiry or need any
//                             assistance, speak to our team by filling out the
//                             form below. You can also visit our industry hub to
//                             find spec sheets and installation manuals. To sign
//                             up for a trade account, you can visit
//                             our trades page.
//                           </p>
//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <input
//                                 name="firstName"
//                                 type="text"
//                                 placeholder="First Name*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.firstName}
//                               />
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="lastName"
//                                 type="text"
//                                 placeholder="Last Name*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.lastName}
//                               />
//                             </div>
//                           </div>

//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <input
//                                 name="phoneNumber"
//                                 type="text"
//                                 placeholder="Phone Number*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.phoneNumber}
//                               />
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="email"
//                                 type="email"
//                                 placeholder="Email*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.email}
//                               />
//                             </div>
//                           </div>

//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <select
//                                 name="industry"
//                                 value={formData.industry}
//                                 onChange={handleInputChange}
//                               >
//                                 <option value="option1">Industry</option>
//                                 <option value="option2">Option2</option>
//                                 <option value="option3">Option3</option>
//                               </select>
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="postcode"
//                                 type="text"
//                                 placeholder="Postcode*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.postcode}
//                               />
//                             </div>
//                           </div>

//                           <div className="input-wrapper-full">
//                             <textarea
//                               name="message"
//                               placeholder="How can we help?*"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.message}
//                             ></textarea>
//                           </div>
//                           <div className="columnsubmit">
//                             <button
//                               className="flex-row-center-center  submit ui button"
//                               type="submit"
//                               disabled={isSubmitting}
//                             >
//                               {isSubmitting ? "Submitting..." : "Submit"}
//                             </button>
//                           </div>
//                         </form>
//                         <br />
//                         <br />
//                         <br />
//                       </div>
//                     </motion.div>
//                   )}

//                   {tab === "service" && (
//                     <motion.div
//                       key="service"
//                       variants={tabContentVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                     >
//                       <div
//                         id="tabpanel01"
//                         role="tabpanel"
//                         aria-labelledby="tab01"
//                         className="column_one tabcontent"
//                       >
//                         <form className="service-form" onSubmit={handleSubmit}>
//                           <p className="form-description ui text">
//                             For assistance or to schedule a service, contact us
//                             at 03 99 777 888 or fill out the form below. We are
//                             here to help you enjoy your fireplace at its very
//                             best!
//                           </p>
//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <input
//                                 name="firstName"
//                                 type="text"
//                                 placeholder="First Name*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.firstName}
//                               />
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="lastName"
//                                 type="text"
//                                 placeholder="Last Name*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.lastName}
//                               />
//                             </div>
//                           </div>

//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <input
//                                 name="phoneNumber"
//                                 type="text"
//                                 placeholder="Phone Number*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.phoneNumber}
//                               />
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="email"
//                                 type="email"
//                                 placeholder="Email*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.email}
//                               />
//                             </div>
//                           </div>

//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <input
//                                 name="streetAddress"
//                                 type="text"
//                                 placeholder="Street Address*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.streetAddress}
//                               />
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="suburb"
//                                 type="text"
//                                 placeholder="Suburb*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.suburb}
//                               />
//                             </div>
//                           </div>

//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <input
//                                 name="state"
//                                 type="text"
//                                 placeholder="State*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.state}
//                               />
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="postcode"
//                                 type="text"
//                                 placeholder="Postcode*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.postcode}
//                               />
//                             </div>
//                           </div>

//                           <div className="input-wrapper-full">
//                             <textarea
//                               name="message"
//                               placeholder="How can we help?*"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.message}
//                             ></textarea>
//                           </div>

//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <select
//                                 name="brand"
//                                 value={formData.brand}
//                                 onChange={handleInputChange}
//                               >
//                                 <option value="option1">Brand</option>
//                                 <option value="option2">Option2</option>
//                                 <option value="option3">Option3</option>
//                               </select>
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="serialNumber"
//                                 type="text"
//                                 placeholder="Serial Number"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.serialNumber}
//                               />
//                             </div>
//                           </div>

//                           <div className="file-upload">
//                             <label>Proof of Purchase</label>
//                             <input type="file" />
//                           </div>
//                           <button
//                             className="flex-row-center-center  submit ui button"
//                             type="submit"
//                             disabled={isSubmitting}
//                           >
//                             {isSubmitting ? "Submitting..." : "Submit"}
//                           </button>
//                         </form>
//                         <br />
//                         <br />
//                         <br />
//                       </div>
//                     </motion.div>
//                   )}

//                   {tab === "warranty" && (
//                     <motion.div
//                       key="warranty"
//                       variants={tabContentVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                     >
//                       <div
//                         id="tabpanel01"
//                         role="tabpanel"
//                         aria-labelledby="tab01"
//                         className="column_one tabcontent"
//                       >
//                         <form className="service-form" onSubmit={handleSubmit}>
//                           <p className="form-description ui text">
//                             To make a warranty claim or to get more information,
//                             fill out the form and our care team
//                             will get in touch.
//                           </p>
//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <input
//                                 name="firstName"
//                                 type="text"
//                                 placeholder="First Name*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.firstName}
//                               />
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="lastName"
//                                 type="text"
//                                 placeholder="Last Name*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.lastName}
//                               />
//                             </div>
//                           </div>

//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <input
//                                 name="phoneNumber"
//                                 type="text"
//                                 placeholder="Phone Number*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.phoneNumber}
//                               />
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="email"
//                                 type="email"
//                                 placeholder="Email*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.email}
//                               />
//                             </div>
//                           </div>

//                           <div
//                             className="form-group"
//                             style={{ borderBottom: " 1px solid #000" }}
//                           >
//                             <div className="input-wrapper-full">
//                               <input
//                                 name="streetAddress"
//                                 type="text"
//                                 placeholder="Street Address*"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.streetAddress}
//                               />
//                             </div>
//                           </div>

//                           <div className="form-group">
//                             <div className="input-wrapper">
//                               <select
//                                 name="brand"
//                                 value={formData.brand}
//                                 onChange={handleInputChange}
//                               >
//                                 <option value="option1">Brand</option>
//                                 <option value="option2">Option2</option>
//                                 <option value="option3">Option3</option>
//                               </select>
//                             </div>
//                             <div className="input-wrapper">
//                               <input
//                                 name="serialNumber"
//                                 type="text"
//                                 placeholder="Serial Number"
//                                 required
//                                 onChange={handleInputChange}
//                                 value={formData?.serialNumber}
//                               />
//                             </div>
//                           </div>

//                           <div className="input-wrapper-full">
//                             <textarea
//                               name="message"
//                               placeholder="How can we help?*"
//                               required
//                               onChange={handleInputChange}
//                               value={formData?.message}
//                             ></textarea>
//                           </div>

//                           <div className="file-upload">
//                             <label>Proof of Purchase</label>
//                             <input type="file" />
//                           </div>

//                           <button
//                             className="flex-row-center-center  submit ui button"
//                             type="submit"
//                             disabled={isSubmitting}
//                           >
//                             {isSubmitting ? "Submitting..." : "Submit"}
//                           </button>
//                         </form>
//                         <br />
//                         <br />
//                         <br />
//                       </div>
//                     </motion.div>
//                   )}
//                   {/* Other tabs (trade, service, warranty) with updated brand dropdowns */}
//                   {/* ... (rest of the tabs remain the same with the updated brand dropdowns) ... */}
//                 </AnimatePresence>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </motion.section>
//     </motion.div>
//   );
// };

// export default ContactUs;

"use client";
import "./contactus.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useContactUs, useProductsAndBrands } from "./hooks/useContactUs";

// Lazy load the AddressDetails component
const AddressDetails = dynamic(() => import("./AddressDetails"), {
  loading: () => <p>Loading address information...</p>,
  ssr: false,
});

const ContactUs = () => {
  const [tab, setTab] = useState("sales");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const initialFormData = {
    loggedEmail: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    deliveryOption: "",
    streetAddress: "",
    suburb: "",
    state: "",
    postcode: "",
    message: "",
    brand: "",
    product: "",
    industry: "",
    serialNumber: "",
    tab: tab,
  };

  const [formData, setFormData] = useState(initialFormData);
  const { mutate, isLoading, isError, isSuccess, error, data } = useContactUs();
  console.log("isSuccess", isSuccess, "data", data);
  const { data: productsAndBrandsData, isLoading: isLoadingData } =
    useProductsAndBrands();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    // Process products and brands data when it's loaded
    if (productsAndBrandsData && productsAndBrandsData.length) {
      // Extract unique brands
      const uniqueBrands = [
        ...new Set(productsAndBrandsData.map((item) => item.brand_name)),
      ];
      setBrands(["Others", ...uniqueBrands]);
      setProducts(productsAndBrandsData);

      // Initially show all products
      setFilteredProducts(productsAndBrandsData);
    }
  }, [productsAndBrandsData]);

  useEffect(() => {
    // Filter products when brand changes
    if (formData.brand === "Others") {
      setFilteredProducts([{ product_name: "Others", brand_name: "Others" }]);
      setFormData((prev) => ({ ...prev, product: "Others" }));
    } else if (formData.brand) {
      const filtered = products.filter(
        (product) => product.brand_name === formData.brand
      );
      setFilteredProducts([
        ...filtered,
        { product_name: "Others", brand_name: formData.brand },
      ]);
    } else {
      setFilteredProducts(products);
    }
  }, [formData.brand, products]);

  useEffect(() => {
  if (isSuccess&&data) {
    // Check if either email or HubSpot was successful
    const isAnySuccess = data.success || 
                        data.result ||
                         data.result.emailSuccess || 
                          data.result.hubspotSuccess;
    console.log("isAnySuccess on FD", isAnySuccess);
    if (isAnySuccess) {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData(initialFormData);
      }, 3000);
    }
  }
}, [isSuccess, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If product is selected and it's not "Others", set the corresponding brand
    if (name === "product" && value !== "Others") {
      const selectedProduct = products.find((p) => p.product_name === value);
      if (selectedProduct) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          brand: selectedProduct.brand_name,
        }));
        return;
      }
    }

    // If product is "Others", keep the current brand
    if (name === "product" && value === "Others") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    // For all other cases
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add the current tab to the form data
    const formDataWithTab = {
      ...formData,
      tab: tab,
    };

    mutate(formDataWithTab);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: { opacity: 0, x: 20 },
  };

  if (!isMounted) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ backgroundColor: "#f7f7f5", margin: "50px 0" }}
    >
      <Head>
        <title>Contact Us</title>
        <link rel="stylesheet" href="/index.css" />
        <link rel="stylesheet" href="/contactus.css" />
      </Head>

      {/* Success Message Dialog */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="success-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-dialog"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="success-dialog-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="success-dialog-title">Enquiry Sent</h3>
              <p className="success-dialog-text">Our team will reach you shortly</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="contact-us" variants={itemVariants}>
        <motion.h1
          className="contactus-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "Satoru" }}
        >
          Contact Us
        </motion.h1>
      </motion.div>

      <motion.section variants={itemVariants}>
        <AddressDetails />
      </motion.section>

      <motion.section variants={itemVariants}>
        <div className="contactus-form">
          <div className="container">
            <div
              id="tabList"
              role="tablist"
              aria-label="rowdescription"
              className="contactforms"
            >
              <motion.div variants={itemVariants}>
                <div className="tab-list">
                  {["sales", "trade", "service", "warranty"].map((tabName) => (
                    <motion.span
                      key={tabName}
                      className={`tablist-text ${
                        tab === tabName ? "active" : ""
                      }`}
                      onClick={() => {
                        setTab(tabName);
                        setFormData(initialFormData);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tabName === "sales" && "Sales Enquiry"}
                      {tabName === "trade" && "Trade Enquiry"}
                      {tabName === "service" && "Service Enquiry"}
                      {tabName === "warranty" && "Warranty Claim"}
                    </motion.span>
                  ))}
                </div>
                <div className="lineeleven_one"></div>
              </motion.div>

              <motion.div
                id="tabpanel01"
                role="tabpanel"
                aria-labelledby="tab01"
                className="column_one tabcontent"
                variants={containerVariants}
              >
                <AnimatePresence mode="wait">
                  {tab === "sales" && (
                    <motion.div
                      key="sales"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <form className="service-form" onSubmit={handleSubmit}>
                        <motion.p
                          className="form-description"
                          variants={itemVariants}
                        >
                          To get more information about a specific product or to
                          receive a quote, fill out the form and our care team
                          will get in touch.
                        </motion.p>

                        <motion.div
                          className="form-group"
                          variants={itemVariants}
                        >
                          <div className="input-wrapper">
                            <input
                              name="firstName"
                              type="text"
                              placeholder="First Name*"
                              required
                              onChange={handleInputChange}
                              value={formData?.firstName}
                            />
                          </div>
                          <div className="input-wrapper">
                            <input
                              name="lastName"
                              type="text"
                              placeholder="Last Name*"
                              required
                              onChange={handleInputChange}
                              value={formData?.lastName}
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          className="form-group"
                          variants={itemVariants}
                        >
                          <div className="input-wrapper">
                            <input
                              name="phoneNumber"
                              type="text"
                              placeholder="Phone Number*"
                              required
                              onChange={handleInputChange}
                              value={formData?.phoneNumber}
                            />
                          </div>
                          <div className="input-wrapper">
                            <input
                              name="email"
                              type="email"
                              placeholder="Email*"
                              required
                              onChange={handleInputChange}
                              value={formData?.email}
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          className="form-group"
                          variants={itemVariants}
                        >
                          <div className="input-wrapper">
                            <input
                              name="deliveryOption"
                              type="text"
                              placeholder="Pickup or delivery?"
                              required
                              onChange={handleInputChange}
                              value={formData?.deliveryOption}
                            />
                          </div>
                          <div className="input-wrapper">
                            <input
                              name="postcode"
                              type="text"
                              placeholder="Postcode*"
                              required
                              onChange={handleInputChange}
                              value={formData?.postcode}
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          className="form-group"
                          variants={itemVariants}
                        >
                          <div className="input-wrapper">
                            <select
                              name="brand"
                              value={formData.brand}
                              onChange={handleInputChange}
                              disabled={isLoadingData}
                            >
                              <option value="">Select Brand</option>
                              {brands.map((brand, index) => (
                                <option key={index} value={brand}>
                                  {brand}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="input-wrapper">
                            <select
                              name="product"
                              value={formData.product}
                              onChange={handleInputChange}
                              disabled={isLoadingData || !formData.brand}
                            >
                              <option value="">Select Product</option>
                              {filteredProducts.map((product, index) => (
                                <option
                                  key={index}
                                  value={product.product_name}
                                >
                                  {product.product_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </motion.div>

                        <motion.div
                          className="input-wrapper-full"
                          variants={itemVariants}
                        >
                          <textarea
                            name="message"
                            placeholder="How can we help?*"
                            required
                            onChange={handleInputChange}
                            value={formData?.message}
                          ></textarea>
                        </motion.div>

                        <motion.div
                          className="columnsubmit"
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            className="submit"
                            type="submit"
                            disabled={isSubmitting || isLoading}
                          >
                            {isSubmitting || isLoading
                              ? "Submitting..."
                              : "Submit"}
                          </button>
                        </motion.div>
                      </form>
                    </motion.div>
                  )}
                  {tab === "trade" && (
                    <motion.div
                      key="trade"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div
                        id="tabpanel01"
                        role="tabpanel"
                        aria-labelledby="tab01"
                        className="column_one tabcontent"
                      >
                        <form className="service-form" onSubmit={handleSubmit}>
                          <p className="form-description ui text">
                            If you are an architect, builder, landscaper or
                            installer and you have an enquiry or need any
                            assistance, speak to our team by filling out the
                            form below. You can also visit our industry hub to
                            find spec sheets and installation manuals. To sign
                            up for a trade account, you can visit
                            our trades page.
                          </p>
                          <div className="form-group">
                            <div className="input-wrapper">
                              <input
                                name="firstName"
                                type="text"
                                placeholder="First Name*"
                                required
                                onChange={handleInputChange}
                                value={formData?.firstName}
                              />
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name*"
                                required
                                onChange={handleInputChange}
                                value={formData?.lastName}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-wrapper">
                              <input
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone Number*"
                                required
                                onChange={handleInputChange}
                                value={formData?.phoneNumber}
                              />
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="email"
                                type="email"
                                placeholder="Email*"
                                required
                                onChange={handleInputChange}
                                value={formData?.email}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-wrapper">
                              <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleInputChange}
                              >
                                <option value="option1">Industry</option>
                                <option value="option2">Option2</option>
                                <option value="option3">Option3</option>
                              </select>
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="postcode"
                                type="text"
                                placeholder="Postcode*"
                                required
                                onChange={handleInputChange}
                                value={formData?.postcode}
                              />
                            </div>
                          </div>

                          <div className="input-wrapper-full">
                            <textarea
                              name="message"
                              placeholder="How can we help?*"
                              required
                              onChange={handleInputChange}
                              value={formData?.message}
                            ></textarea>
                          </div>
                          <div className="columnsubmit">
                            <button
                              className="flex-row-center-center  submit ui button"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                          </div>
                        </form>
                        <br />
                        <br />
                        <br />
                      </div>
                    </motion.div>
                  )}

                  {tab === "service" && (
                    <motion.div
                      key="service"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div
                        id="tabpanel01"
                        role="tabpanel"
                        aria-labelledby="tab01"
                        className="column_one tabcontent"
                      >
                        <form className="service-form" onSubmit={handleSubmit}>
                          <p className="form-description ui text">
                            For assistance or to schedule a service, contact us
                            at 03 99 777 888 or fill out the form below. We are
                            here to help you enjoy your fireplace at its very
                            best!
                          </p>
                          <div className="form-group">
                            <div className="input-wrapper">
                              <input
                                name="firstName"
                                type="text"
                                placeholder="First Name*"
                                required
                                onChange={handleInputChange}
                                value={formData?.firstName}
                              />
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name*"
                                required
                                onChange={handleInputChange}
                                value={formData?.lastName}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-wrapper">
                              <input
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone Number*"
                                required
                                onChange={handleInputChange}
                                value={formData?.phoneNumber}
                              />
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="email"
                                type="email"
                                placeholder="Email*"
                                required
                                onChange={handleInputChange}
                                value={formData?.email}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-wrapper">
                              <input
                                name="streetAddress"
                                type="text"
                                placeholder="Street Address*"
                                required
                                onChange={handleInputChange}
                                value={formData?.streetAddress}
                              />
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="suburb"
                                type="text"
                                placeholder="Suburb*"
                                required
                                onChange={handleInputChange}
                                value={formData?.suburb}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-wrapper">
                              <input
                                name="state"
                                type="text"
                                placeholder="State*"
                                required
                                onChange={handleInputChange}
                                value={formData?.state}
                              />
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="postcode"
                                type="text"
                                placeholder="Postcode*"
                                required
                                onChange={handleInputChange}
                                value={formData?.postcode}
                              />
                            </div>
                          </div>

                          <div className="input-wrapper-full">
                            <textarea
                              name="message"
                              placeholder="How can we help?*"
                              required
                              onChange={handleInputChange}
                              value={formData?.message}
                            ></textarea>
                          </div>

                          <div className="form-group">
                            <div className="input-wrapper">
                              <select
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                              >
                                <option value="option1">Brand</option>
                                <option value="option2">Option2</option>
                                <option value="option3">Option3</option>
                              </select>
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="serialNumber"
                                type="text"
                                placeholder="Serial Number"
                                required
                                onChange={handleInputChange}
                                value={formData?.serialNumber}
                              />
                            </div>
                          </div>

                          <div className="file-upload">
                            <label>Proof of Purchase</label>
                            <input type="file" />
                          </div>
                          <button
                            className="flex-row-center-center  submit ui button"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                        </form>
                        <br />
                        <br />
                        <br />
                      </div>
                    </motion.div>
                  )}

                  {tab === "warranty" && (
                    <motion.div
                      key="warranty"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div
                        id="tabpanel01"
                        role="tabpanel"
                        aria-labelledby="tab01"
                        className="column_one tabcontent"
                      >
                        <form className="service-form" onSubmit={handleSubmit}>
                          <p className="form-description ui text">
                            To make a warranty claim or to get more information,
                            fill out the form and our care team
                            will get in touch.
                          </p>
                          <div className="form-group">
                            <div className="input-wrapper">
                              <input
                                name="firstName"
                                type="text"
                                placeholder="First Name*"
                                required
                                onChange={handleInputChange}
                                value={formData?.firstName}
                              />
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name*"
                                required
                                onChange={handleInputChange}
                                value={formData?.lastName}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-wrapper">
                              <input
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone Number*"
                                required
                                onChange={handleInputChange}
                                value={formData?.phoneNumber}
                              />
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="email"
                                type="email"
                                placeholder="Email*"
                                required
                                onChange={handleInputChange}
                                value={formData?.email}
                              />
                            </div>
                          </div>

                          <div
                            className="form-group"
                            style={{ borderBottom: " 1px solid #000" }}
                          >
                            <div className="input-wrapper-full">
                              <input
                                name="streetAddress"
                                type="text"
                                placeholder="Street Address*"
                                required
                                onChange={handleInputChange}
                                value={formData?.streetAddress}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-wrapper">
                              <select
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                              >
                                <option value="option1">Brand</option>
                                <option value="option2">Option2</option>
                                <option value="option3">Option3</option>
                              </select>
                            </div>
                            <div className="input-wrapper">
                              <input
                                name="serialNumber"
                                type="text"
                                placeholder="Serial Number"
                                required
                                onChange={handleInputChange}
                                value={formData?.serialNumber}
                              />
                            </div>
                          </div>

                          <div className="input-wrapper-full">
                            <textarea
                              name="message"
                              placeholder="How can we help?*"
                              required
                              onChange={handleInputChange}
                              value={formData?.message}
                            ></textarea>
                          </div>

                          <div className="file-upload">
                            <label>Proof of Purchase</label>
                            <input type="file" />
                          </div>

                          <button
                            className="flex-row-center-center  submit ui button"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                        </form>
                        <br />
                        <br />
                        <br />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Add CSS for success dialog */}
      <style jsx>{`
        .success-dialog-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.25);
          z-index: 1200;
        }
        .success-dialog {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 2.5rem 2rem 2rem 2rem;
          min-width: 320px;
          max-width: 90vw;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .success-dialog-icon {
          width: 56px;
          height: 56px;
          background: #4caf50;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }
        .success-dialog-icon svg {
          width: 32px;
          height: 32px;
          color: #fff;
        }
        .success-dialog-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #222;
        }
        .success-dialog-text {
          color: #555;
          font-size: 1rem;
          margin: 0;
        }
      `}</style>
    </motion.div>
  );
};

export default ContactUs;
