"use client"

import React,{useState,useEffect} from 'react';
import Header from '@/components/ui/headerAdmin'; 
import Footer from '@/components/ui/footer';
import { db } from '@/app/firebaseConfing';
import { collection , query, where ,getDocs,doc,updateDoc} from 'firebase/firestore';

const approveCourses = () => {
  const [courses, setcourses] = useState<{}[]>([]);
  useEffect(() => {
    const fetchProf = async () => {
      const coursesREf = collection(db, "courses"); 
      const q = query(coursesREf, where("verify", "==", false)); // Create a query with the condition
      const querySnapshot = await getDocs(q);
      console.log("querysnapshot",querySnapshot);
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log("data",data);
      console.log("type of data",typeof(data));
      setcourses(data); 
    }
    fetchProf();
  }, []);

  const coursVerified = async (idc :string,fn:string) => {
    const coursDocRef = doc(db, "courses", idc);
    await updateDoc(coursDocRef, {
      verify: true
    });
    const newcourses = courses.filter((cours) => cours.id !== idc);
    setcourses(newcourses);
    alert("Course "+fn+" Verified Successfully");
  }

  return (
    <>
      <Header />
      <h1 className="text-3xl font-bold text-center mt-3 mx-auto mb-6">List of courses that have not been approved yet:</h1>
      <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 mx-20 shadow lg:px-4">
        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
          <thead className=" border-b lg:table-header-group">
            <tr className="">
              <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3 ">Course Name</td>
              <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Category</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-800 sm:px-3">Description</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-800 sm:px-3">ID</td>
              <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3  w-[15px]">approve</td>
            </tr>
          </thead>
         
          <tbody className="bg-white lg:border-gray-300">
            {courses.map((cours, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 text-sm text-gray-800 sm:px-3">{cours.courseName}</td>
                <td className="py-4 text-sm text-gray-500 sm:px-3">{cours.courseCategory}</td>
                <td className="py-4 text-sm text-gray-500 sm:px-3">{cours.courseDescription}</td>
                <td className="py-4 text-sm text-gray-500 sm:px-3">{cours.id}</td>
                <td className="py-4 text-sm text-gray-500 sm:px-3">
                  <button onClick={()=>{coursVerified(cours.id,cours.courseName)}} className="bg-blue-500 text-white px-3 py-1 rounded">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {courses.length === 0 && (<><h3 className="text-2xl font-semibold text-center mt-3 mx-auto mb-6">All courses are approved </h3></>)}
      <Footer />
    </>
  );
};

export default approveCourses;
