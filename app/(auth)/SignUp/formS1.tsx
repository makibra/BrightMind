"use client"
import React from "react";
import { useState } from "react"
import Image from "next/image"
import { db } from "@/app/firebaseConfing";
import { auth } from "@/app/firebaseConfing";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { set } from "firebase/database";
import { Console } from "console";
import { getAuth, createUserWithEmailAndPassword, User , sendEmailVerification } from "firebase/auth";
import firebase from "firebase/compat/app";

// interface ChildProps {
//  formulaire: number; // Define the type of the prop
// }


export default function formS1({handleNext}: {handleNext: () => void}) {
  

  const [formul, setCurrentForm] = useState(0);
  const handleNext2 = () => {
    setCurrentForm(formul + 1);
  };

  const auth = getAuth();

  const addData = async () => {

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userID = userCredential.user.uid;
      // Envoyer la vérification par e-mail
      await sendEmailVerification(userCredential.user);
      console.log("Verification email sent");
      
        // Ajouter les autres données de l'utilisateur à Firestore
        const userData = {
        fullName: formData.fullName,
        username: formData.username,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email,
        imageUrl: "/images/student.jpg",
        // Vous n'avez pas besoin d'ajouter le mot de passe ici
        myCourses: [],
        myFavCourses: [],
        myCart: [],
        };

      await setDoc(doc(collection(db, 'user' ,'all users' , 'students'), userID), userData);
      console.log("User data added to Firestore");
      handleNext2();
      alert("next");
      handleNext();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Email already in use. Please use a different email.");
        alert("Email already in use. Please use a different email.");
      return;
      } else {
        console.error("Error adding document: ", error);
        return;
      }
    }
    //next step 
    handleNext2();
    handleNext();

  };







  const [bool, setBool] = useState(false);
  const toggleBool=()=>{
    setBool(!bool);
  }
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

    const [formData, setFormData] = useState({
      fullName: '',
      username: '',
      dateOfBirth: '', 
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Custom validation logic 
        if(formData.dateOfBirth === '' ){
          alert("Please enter date of birth")
          return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
       
      addData();
    };

    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
      handleNext2();
      handleNext();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    return(
      <>      
       {formul === 0 && <div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 px-10 py-6 max-w-screen-sm   w-[640px] mx-auto">
          <div className="p-2">
              <label htmlFor="fullName" className="sr-only">First Name</label>
              <input
                  type="text"
                  id="fullName"
                  title="Please enter a valid name."
                  pattern="[A-Za-z][A-Za-z][A-Z a-z]+"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
              />
          </div>

          
          <div className="p-2">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              type="text"
              id="username"
              name="username" 
              title="Please enter a valid username that contains only letters, numbers, hyphens'-', and underscores'_'."
              pattern="[a-zA-Z0-9_\- ][a-zA-Z0-9_\- ][a-zA-Z0-9_\- ]+"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
            />
          </div>
          {bool === false &&
            <div className="p-2">
              <input
                type="text"
                placeholder="Date of Birth"
                onClick={toggleBool}
                className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
              />
            </div>
            }
          {bool === true &&
          <div className="p-2">
              <label htmlFor="dateOfBirth" className="sr-only">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="Date of Birth "
                value={formData.dateOfBirth}
                onChange={handleChange} 
                required
                min="1930-01-01"
              max="2020-12-31"
                className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
                
              />
          </div>
          }
        
          <div className="p-2">
            <label htmlFor="gender" className="sr-only">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        
          <div className="col-span-2 p-2">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
            />
          </div>
        
          <div className="p-2">
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character from '@$!%*?&+' ."
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$"
                required
                className="rounded pr-[30px] py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 cursor-pointer"
              >
                {passwordVisible ? (
                  <Image src="/open_eye.png" alt="Eye Open" width={20} height={20} />
                ) : (
                  <Image src="/close_eye.png" alt="Eye Closed" width={20} height={20} />
                )}
              </button>
            </div>
          </div>
        
          <div className="p-2">
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <div className="relative">
              <input
                type={passwordVisible2 ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="rounded pr-[30px] py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 cursor-pointer"
              >
                {passwordVisible2 ? (
                  <Image src="/open_eye.png" alt="Eye Open" width={20} height={20} />
                ) : (
                  <Image src="/close_eye.png" alt="Eye Closed" width={20} height={20} />
                )}
              </button>
            </div>
          </div>
        
          <div className="col-span-2 p-2">
            <button type="submit" className="w-full bg-fc hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" >Submit</button>
          </div>
        </form>
        </div>} 


        {formul === 1 && <div>
          <form  onSubmit={handleSubmit2} className="flex flex-col items-center justify-center w-[640px] h-[300px] px-5text-black">
                <div className="col-span-2 p-2 pb-0 text-center">
                  <p className="text-l mb-8">An email containing a confirmation link has been sent to your email address. Please check your inbox and follow the instructions.</p>
                </div>
                <div className="col-span-2 flex justify-center mx-auto">
                  <button type="submit" className="w-[300px] mt-[50px] bg-fc hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mx-auto">I have verified my account</button>
                </div> 
            </form>
        </div>} 

        {formul === 2 && <div>
          <div className="flex flex-col items-center justify-center w-[640px] h-[300px] px-7">
            <Image src="/logo.svg" alt="BrigthMindsLogo" width={80} height={80} />
            <h2 className="text-lg font-bold mb-4 mt-3">Account Created Successfully</h2>
            <p className="text-sm text-center mb-4">Congratulations! You have successfully created your account. Click below to start exploring Bright Minds.</p>
            <a href="/" className="w-48  bg-sc hover:bg-fc text-white py-2 px-8 rounded-full focus:outline-none focus:shadow-outline mx-auto ">Get Started</a>
        </div>
        </div>} 
      </>
    )
}
