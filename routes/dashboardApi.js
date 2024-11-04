const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Customer = require("../models/customers.js");
const Deliver = require("../models/delivered.js");
const Menu = require("../models/menu.js");

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
      
      // Lookup the category of each item from the Menu collection
      {
        $lookup: {
          from: "menus",                // Name of the Menu collection
          localField: "items.itemId",    // Field in Deliver schema to match
          foreignField: "_id",           // Field in Menu collection to match
          as: "itemDetails"              // Output array of matched documents
        }
      },

      // Unwind the itemDetails array to access each item's category
      { $unwind: "$itemDetails" },

      // Group by category and calculate the totalAmount per category
      {
        $group: {
          _id: "$itemDetails.category",  // Group by the category field from Menu
          totalAmount: { $sum: "$totalAmount" }  // Sum totalAmount for each category
        }
      },
      { $sort: { _id: 1 } },
      // Project the result to format the output
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalAmount: 1
        }
      }
    ]);
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
    try {
        const result = await Menu.aggregate([
          // Unwind the ratings array to create separate documents for each rating
          { $unwind: "$rating" },
    
          // Group by item ID to calculate average rating for each item
          {
            $group: {
              _id: "$_id",                              // Group by item ID
              itemName: { $first: "$itemName" },      // Get item name
              averageRating: { $avg: { $toInt: "$rating" } } // Calculate average rating
            }
          },
    
          // Project to include the ceiling of the average rating
          {
            $project: {
              _id: 0,
              itemId: "$_id",
              itemName: 1,
              averageRating: { $ceil: "$averageRating" } // Take ceiling value
            }
          },
    
          // Group by the rounded average rating
          {
            $group: {
              _id: "$averageRating",                   // Group by the average rating
              items: {                                 // Create an array of items with this average rating
                $push: {
                  itemId: "$itemId",
                  itemName: "$itemName"
                }
              },
              count: { $sum: 1 }                       // Count the number of items in this group
            }
          },
    
          // Project the results to display the grouped average ratings and items
          {
            $project: {
              _id: 0,
              averageRating: "$_id",
              items: 1,
              count: 1                                   // Include count of items
            }
          },
    
          // Sort by average rating in ascending order
          { $sort: { averageRating: 1 } }
        ]);
        res.status(200).json({result})
      } catch (error) {
        console.error("Error calculating average ratings grouped with count:", error);
      }
    }));


router.get("")
module.exports = router