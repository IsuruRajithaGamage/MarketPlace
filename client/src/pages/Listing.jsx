import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Listing() {
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
      {listing && !loading && !error && <h1>{listing.name}</h1>}
    </main>
  );
}