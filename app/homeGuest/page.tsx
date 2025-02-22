"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import CardComponent from '@/components/ui/cartGuest';
import Header from '@/components/ui/headerGest';
import Footer from '@/components/ui/footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {db , storage} from '@/app/firebaseConfing';

const Categorie = [
  "All",
  "Web Development",
  "Artificial Intelligence",
  "Design",
  "Programming",
  "Business",
  "Finance",
  "Marketing",
  "Other",
];

const homeGuest = () => {
  const [coursesData, setCoursesData] = useState<{ id: string }[]>([]);
  const [visibleCourses, setVisibleCourses] = useState(12);
  const [clickedCategory, setClickedCategory] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        let coursesQuery;
        if (clickedCategory !== "All") {
           coursesQuery = query(coursesCollection, where("courseCategory", "==", clickedCategory));
        }else{
           coursesQuery = coursesCollection;
        }
        

        const querySnapshot = await getDocs(coursesQuery);
        const coursesDataa = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCoursesData(coursesDataa);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, [clickedCategory]);

  const handleViewMore = () => {
    setVisibleCourses((prevVisibleCourses) => prevVisibleCourses + 12); // Increase visible courses count
  };

  const handleCategoryClick = (category: string) => {
    setClickedCategory(category);
  };



 return (
  <>
  <Header></Header>
    <section id="allCourses" className="flex-col mx-auto  mt-5 mb-5   lg:w-[1350px]">
        <h1 style={{
          padding: '0 0 1.5rem 0',
          fontWeight: '700',
          fontSize: '3.2rem',
          lineHeight: '1.25',
          letterSpacing: '-.016rem',
          maxWidth: '36em',
        }}>
        All courses
        </h1>
        <h2 style={{
          padding: '0 0 1.5rem 0',
          fontWeight: '500',
          fontSize: '2rem',
          lineHeight: '1',
          letterSpacing: '-.016rem',
          maxWidth: '36em',
        }}>
          Categories
        </h2>
        <div className="pb-7">
          <Carousel>
            <CarouselContent>
              {Categorie.map((item, index) => (
                <CarouselItem key={index} className="basis-1/6">
                  <h2 className={`text-center hover:text-fc focus:outline-none text-lg mt-2  ${clickedCategory === item ? 'border-b text-fc' : ''}`}><button onClick={() => handleCategoryClick(item)}>{item}</button></h2>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious></CarouselPrevious>
            <CarouselNext></CarouselNext>
          </Carousel>
        </div>
        {coursesData.length === 0 && <p className="text-center text-2xl my-5">No courses yet in this category</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coursesData.map((item: any, index: number) => (
            <CardComponent key={index} id={item.id} title={item.courseName} instructor={item.instructor  } imageUrl={item.courseImage} price={item.price} rating={5}></CardComponent>
          ))}
        </div>
        {/* {visibleCourses < courses.length && (
        <button className=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto" onClick={handleViewMore} >View more</button>
        )} */}
       
       </section>
       <Footer />
       </>
    );
};

export default homeGuest;
