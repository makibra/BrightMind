"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { db, storage } from '@/app/firebaseConfing'; 
import { collection, doc ,query,getDocs, getDoc } from 'firebase/firestore';
import {getDownloadURL,ref} from 'firebase/storage';
import { getGlobalVariable, setGlobalVariable } from '../../../page';

 const CourseDetails = ({ params }) => {
  const coursId  = params.id;
  console.log("coursId"+coursId);
 useEffect(() => {
    const fetchCourseDetails = async (id:string) => {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCourseDetails({ id: docSnap.id, ...docSnap.data() });
        const imageUrl = docSnap.data().courseImage;
        const imageRef = ref(storage,imageUrl);
        const url = await getDownloadURL(imageRef);
        setImageSrc(url);
      } else {
        console.log('No such document!');
      }
    };
    fetchCourseDetails(coursId);
  },[] );


  
  const [courseData, setCourseDetails] = useState({
    TeacherId: "",
    comments: [],
    courseCategory: "",
    courseDescription: "",
    courseImage: "",
    courseName: "",
    enrolStudents: "",
    instructor: "",
    price: 0,
  });

  const [imageSrc, setImageSrc] = useState("");

 


  const [enrolled, setEnrolled] = useState(false);

  const handleEnrollment = () => {

    setEnrolled(true);
  };

  // const courseData = {
  //   TeacherId: "m5tXZNVGlnVOtzvMLpSyg771dTU2",
  //   comments: [
  //     { comment: "Good course", user: "Makhlouf Ibrahim" },
  //     // Add more comments if needed
  //   ],
  //   courseCategory: "Programming",
  //   courseDescription: "This course is for student level 1",
  //   courseImage: "/html.png", // Assuming the image is located in the public directory
  //   courseName: "Algorithm",
  //   enrolStudents: "55",
  //   instructor: "Mouad",
  //   price: 800,
  // };
  if (!courseData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-fc to-sc flex items-center justify-center p-4">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute bg-white opacity-10 w-96 h-96 rounded-full blur-2xl"></div>
        <div className="absolute bg-white opacity-10 w-72 h-72 rounded-full blur-2xl"></div>
        <div className="absolute bg-white opacity-10 w-56 h-56 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-4xl w-full bg-white p-8 rounded-lg shadow-2xl z-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{courseData.courseName}</h1>
        <p className="text-lg text-gray-500 mb-2">By <span className="font-bold text-gray-800">{courseData.instructor}</span></p>
        <div className="relative mb-6 rounded-lg overflow-hidden">
          <img
             src={imageSrc}
             alt="Course Cover"
             className="w-full h-full object-cover"
          />
        </div>

       
        <p className="text-lg text-gray-500 mb-4">Category: <span className="font-medium text-gray-900">{courseData.courseCategory}</span></p>
        <p className="text-lg text-gray-500 mb-4">Enrolled Students: <span className="font-medium text-gray-900">{courseData.enrolStudents}</span></p>
        <p className="text-lg text-gray-500 mb-4">Price: <span className="font-medium text-gray-900">{courseData.price} DA</span></p>
        <p className="text-gray-800 mb-6">{courseData.courseDescription}</p>

        {/* {!enrolled ? (
          <button
            onClick={handleEnrollment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Add to Cart
          </button>
        ) : (
          <p className="text-green-600 font-semibold">added to Cart successfully !</p>
        )}
        {!enrolled ? (
          <button
            onClick={handleEnrollment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Add to Favorite
          </button>
        ) : (
          <p className="text-green-600 font-semibold">added to favorite list successfully !</p>
        )} */}

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>
          {courseData.comments && courseData.comments.length > 0 ? (
          courseData.comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-gray-800"><strong>{comment.user}</strong>: {comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        </div>

        {/* <div className="mt-4">
          <Link href="/home">
            <p className="text-blue-500 hover:text-blue-600 transition ease-in-out duration-150">← Back to Home</p>
          </Link>
        </div> */}
      </div>
    </div>
  );
};
export default CourseDetails;