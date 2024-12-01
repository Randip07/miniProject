const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

const dashboardApiController = require("../controller/dashboardApiController.js");

// dashboard Overall Data
router.get("", wrapAsync(dashboardApiController.giveSummaryData));

// Income Data
router.get("/income_data", wrapAsync(dashboardApiController.giveIncomeData));

// Sales Data
router.get("/sales_data", wrapAsync(dashboardApiController.giveSalesData));

// Top Items Data
router.get("/top_items", wrapAsync(dashboardApiController.giveTopItemData));

// Rating Data
router.get("/rating_data", wrapAsync(dashboardApiController.giveRatingData));

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

module.exports = router;
