import Categories from "../models/category.model.js";

export const getCategories = async (req, res,next) => {
  try {
    const categories = await Categories.find()
    res.status(200).send(categories);
  } catch (err) {
    next(err);
  }
};

// export const createCategories = async (req, res, next) => {
  
//     const newCategory = new Categories({
//       title: "Illustration",
//       desc: "Color you dreams",
//       img: "https://images.pexels.com/photos/15032623/pexels-photo-15032623.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//       cat: "design",
//     });

//     try{
//         const savedCategory = await newCategory.save();
//         res.status(201).send("Category has been added");
//     }catch(err){
//         next(err);
//     }
// };
