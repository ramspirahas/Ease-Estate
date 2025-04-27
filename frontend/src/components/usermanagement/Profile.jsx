import React, { useEffect, useState } from "react";
import axios from "axios";
import Appointments from "../AppointmentManagement/Appointment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBuilding, faBirthdayCake, faEdit, faSave, faTimes, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(""); // Handle errors
  const [loading, setLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({}); // Form data for edits
  const [activeTab, setActiveTab] = useState("profile"); // For tab navigation

  // Function to decode the JWT token
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Get the payload (second part of the token)
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload); // Parse the JSON string into an object
    } catch (error) {
      console.error('Error decoding JWT:', error); // Catch and log errors
      return null; // Return null if there's an issue with decoding
    }
  };
  
  // Fetch user details when the component mounts
  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // Get the token from localStorage

    if (!authToken) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    const decodedToken = decodeJwt(authToken); // Decode the JWT token to extract user info
    if (!decodedToken) {
      setError("Invalid or expired token.");
      setLoading(false);
      return;
    }

    const userId = decodedToken.id; // Use the user ID from the token
    if (!userId) {
      setError("User ID missing in the token.");
      setLoading(false);
      return;
    }

    // Set up axios request with authorization token
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/users/user/${userId}`, {
          headers: {
            "Authorization": `Bearer ${authToken}` // Send the token in the Authorization header
          }
        });

        setUser(response.data.data); // Set user data
        setFormData(response.data.data); // Set initial form data to current user data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error("Error fetching user details:", err); // Log the error if the request fails
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the corresponding field in form data
    });
  };

  // Handle form submission (Save Changes)
  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setError("You are not logged in.");
      return;
    }
    
    try {
      const userId = user._id;
      // Send the updated data to the backend
      const response = await axios.put(
        `http://localhost:5001/api/users/user/${userId}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${authToken}`, // Send the token in the Authorization header
          },
        }
      );

      setUser(response.data.data);
      setIsEditing(false); // Exit edit mode
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error saving changes:", err); // Log the error if the request fails
      setError("Failed to save changes.");
    }
  };

  // If still loading or if there's an error, display a message
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center text-red-600 font-semibold text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden mt-10">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 p-6 text-white">
        <h2 className="text-3xl font-bold">User Profile</h2>
        <p className="text-green-100">Manage your account and view appointments</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <nav className="flex">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`px-5 py-3 font-medium text-lg transition ${activeTab === "profile" ? "text-green-700 border-b-2 border-green-500" : "text-gray-500 hover:text-green-600"}`}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </button>
          <button 
            onClick={() => setActiveTab("appointments")}
            className={`px-5 py-3 font-medium text-lg transition ${activeTab === "appointments" ? "text-green-700 border-b-2 border-green-500" : "text-gray-500 hover:text-green-600"}`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            My Bookings
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === "profile" ? (
          <div className="space-y-6">
            {/* User Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)} 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isEditing 
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700" 
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
              
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <FontAwesomeIcon icon={faUser} className="text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{user.firstname} {user.lastname}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <FontAwesomeIcon icon={faEnvelope} className="text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <FontAwesomeIcon icon={faBuilding} className="text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium capitalize">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <FontAwesomeIcon icon={faBirthdayCake} className="text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="font-medium">{user.age} years</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveChanges} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input 
                        type="text" 
                        name="firstname"
                        value={formData.firstname || ''} 
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        name="lastname"
                        value={formData.lastname || ''} 
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email || ''} 
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input 
                        type="number" 
                        name="age"
                        value={formData.age || ''} 
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button 
                      type="submit" 
                      className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition"
                    >
                      <FontAwesomeIcon icon={faSave} />
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">Your Appointments</h3>
              <p className="text-gray-500 text-sm">View and manage your property appointments</p>
            </div>
            <div className="p-0 sm:p-4">
              <Appointments />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
