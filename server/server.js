require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");


// ===============================
// Routes
// ===============================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const brandRoutes = require("./routes/brandRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const vendorRoutes = require("./routes/vendorRoutes");

const invoiceRoutes =
require("./routes/invoiceRoutes");

const adminRoutes =
require("./routes/adminRoute");




// ===============================
// Error Middleware
// ===============================

const {
    notFound,
    errorHandler,
} = require("./middleware/errorMiddleware");



// ===============================
// App Create
// ===============================

const app = express();



// ===============================
// Database Connection
// ===============================

connectDB();



// ===============================
// Global Middleware
// ===============================


app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    })
);



app.use(
    express.json()
);



app.use(
    express.urlencoded({
        extended:true
    })
);



app.use(
    cookieParser()
);


// ✅ Updated Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);



app.use(
    morgan("dev")
);


// ===============================
// Static Folder
// ===============================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ===============================
// API Routes
// ===============================


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/users",
    userRoutes
);


app.use(
    "/api/brands",
    brandRoutes
);


app.use(
    "/api/categories",
    categoryRoutes
);


app.use(
    "/api/products",
    productRoutes
);


app.use(
    "/api/cart",
    cartRoutes
);


app.use(
    "/api/wishlist",
    wishlistRoutes
);


app.use(
    "/api/orders",
    orderRoutes
);


app.use(
    "/api/reviews",
    reviewRoutes
);


app.use(
    "/api/dashboard",
    dashboardRoutes
);


app.use(
    "/api/payment",
    paymentRoutes
);

app.use("/api/orders/payment", paymentRoutes);


app.use(
    "/api/upload",
    uploadRoutes
);


app.use(
    "/api/admin",
    adminRoutes
);


app.use(
"/api/invoice",
invoiceRoutes
);








app.use("/api/vendor", vendorRoutes);

// ===============================
// Home Route
// ===============================


app.get(
    "/",
    (req,res)=>{

        res.status(200).json({

            success:true,

            message:
            "MERN E-Commerce Backend API Running Successfully 🚀"

        });

    }
);




// ===============================
// Health Check
// ===============================


app.get(
    "/api/health",
    (req,res)=>{


        res.status(200).json({

            success:true,

            database:
            mongoose.connection.readyState === 1
            ?
            "Connected"
            :
            "Disconnected",


            uptime:
            process.uptime(),


            timestamp:
            new Date()

        });


    }
);




// ===============================
// Error Handling
// ===============================


app.use(
    notFound
);


app.use(
    errorHandler
);




// ===============================
// Server Start
// ===============================


const PORT =
process.env.PORT || 5000;



app.listen(
    PORT,
    ()=>{


        console.log(`

=========================================
🚀 Server Running Successfully
=========================================
🌐 URL      : http://localhost:${PORT}
📦 ENV      : ${process.env.NODE_ENV}
💾 Database : MongoDB
=========================================

        `);


    }
);