"use client"

import React,{useState,useEffect} from 'react';
import Header from '@/components/ui/headerAdmin'; 
import Footer from '@/components/ui/footer';
import { db } from '@/app/firebaseConfing';
import { collection , query, where ,getDocs,doc,updateDoc} from 'firebase/firestore';


const approveCourses = () => {
  const [accountType, setAccountType] = useState('');
  const [accountId, setAccountId] = useState('');
const [profs, setProfs] = useState<{}[]>([]);
  useEffect(() => {
    const fetchProf = async () => {
      const teachersRef = collection(db, "user", "all users", "teachers"); // Correct way to reference the collection
      const q = query(teachersRef, where("verify", "==", false)); // Create a query with the condition
      const querySnapshot = await getDocs(q);
      console.log("querysnapshot",querySnapshot);
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log("data",data);
      console.log("type of data",typeof(data));
      setProfs(data); 
    }
    fetchProf();
  }, []);

  const profverified = async (idp :string,fn:string) => {
    const teacherDocRef = doc(db, "user", "all users", "teachers", idp);
    await updateDoc(teacherDocRef, {
      verify: true
    });
    const newProfs = profs.filter((prof) => prof.id !== idp);
    setProfs(newProfs);
    alert("Teacher "+fn+" Verified Successfully");
  };

  const handleBan = async () => {
    // Add logic to ban an account based on accountType and accountId
    if (accountType && accountId) {
      try {
        const userDocRef = doc(db, "user", "all users", accountType, accountId);
        await updateDoc(userDocRef, { banned: true });
        alert(`Account with ID ${accountId} has been banned.`);
      } catch (error) {
        console.error("Error banning account:", error);
      }
    } else {
      alert("Please provide both account type and account ID.");
    }
  };

  return (
    <>
      <Header /> 
      <h1 className="text-3xl font-bold text-center mt-3 mx-auto mb-6">List of teachers that have not been verified yet:</h1>
      <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 mx-20 shadow lg:px-4">
        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
          <thead className=" border-b lg:table-header-group">
            <tr className="">
              <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3 ">Full Name</td>
              <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">User Name</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-800 sm:px-3">gender</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-800 sm:px-3">verify</td>
              <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3  w-[15px]">approve</td>
            </tr>
          </thead>

          <tbody className="bg-white lg:border-gray-300">
            {profs.map((prof, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 text-sm text-gray-800 sm:px-3">{prof.fullName}</td>
                <td className="py-4 text-sm text-gray-500 sm:px-3">{prof.username}</td>
                <td className="py-4 text-sm text-gray-500 sm:px-3">{prof.gender}</td>
                <td className="py-4 text-sm text-gray-500 sm:px-3">{prof.verify ? "Yes" : "No"}</td>
                <td className="py-4 text-sm text-gray-500 sm:px-3">
                  <button onClick={()=>{profverified(prof.id , prof.fullName)}} className="bg-blue-500 text-white px-3 py-1 rounded">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-3xl font-bold text-center mt-3 mx-auto mb-6">ban an account:</h1>
      <div className="flex flex-col items-center space-y-4">
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select account type</option>
            <option value="students">Student</option>
            <option value="teachers">Teacher</option>
          </select>
          <input
            type="text"
            placeholder="Enter account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleBan}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
          >
            Ban Account
          </button>
        </div>
      <Footer />
    </>
  );
};

export default approveCourses;
