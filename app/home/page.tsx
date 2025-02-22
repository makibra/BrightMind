"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/ui/header";
import MyCourses from "@/components/ui/myCourses";
import NewCourses from "@/components/ui/newCourses";
import AllCourses from "@/components/ui/allCourses";
import Footer from "@/components/ui/footer";
import { getGlobalVariable } from "../page";
import { auth } from "../firebaseConfing";

const Home = () => {
 


  const [visibleCourses, setVisibleCourses] = useState(12);
  const handleViewMore = () => {
    setVisibleCourses(prevVisibleCourses => prevVisibleCourses + 12); // Increase visible courses count
    

  };
 
  const Categorie = [ 
    "All",
    "Web Development",
    "Artificial Intelligence",
    "Design",
    "Programming",
    "Business",
    "Finance",
    "Marketing",
    "other",
    ];

    const [clickedCategory, setClickedCategory] = useState<string | null>(null); 
    function CategorieClick(category: string){
      setClickedCategory(category);
      // Fetch courses categories data from API
      
    }
    const idStudent=auth.currentUser?.uid;
    console.log(auth.currentUser);



  





    
  return (
    <div style={{ fontFamily: 'Poppins' }}>
      
      {/* need search button */}
      <Header></Header>

      <MyCourses idS={idStudent} />
      <NewCourses  />

      {/* need click gategory effect */}
      <AllCourses cat={clickedCategory ?? ""}  />
      
      <Footer></Footer>
    </div>
  );
};

export default Home;
