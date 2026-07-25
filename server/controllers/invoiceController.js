const PDFDocument = require("pdfkit");

const Order = require("../models/orderModel");


// ==========================================
// Generate Invoice PDF
// GET /api/invoice/:id
// ==========================================

exports.generateInvoice = async (req,res)=>{


try{


const order = await Order.findById(req.params.id)
.populate(
"user",
"name email phone"
);



if(!order){

return res.status(404).json({

success:false,

message:"Order not found"

});

}




res.setHeader(
"Content-Type",
"application/pdf"
);


res.setHeader(
"Content-Disposition",
`attachment; filename=invoice-${order._id}.pdf`
);



const doc = new PDFDocument({

margin:50

});



doc.pipe(res);



// =============================
// Header
// =============================


doc
.fontSize(24)
.text(
"MERN E-Commerce",
{
align:"center"
}
);


doc.moveDown();


doc
.fontSize(18)
.text(
"Tax Invoice",
{
align:"center"
}
);



doc.moveDown(2);




// =============================
// Customer Details
// =============================


doc
.fontSize(12)
.text(
`Customer Name : ${order.shippingAddress.fullName}`
);


doc.text(
`Email : ${order.user.email}`
);


doc.text(
`Phone : ${order.shippingAddress.phone}`
);



doc.moveDown();



// =============================
// Order Details
// =============================


doc.text(
`Order ID : ${order._id}`
);


doc.text(
`Order Date : ${order.createdAt.toDateString()}`
);



doc.moveDown();



// =============================
// Shipping Address
// =============================


doc
.fontSize(14)
.text(
"Shipping Address"
);



doc.fontSize(12);


doc.text(

`${order.shippingAddress.address},
${order.shippingAddress.city},
${order.shippingAddress.state},
${order.shippingAddress.country}
-${order.shippingAddress.pincode}`

);



doc.moveDown();




// =============================
// Products
// =============================


doc
.fontSize(14)
.text(
"Products"
);



doc.moveDown();



order.products.forEach(
(item,index)=>{


doc.fontSize(12).text(

`${index+1}. ${item.name}
Qty: ${item.quantity}
Price: ₹${item.price}
Subtotal: ₹${item.subtotal}`

);


doc.moveDown();


}

);




// =============================
// Payment Summary
// =============================


doc.fontSize(14)
.text(
"Payment Summary"
);


doc.fontSize(12);



doc.text(

`Items Price : ₹${order.itemsPrice}`

);


doc.text(

`Tax : ₹${order.taxPrice}`

);


doc.text(

`Shipping : ₹${order.shippingPrice}`

);


doc.text(

`Total Amount : ₹${order.totalPrice}`

);



doc.moveDown();



doc.text(

`Payment Method :
${order.paymentMethod}`

);



doc.text(

`Payment Status :
${order.paymentStatus}`

);




// Footer


doc.moveDown(3);


doc
.fontSize(10)
.text(

"Thank you for shopping with us",

{
align:"center"
}

);



doc.end();



}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};