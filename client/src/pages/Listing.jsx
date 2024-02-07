import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listning/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong...</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${""}{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center gap-2 mt-6 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-2">
              <p className="bg-red-900 w-full max-w-[200px] rounded-md p-1 text-center text-white">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] rounded-md p-1 text-center text-white">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p>
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="flex text-sm items-center gap-4 sm:gap-6 flex-wrap">
              <li className="flex gap-1 items-center whitespace-nowrap text-green-900 font-semibold text-sm">
                <FaBed className="text-green-700 text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap text-green-900 font-semibold text-sm">
                <FaBath className="text-green-700 text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap text-green-900 font-semibold text-sm">
                <FaParking className="text-green-700 text-lg" />
                {listing.parking ? "Parking spot" : "No parking spot"}
              </li>
              <li className="flex gap-1 items-center whitespace-nowrap text-green-900 font-semibold text-sm">
                <FaChair className="text-green-700 text-lg" />
                {listing.furnished ? "furnished" : "unfurnished"}
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
