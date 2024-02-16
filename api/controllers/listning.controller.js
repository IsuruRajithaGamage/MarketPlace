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

export const getListings = async (req, res, next) => {
  try {
    const limits = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    const furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    const parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    const type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listning.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limits)
      .skip(startIndex);

      res.status(200).json(listings)
  } catch (error) {
    next(error);
  }
};
