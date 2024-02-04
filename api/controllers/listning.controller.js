import Listning from "../models/listning.model.js";
import { errorHandler } from "../utils/error.js";

export const createListning = async (req, res, next) => {
  try {
    const listning = await Listning.create(req.body);
    return res.status(201).json(listning);
  } catch (error) {
    next(error);
  }
};
console.log("hello");
export const deleteListning = async (req, res, next) => {
  const listing = await Listning.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listning not found"));
  }
  if (listing.userRef !== req.user.id) {
    return next(errorHandler(401, "You can delete only your listings"));
  }
  try {
    await Listning.findByIdAndDelete(req.params.id);
    res.status(200).json("Listning has been deleted");
  } catch (error) {
    next(error);
  }
};

export const editListing = async (req, res, next) => {
  const listing = await Listning.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found"));

  if (req.user.id !== listing.userRef)
    return next(401, "You can edit only your listings");

  try {
    const editedListing = await Listning.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(editedListing);
  } catch (error) {
    next(error);
  }
};
export const getListing = async (req, res, next) => {
  try {
    const listings = await Listning.findById(req.params.id);
    if (!listings) {
      return next(errorHandler(404, "Listning not found"));
    }
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
