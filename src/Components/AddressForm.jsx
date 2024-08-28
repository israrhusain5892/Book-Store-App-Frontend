import React, { useState } from "react";
import axios from "axios";
import { State } from "country-state-city";
import { jwtDecode } from "jwt-decode";

const AddressForm = ({ userEmail, onAddressSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    locality: "",
    landmark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;

      const response = await axios.post(
        "https://books-api-lz0r.onrender.com/update-address",
        {
          email: email,
          address: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Address updated:", response.data);
      onAddressSubmit(formData);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const validatePincode = (value) => {
    return /^\d{6}$/.test(value);
  };

  const stateOptions = State.getStatesOfCountry("IN").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto">
      <h2 className="text-xl font-bold mb-4">Enter Address Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-700"
          >
            Pincode (6 digits)
          </label>
          <input
            type="number"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              validatePincode(formData.pincode)
                ? "border-gray-300"
                : "border-red-500"
            } rounded-md shadow-sm focus:outline-none ${
              validatePincode(formData.pincode)
                ? "focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                : "focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
            }`}
            maxLength="6"
            required
          />
          {!validatePincode(formData.pincode) && (
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid 6-digit pincode.
            </p>
          )}
        </div>
        <div className="col-span-1">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          >
            <option value="">Select State</option>
            {stateOptions.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="locality"
            className="block text-sm font-medium text-gray-700"
          >
            Locality
          </label>
          <input
            type="text"
            id="locality"
            name="locality"
            placeholder="D.no:-"
            value={formData.locality}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="landmark"
            className="block text-sm font-medium text-gray-700"
          >
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            placeholder="near bus stand"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
