import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginRoute } from "../utils/APIRoutes";


import Logo from "../assets/logo.svg";


export default function Login() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",

  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const [values, setValues] = useState({
    username: "",   
    password: "",
    

  });


  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        console.log("in validation ", loginRoute);
        const { password, username } = values;

        const { data } = await axios.post(loginRoute, {
          username,         
          password,
        });


        console.log(data)
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }


        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));

          navigate("/");

        }


      }

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    };

  };

  const handleValidation = (event) => {
    const { password,  username,  } = values;

    if (password ==="") {
      toast.error("password required", toastOptions);
      return false;
    }


    if (username ==="") {

      toast.error("username required", toastOptions);
      return false;

    }

    


    return true;


  };


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });

  };

  return (
    <>


      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>

          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chat App</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />

         
          

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          

          <button type="submit">Submit </button>
          <span>Don't Have an account ? <Link to="/register">Register</Link></span>




        </form>
      </FormContainer>

      <ToastContainer />

    </>

  );
};


const FormContainer = styled.div`
margin:0;
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items: center;

background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    height:100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 3rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

