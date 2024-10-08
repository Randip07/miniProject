const menu = [
  // Appetizers
  {
    itemID: 11101,
    itemName: "Paneer Tikka",
    itemDetails: "Grilled paneer marinated in Indian spices",
    price: 220,
    category: "Appetizers",
    discount: 35,
    rating: [4.5, 4.2, 4.8, 4.6, 4.7, 4.4, 4.9, 4.3, 4.5, 4.6],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11102,
    itemName: "Vegetable Spring Rolls",
    itemDetails: "Crispy rolls stuffed with vegetables",
    price: 180,
    category: "Appetizers",
    discount: 35,
    rating: [4.1, 4.3, 4.4, 4.5, 4.6, 4.2, 4.0, 4.3, 4.7, 4.1],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11103,
    itemName: "Chicken Seekh Kebab",
    itemDetails: "Minced chicken mixed with spices and grilled",
    price: 280,
    category: "Appetizers",
    discount: 35,
    rating: [4.8, 4.7, 4.6, 4.9, 5.0, 4.9, 4.7, 4.8, 4.9, 4.6],
    availability: "available",
    type: "Non-Veg",
  },
  {
    itemID: 11104,
    itemName: "Mutton Shami Kebab",
    itemDetails: "Slow-cooked mutton patties with Indian spices",
    price: 350,
    category: "Appetizers",
    discount: 35,
    rating: [4.7, 4.8, 4.6, 4.9, 4.7, 4.5, 4.9, 4.6, 4.8, 4.7],
    availability: "available",
    type: "Non-Veg",
  },
  {
    itemID: 11105,
    itemName: "Aloo Chaat",
    itemDetails: "Crispy potatoes with tangy chutneys",
    price: 150,
    category: "Appetizers",
    discount: 35,
    rating: [4.0, 4.1, 4.2, 4.3, 4.4, 4.2, 4.3, 4.5, 4.1, 4.2],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11106,
    itemName: "Veg Manchurian",
    itemDetails: "Crispy vegetable balls in tangy sauce",
    price: 190,
    category: "Appetizers",
    discount: 35,
    rating: [4.5, 4.3, 4.2, 4.8, 4.7, 4.9, 4.1, 4.4, 4.6, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11107,
    itemName: "Chicken Lollipop",
    itemDetails: "Crispy chicken wings coated with spicy batter",
    price: 220,
    category: "Appetizers",
    discount: 35,
    rating: [4.6, 4.8, 4.4, 4.5, 4.9, 4.7, 4.2, 4.1, 4.8, 4.6],
    availability: "available",
    type: "Non-Veg",
  },
  {
    itemID: 11108,
    itemName: "Samosa Chaat",
    itemDetails: "Samosa with curd, tamarind, and mint chutney",
    price: 120,
    category: "Appetizers",
    discount: 35,
    rating: [4.3, 4.4, 4.5, 4.1, 4.2, 4.6, 4.0, 4.7, 4.8, 4.4],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11109,
    itemName: "Hara Bhara Kebab",
    itemDetails: "Green vegetable kebabs with mint chutney",
    price: 170,
    category: "Appetizers",
    discount: 35,
    rating: [4.5, 4.6, 4.7, 4.1, 4.3, 4.2, 4.8, 4.9, 4.4, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11110,
    itemName: "Fish Amritsari",
    itemDetails: "Batter-fried fish in Amritsari spices",
    price: 260,
    category: "Appetizers",
    discount: 35,
    rating: [4.8, 4.9, 5.0, 4.7, 4.6, 4.8, 4.5, 4.6, 4.9, 4.8],
    availability: "available",
    type: "Non-Veg",
  },

  // Main Course
  {
    itemID: 11111,
    itemName: "Butter Chicken",
    itemDetails: "Chicken cooked in a creamy tomato sauce",
    price: 400,
    category: "Main-Course",
    discount: 35,
    rating: [4.9, 4.8, 5.0, 4.7, 4.6, 4.5, 4.8, 4.9, 4.7, 4.6],
    availability: "available",
    type: "Non-Veg",
  },
  {
    itemID: 11112,
    itemName: "Paneer Butter Masala",
    itemDetails: "Paneer cubes cooked in a rich tomato gravy",
    price: 300,
    category: "Main-Course",
    discount: 35,
    rating: [4.7, 4.6, 4.8, 4.5, 4.9, 4.4, 4.3, 4.5, 4.6, 4.7],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11113,
    itemName: "Chicken Biryani",
    itemDetails: "Basmati rice cooked with spiced chicken",
    price: 350,
    category: "Main-Course",
    discount: 35,
    rating: [4.8, 4.9, 5.0, 4.7, 4.6, 4.8, 4.5, 4.7, 4.9, 4.8],
    availability: "available",
    type: "Non-Veg",
  },
  {
    itemID: 11114,
    itemName: "Dal Makhani",
    itemDetails: "Slow-cooked black lentils in creamy gravy",
    price: 220,
    category: "Main-Course",
    discount: 35,
    rating: [4.4, 4.5, 4.6, 4.2, 4.1, 4.7, 4.5, 4.3, 4.5, 4.4],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11115,
    itemName: "Fish Curry",
    itemDetails: "Fresh fish cooked in tangy curry sauce",
    price: 370,
    category: "Main-Course",
    discount: 35,
    rating: [4.6, 4.7, 4.9, 4.8, 4.5, 4.7, 4.3, 4.6, 4.9, 4.8],
    availability: "available",
    type: "Non-Veg",
  },
  {
    itemID: 11116,
    itemName: "Mutton Rogan Josh",
    itemDetails: "Tender mutton cooked in Kashmiri style",
    price: 450,
    category: "Main-Course",
    discount: 35,
    rating: [4.9, 5.0, 4.8, 4.7, 4.6, 4.9, 4.8, 4.7, 4.6, 4.9],
    availability: "available",
    type: "Non-Veg",
  },
  {
    itemID: 11117,
    itemName: "Palak Paneer",
    itemDetails: "Cottage cheese cooked with spinach puree",
    price: 260,
    category: "Main-Course",
    discount: 35,
    rating: [4.6, 4.7, 4.8, 4.3, 4.4, 4.5, 4.9, 4.8, 4.7, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11118,
    itemName: "Chole Bhature",
    itemDetails: "Spicy chickpeas served with fried bread",
    price: 180,
    category: "Main-Course",
    discount: 35,
    rating: [4.2, 4.3, 4.4, 4.5, 4.6, 4.4, 4.3, 4.5, 4.6, 4.2],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11119,
    itemName: "Egg Curry",
    itemDetails: "Boiled eggs cooked in rich tomato gravy",
    price: 250,
    category: "Main-Course",
    discount: 35,
    rating: [4.5, 4.6, 4.7, 4.4, 4.3, 4.5, 4.6, 4.7, 4.8, 4.4],
    availability: "available",
    type: "Non-Veg",
  },
  {
    itemID: 11120,
    itemName: "Malai Kofta",
    itemDetails: "Soft dumplings in rich creamy gravy",
    price: 280,
    category: "Main-Course",
    discount: 35,
    rating: [4.8, 4.7, 4.9, 4.6, 4.5, 4.9, 4.8, 4.7, 4.6, 4.8],
    availability: "available",
    type: "Veg",
  },

  // Beverages
  {
    itemID: 11121,
    itemName: "Mango Lassi",
    itemDetails: "Chilled yogurt drink with mango flavor",
    price: 120,
    category: "Beverages",
    discount: 35,
    rating: [4.6, 4.7, 4.8, 4.3, 4.5, 4.9, 4.8, 4.7, 4.6, 4.7],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11122,
    itemName: "Masala Chai",
    itemDetails: "Indian spiced tea with milk",
    price: 50,
    category: "Beverages",
    discount: 35,
    rating: [4.8, 4.9, 4.7, 4.6, 4.4, 4.5, 4.7, 4.6, 4.8, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11123,
    itemName: "Cold Coffee",
    itemDetails: "Chilled coffee with ice cream",
    price: 150,
    category: "Beverages",
    discount: 35,
    rating: [4.5, 4.4, 4.3, 4.7, 4.8, 4.9, 4.5, 4.6, 4.7, 4.3],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11124,
    itemName: "Sweet Lassi",
    itemDetails: "Sweetened yogurt-based drink",
    price: 100,
    category: "Beverages",
    discount: 35,
    rating: [4.7, 4.6, 4.9, 4.8, 4.3, 4.2, 4.6, 4.7, 4.8, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11125,
    itemName: "Fresh Lime Soda",
    itemDetails: "Lemon soda with a pinch of salt",
    price: 90,
    category: "Beverages",
    discount: 35,
    rating: [4.2, 4.3, 4.5, 4.6, 4.7, 4.4, 4.5, 4.8, 4.6, 4.3],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11126,
    itemName: "Thandai",
    itemDetails: "Traditional Indian spiced milk drink",
    price: 130,
    category: "Beverages",
    discount: 35,
    rating: [4.5, 4.4, 4.3, 4.7, 4.8, 4.9, 4.5, 4.6, 4.7, 4.3],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11127,
    itemName: "Buttermilk",
    itemDetails: "Light and savory Indian drink made from yogurt",
    price: 60,
    category: "Beverages",
    discount: 35,
    rating: [4.7, 4.6, 4.9, 4.8, 4.3, 4.2, 4.6, 4.7, 4.8, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11128,
    itemName: "Coconut Water",
    itemDetails: "Fresh coconut water",
    price: 80,
    category: "Beverages",
    discount: 35,
    rating: [4.4, 4.5, 4.6, 4.3, 4.7, 4.8, 4.9, 4.2, 4.4, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11129,
    itemName: "Orange Juice",
    itemDetails: "Freshly squeezed orange juice",
    price: 100,
    category: "Beverages",
    discount: 35,
    rating: [4.9, 4.8, 4.5, 4.6, 4.7, 4.5, 4.4, 4.8, 4.3, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11130,
    itemName: "Black Coffee",
    itemDetails: "Freshly brewed black coffee",
    price: 120,
    category: "Beverages",
    discount: 35,
    rating: [4.3, 4.5, 4.6, 4.7, 4.8, 4.9, 4.5, 4.7, 4.8, 4.5],
    availability: "available",
    type: "Veg",
  },

  // Ice-Cream
  {
    itemID: 11131,
    itemName: "Vanilla Ice Cream",
    itemDetails: "Classic vanilla flavored ice cream",
    price: 80,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.8, 4.9, 4.7, 4.6, 4.5, 4.9, 4.8, 4.7, 4.6, 4.8],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11132,
    itemName: "Chocolate Ice Cream",
    itemDetails: "Rich chocolate flavored ice cream",
    price: 100,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.9, 5.0, 4.8, 4.7, 4.6, 4.9, 5.0, 4.8, 4.7, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11133,
    itemName: "Mango Ice Cream",
    itemDetails: "Creamy ice cream with mango flavor",
    price: 90,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.6, 4.7, 4.9, 4.5, 4.4, 4.8, 4.9, 4.6, 4.7, 4.8],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11134,
    itemName: "Butterscotch Ice Cream",
    itemDetails: "Butterscotch flavored creamy ice cream",
    price: 100,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.7, 4.6, 4.8, 4.5, 4.3, 4.7, 4.8, 4.9, 4.6, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11135,
    itemName: "Strawberry Ice Cream",
    itemDetails: "Fresh strawberry flavored ice cream",
    price: 90,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.6, 4.7, 4.9, 4.8, 4.3, 4.2, 4.6, 4.7, 4.8, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11136,
    itemName: "Kulfi",
    itemDetails: "Traditional Indian frozen dessert",
    price: 120,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.8, 4.9, 5.0, 4.7, 4.6, 4.9, 4.8, 4.7, 4.6, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11137,
    itemName: "Pistachio Ice Cream",
    itemDetails: "Ice cream with crunchy pistachios",
    price: 100,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.7, 4.8, 4.6, 4.5, 4.9, 4.8, 4.7, 4.9, 4.6, 4.7],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11138,
    itemName: "Choco-Chip Ice Cream",
    itemDetails: "Chocolate ice cream with chocolate chips",
    price: 110,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.9, 4.8, 5.0, 4.7, 4.6, 4.9, 4.8, 4.7, 4.9, 5.0],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11139,
    itemName: "Coconut Ice Cream",
    itemDetails: "Creamy ice cream with coconut flavor",
    price: 120,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.5, 4.7, 4.8, 4.9, 4.6, 4.7, 4.5, 4.6, 4.8, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11140,
    itemName: "Blueberry Ice Cream",
    itemDetails: "Creamy ice cream with blueberry essence",
    price: 130,
    category: "Ice-Cream",
    discount: 35,
    rating: [4.4, 4.5, 4.7, 4.8, 4.9, 4.5, 4.6, 4.7, 4.8, 4.9],
    availability: "available",
    type: "Veg",
  },

  // Drinks
  {
    itemID: 11141,
    itemName: "Coca Cola",
    itemDetails: "Chilled soft drink",
    price: 50,
    category: "Drinks",
    discount: 35,
    rating: [4.4, 4.5, 4.3, 4.2, 4.5, 4.6, 4.7, 4.4, 4.3, 4.5],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11142,
    itemName: "Pepsi",
    itemDetails: "Chilled soft drink",
    price: 50,
    category: "Drinks",
    discount: 35,
    rating: [4.3, 4.4, 4.5, 4.2, 4.6, 4.5, 4.4, 4.6, 4.3, 4.4],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11143,
    itemName: "Sprite",
    itemDetails: "Lemon-lime flavored soft drink",
    price: 50,
    category: "Drinks",
    discount: 35,
    rating: [4.5, 4.6, 4.7, 4.2, 4.3, 4.5, 4.8, 4.5, 4.6, 4.7],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11144,
    itemName: "Fanta",
    itemDetails: "Orange flavored soft drink",
    price: 50,
    category: "Drinks",
    discount: 35,
    rating: [4.6, 4.7, 4.8, 4.3, 4.2, 4.4, 4.5, 4.8, 4.7, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11145,
    itemName: "Limca",
    itemDetails: "Lemon flavored soft drink",
    price: 50,
    category: "Drinks",
    discount: 35,
    rating: [4.7, 4.6, 4.5, 4.9, 4.8, 4.7, 4.8, 4.5, 4.4, 4.6],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11146,
    itemName: "Thums Up",
    itemDetails: "Cola flavored soft drink",
    price: 50,
    category: "Drinks",
    discount: 35,
    rating: [4.8, 4.9, 5.0, 4.7, 4.6, 4.5, 4.9, 4.8, 4.7, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11147,
    itemName: "Red Bull",
    itemDetails: "Energy drink with taurine",
    price: 150,
    category: "Drinks",
    discount: 35,
    rating: [4.9, 5.0, 4.7, 4.8, 4.9, 5.0, 4.6, 4.7, 4.8, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11148,
    itemName: "Gatorade",
    itemDetails: "Sports drink with electrolytes",
    price: 100,
    category: "Drinks",
    discount: 35,
    rating: [4.5, 4.6, 4.7, 4.8, 4.5, 4.6, 4.9, 4.8, 4.7, 4.6],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11149,
    itemName: "Mountain Dew",
    itemDetails: "Citrus flavored soft drink",
    price: 50,
    category: "Drinks",
    discount: 35,
    rating: [4.3, 4.4, 4.5, 4.8, 4.7, 4.6, 4.7, 4.5, 4.3, 4.8],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11150,
    itemName: "Aquafina",
    itemDetails: "Packaged drinking water",
    price: 30,
    category: "Drinks",
    discount: 35,
    rating: [4.7, 4.8, 4.9, 5.0, 4.5, 4.6, 4.7, 4.8, 4.5, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11151,
    itemName: "Extra Cheese",
    itemDetails: "Melted cheese topping for any dish",
    price: 40,
    category: "Add-On",
    discount: 35,
    rating: [4.7, 4.6, 4.8, 4.9, 4.7, 4.8, 4.5, 4.6, 4.8, 4.9, 4.5, 4.7],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11152,
    itemName: "Garlic Bread",
    itemDetails: "Toasted bread with garlic butter",
    price: 60,
    category: "Add-On",
    discount: 35,
    rating: [4.9, 4.8, 4.7, 4.6, 4.5, 4.7, 4.9, 5.0, 4.8, 4.7, 4.6, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11153,
    itemName: "French Fries",
    itemDetails: "Crispy fried potato sticks",
    price: 70,
    category: "Add-On",
    discount: 35,
    rating: [4.6, 4.5, 4.8, 4.7, 4.9, 5.0, 4.8, 4.7, 4.5, 4.9, 4.6, 4.7],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11154,
    itemName: "Salad",
    itemDetails: "Fresh garden salad with veggies",
    price: 50,
    category: "Add-On",
    discount: 35,
    rating: [4.7, 4.8, 4.9, 5.0, 4.6, 4.7, 4.5, 4.6, 4.8, 4.9, 4.7, 4.6],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11155,
    itemName: "Mashed Potatoes",
    itemDetails: "Creamy mashed potatoes with herbs",
    price: 60,
    category: "Add-On",
    discount: 35,
    rating: [4.8, 4.7, 4.9, 4.6, 4.5, 4.9, 5.0, 4.8, 4.7, 4.9, 4.6, 4.7],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11156,
    itemName: "Onion Rings",
    itemDetails: "Crispy fried onion rings",
    price: 50,
    category: "Add-On",
    discount: 35,
    rating: [4.6, 4.5, 4.8, 4.7, 4.9, 4.8, 4.7, 5.0, 4.6, 4.5, 4.7, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11157,
    itemName: "Pickles",
    itemDetails: "Assorted Indian pickles",
    price: 30,
    category: "Add-On",
    discount: 35,
    rating: [4.7, 4.6, 4.5, 4.8, 4.7, 4.9, 4.8, 4.5, 4.9, 4.7, 4.8, 4.9],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11158,
    itemName: "Gravy",
    itemDetails: "Thick, rich gravy to complement dishes",
    price: 40,
    category: "Add-On",
    discount: 35,
    rating: [4.5, 4.7, 4.6, 4.8, 4.9, 4.7, 4.6, 4.5, 4.9, 4.7, 4.8, 4.6],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11159,
    itemName: "Sautéed Vegetables",
    itemDetails: "Lightly sautéed fresh vegetables",
    price: 70,
    category: "Add-On",
    discount: 35,
    rating: [4.7, 4.8, 4.9, 4.6, 4.5, 4.7, 4.8, 4.9, 4.6, 4.7, 4.9, 4.6],
    availability: "available",
    type: "Veg",
  },
  {
    itemID: 11160,
    itemName: "Extra Mayo",
    itemDetails: "Creamy mayonnaise dip",
    price: 30,
    category: "Add-On",
    discount: 35,
    rating: [4.8, 4.7, 4.6, 4.9, 5.0, 4.7, 4.8, 4.9, 4.6, 4.7, 4.8, 4.9],
    availability: "available",
    type: "Veg",
  },
];

module.exports = { data: menu };
