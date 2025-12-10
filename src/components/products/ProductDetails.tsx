import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <p>Details for product ID: {id}</p>
    </div>
  );
};

export default ProductDetails;
