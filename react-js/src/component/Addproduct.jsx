/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddProduct.css'; // Import your CSS file for styling

function Addproduct() {
  // State variables
  const navigate = useNavigate();
  const [pname, setpname] = useState("");
  const [pdesc, setpdesc] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [pimage, setpimage] = useState("");

  // useEffect to check for authentication token
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle API request when submitting the form
  const handleApi = () => {
    // Basic form validation
    if (!pname || !pdesc || !price || !category || !pimage) {
      alert("Please fill in all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("pname", pname);
    formData.append("pdesc", pdesc);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("pimage", pimage);

    // Declare the API URL as a constant
    const apiUrl = "http://localhost:4000/add-product";

    axios
      .post(apiUrl, formData)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        alert("Server error");
      });
  };

  // JSX rendering
  return (
    <div>
      <Header />
      <div className="p-3">
        <h2>ADD PRODUCT HERE:</h2>
        <label>Product Name</label>
        <input
          className="form-control"
          type="text"
          value={pname}
          onChange={(e) => {
            setpname(e.target.value);
          }}
        />
        <label>Product Description</label>
        <input
          className="form-control"
          type="text"
          value={pdesc}
          onChange={(e) => {
            setpdesc(e.target.value);
          }}
        />
        <label>Product Price</label>
        <input
          className="form-control"
          type="text"
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
        />
        <label>Product Category</label>
        <select
          className="form-control"
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          <option>Bikes</option>
          <option>Mobiles</option>
          <option>Cloths</option>
          <option>Cars</option>
        </select>
        <label>Product Image</label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => {
            setpimage(e.target.files[0]);
          }}
        />
        <button onClick={handleApi} className="button">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Addproduct;
