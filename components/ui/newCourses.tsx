"use client";
import React , {useState,useEffect} from 'react';
import CardComponent from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import {db , storage} from '@/app/firebaseConfing';
import { collection, doc ,limit,orderBy,query, where, getDocs, getDoc } from 'firebase/firestore';

const newCourses: React.FC = () => {

  const [courses, setCourses] = useState<{ id: string }[]>([]);
  const clickedCategory = "All";
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        
        let coursesQuery = query(coursesCollection, orderBy('courseImage', 'desc'),limit(3));
        
        const querySnapshot = await getDocs(coursesQuery);
        const coursesDataa = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCourses(coursesDataa);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);


  return (
            <div id="newCourses" className="flex-col mx-auto mt-5 mb-5  lg:w-[1350px] ">
            <h1 style={{padding: '0 0 1.5rem 0',
                        fontWeight: '700',
                        fontSize: '3.2rem',
                        lineHeight: '1.25',
                        letterSpacing: '-.016rem',
                        maxWidth: '36em',
                        fontFamily: 'Poppins'
                        }}>
            new courses</h1>
            <div> 
              { courses.length === 0  &&
              <p className="text-center text-2xl my-5">No courses yet in this section</p>
              }
             { (courses.length === 1 || courses.length === 2 || courses.length === 3||courses.length === 4 ) &&
                   <Carousel>
                   <CarouselContent>
                     {courses.map((item, index) => (
                                           <CarouselItem key={index} className="basis-1/4">
                        <CardComponent  key={index} id={item.id} title={item.courseName} instructor={item.instructor} imageUrl={item.courseImage} price={item.price} rating={5}></CardComponent>

                     </CarouselItem>
                     ))}
                   </CarouselContent>
                 </Carousel>
              }
              {courses.length > 4  &&
                <Carousel>
                  <CarouselContent>
                    {courses.map((item, index) => (
                    <CarouselItem key={index} className="basis-1/4">
                       <CardComponent key={index} id={item.id} title={item.courseName} instructor={item.instructor} imageUrl={item.courseImage} price={item.price} rating={5}></CardComponent>

                    </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious></CarouselPrevious>
                  <CarouselNext></CarouselNext>
                </Carousel>
              }
               
            </div>
      </div>
        );
};

export default newCourses;