const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Customer = require("../models/customers.js");
const Deliver = require("../models/delivered.js");
const Menu = require("../models/menu.js");
const Order = require("../models/orders.js");
const Admin = require("../models/admin.js");
const Rating = require("../models/ratings.js");

router.get("", wrapAsync(async (req, res) => {
  let totalItems = await Menu.countDocuments();
  let totalCustomers = await Customer.countDocuments();
  let totalOrders = await Order.countDocuments();
  let adminName = await Admin.findById(req.session.adminId);
  adminName = adminName.name;
  
  
  const result = await Deliver.aggregate([
    {
      $group: {
        _id: null,                         // No grouping key, so we get a single result
        totalAmount: { $sum: "$totalAmount" }  // Sum all totalAmount fields
      }
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1                     // Only include the totalAmount in the result
      }
    }
  ]);
  let response = [
    totalItems,
    totolIncome = result[0].totalAmount,
    totalCustomers,
    totalOrders,
    adminName
]
  
  res.status(200).json({response})
}))

router.get("/income_data", wrapAsync(async (req, res) => {
    Deliver.aggregate([
        {
            $group: {
                _id: { $dateTrunc: { unit: "day", date: "$date" } }, // Truncate date to day level
                totalAmount: { $sum: "$totalAmount" } // Sum totalAmount for each day
            }
        },
        {
            $sort: { _id: -1 } // Sort by date in descending order to get the latest dates first
        },
        {
            $limit: 7 // Limit to the most recent 7 days
        },
        {
            $sort: { _id: 1 } // Sort by date in ascending order for final output
        }
    ])
    .then(async (result) => {
        let newResult = result.map(item => ({
            ...item,
            _id: item._id.toString().split(" ").slice(0,1).join("")
          }));
        res.status(200).json({newResult});
    })
    .catch(error => {
        console.error(error);
    });
    
}))

router.get("/sales_data", wrapAsync(async (req, res) => {
  try {
    const result = await Deliver.aggregate([
      // Unwind the items array to work with each item individually
      { $unwind: "$items" },

      // Lookup to join with Menu collection based on itemId in Deliver and _id in Menu
      {
        $lookup: {
          from: "menus",           // Menu collection name in the database
          localField: "items.itemId", 
          foreignField: "_id",
          as: "menuInfo",
        },
      },
      
      // Unwind the menuInfo array to get each item's info
      { $unwind: "$menuInfo" },

      // Group by category and calculate total sales for each, factoring in the discount
      {
        $group: {
          _id: "$menuInfo.category", 
          totalSales: {
            $sum: { 
              $multiply: [
                "$items.quantity",
                { 
                  $subtract: [
                    "$menuInfo.price", 
                    { $multiply: ["$menuInfo.price", { $divide: ["$menuInfo.discount", 100] }] }
                  ]
                }
              ]
            }
          }
        }
      },

      // Optionally, sort results by totalSales in descending order
      { $sort: { totalSales: -1 } }
    ]);
    // console.log("Total Sales by Category with Discounts:", result);
    res.status(200).json({result});
  } catch (error) {
    console.error("Error calculating total amount by category:", error);
  }
}))

router.get("/top_items", wrapAsync(async (req, res) => {
  try {
    const result = await Deliver.aggregate([
      // Unwind the items array to work with each item individually
      { $unwind: "$items" },

      // Group by itemId to accumulate quantity and total amount
      {
        $group: {
          _id: "$items.itemId",                 // Group by itemId
          totalQuantity: { $sum: "$items.quantity" }, // Sum quantity for each item
          totalAmount: { $sum: "$totalAmount" }       // Sum totalAmount for each item
        }
      },

      { $sort: { totalQuantity: -1 } },

      // Lookup to get item details from the Menu collection
      {
        $lookup: {
          from: "menus",                // Name of the Menu collection
          localField: "_id",            // Field in Deliver schema to match
          foreignField: "_id",          // Field in Menu collection to match
          as: "itemDetails"             // Output array of matched documents
        }
      },

      // Unwind itemDetails to access the item's name and details
      { $unwind: "$itemDetails" },

      // Project the result to include item details
      {
        $project: {
          _id: 0,
          itemId: "$_id",
          itemName: "$itemDetails.itemName",
          itemPrice: "$itemDetails.price", 
          imageUrl: "$itemDetails.image.url",
          totalQuantity: 1,
          totalAmount: 1
        }
      },
      {
        $limit: 4 // Limit to the most recent 4 days
    },
    ]);

    res.status(200).json({result})
  } catch (error) {
    console.error("Error calculating total by item:", error);
  }
}))

router.get("/rating_data", wrapAsync(async (req, res) => {
    try{
      const result = await Rating.aggregate([
        {
          $project: {
            itemId: 1,
            averageRating: { $avg: "$rating" }
          }
        },
        {
          $addFields: {
            ceilingRating: { $ceil: "$averageRating" }
          }
        },
        {
          $group: {
            _id: "$ceilingRating",
            totalCount: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
      console.log(result);
      res.status(200).json({result})
      } catch (error) {
        console.error("Error calculating average ratings grouped with count:", error);
      }
    }));


// router.get("/menu/update", async(req, res) => {
//   // let MenuData = await Menu.find().sort({ _id: 1 });;
//   let ratingData = await Rating.find().sort({ itemId: 1 }); 
  
//   let updateData = []
//   for(item of ratingData){
//     updateData.push({
//       updateOne: {
//         filter: { _id: item.itemId },
//         update: { $set : { rating : item._id } }
//       }
//     })
//   }

//   // console.log(updateData[0].updateOne.update);
  

//   let result = await Menu.bulkWrite(updateData);
//   console.log(result);
  
  
//   res.send(result)
  
// })


module.exports = router