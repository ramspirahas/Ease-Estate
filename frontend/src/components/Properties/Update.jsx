import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    sellerName: "",
    contactNumber: "",
    description: "",
    propertyPhotos: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid Property ID");
      setLoading(false);
      return;
    }
  
    axios
      .get(`http://localhost:5001/PropertiesController/getproperty/${id}`)
      .then((response) => {
        console.log("Fetched Data:", response.data); 
        if (response.data && response.data.data) {
          setProperty({
            sellerName: response.data.data.sellerName || "",
            contactNumber: response.data.data.contactNumber || "",
            description: response.data.data.description || "",
            propertyPhotos: null, 
          });
        } else {
          setError("Property not found");
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to fetch property data");
      })
      .finally(() => setLoading(false));
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProperty((prev) => ({ ...prev, propertyPhotos: e.target.files[0] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in property) {
      formData.append(key, property[key]);
    }
    try {
      await axios.put(
        `http://localhost:5001/PropertiesController/updateproperty/${id}`,
        formData
      );
      alert("Property updated successfully!");
      navigate("/PropertyList");
    } catch (error) {
      console.error("Update Error:", error);
      setError("Failed to update property");
    }
  };

  if (loading) return <div>Loading property details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="sellerName"
          value={property.sellerName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Seller Name"
          required
        />
        <input
          type="text"
          name="contactNumber"
          value={property.contactNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Contact Number"
          required
        />
        <textarea
          name="description"
          value={property.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Property Description"
          required
        ></textarea>
        <input
          type="file"
          name="propertyPhotos"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
