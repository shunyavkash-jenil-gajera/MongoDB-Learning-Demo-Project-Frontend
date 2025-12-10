import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Gajera Mart</h1>
      <div className="flex space-x-4">
        <Link
          to="/products"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Products
        </Link>
        <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
