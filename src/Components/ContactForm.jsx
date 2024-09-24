import React, { useState } from "react";
import "./ContactForm.css";
import axios from "axios";
const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showText,setShowText] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = "Name cannot be Empty";
      valid = false;
    }

    if (!emailRegex.test(formData.email)) {
      errors.email = "Email should contain @ and be in the correct format";
      valid = false;
    }
    if (formData.email === '') {
      errors.email="Email cannot be Empty"
    }
    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await axios
        .post("https://contact-backend-gqa1.onrender.com/api/contact", formData)
        .then(() => console.log("Message have Sent"))
        .catch((err) => console.log(err));
     
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    // setTimeout(() => setIsSubmitted(false), 3000);
    setTimeout(()=>setShowText(true),3000)
    }
  };

  const myStyle = {
    backgroundImage: "url('Background2.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  
  return (
    <div style={myStyle}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 px-5">
            <form onSubmit={handleSubmit} className="px-5 mx-5 transparent">
              <p className="h1 mb-5">Contact Us</p>
              <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">
                  Name{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-transparent form-control form-control-lg"
                  id="exampleInputName1"
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-transparent form-control form-control-lg"
                  id="exampleInputEmail1"
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputMessage1" className="form-label">
                  Message
                </label>
                <textarea
                  className="input-transparent form-control form-control-lg transparent-input"
                  id="exampleFormControlTextarea1"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <div className="text-danger">{errors.message}</div>
                )}
              </div>
              <button type="submit" className="btn-cr btn btn-primary btn-lg">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-4 d-flex align-items-center mb-5">
            <div className="card transparent " style={{ width: "100%",top:'-30px' }}>
              {isSubmitted && (
                <div className="animated-checkbox">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="blue"
                  >
                    <path d="M20.285 2.292l-11.999 12-5.286-5.292-1.999 2.292 7.285 7.292 13.999-14-2-2.292z" />
                  </svg>
                  {showText && (
                    <p className="mt-3 h5">Thank you for reaching out! We will get back to you as soon as possible.</p>
                    
                  )}
                 
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
