"use client";
import React , {useEffect,useState}from 'react';
import CardComponent from '@/components/ui/cardMyCourses';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import {db , storage} from '@/app/firebaseConfing';
import { collection, doc ,query, where, getDocs, getDoc } from 'firebase/firestore';


  

const myCourses = ({ idS } : { idS: string }) => {
  // const [courses, setCourses] = useState<{ id: string }[]>([]);
  // const [coursesData, setCoursesData] = useState<{ id: string }[]>([]);
  // const [dataArray, setDataArray] = useState<string[]>([]);
  const [courses, setcourses] = useState<{ id: string , courseDescription: string, courseImage: string, instructor:string, courseName: string, courseCategory:string}[]>([]);
  const [bool, setbool] = useState(true);
  useEffect(() => {
    
      const fetchCourses = async () => {
        if(courses.length <= 1){
        const docRef = doc(db, "user",'all users','students',idS); // Use doc instead of collection
        getDoc(docRef).then((doc:any) => {
          if (doc.exists) {
            const myCourses = doc.data().myCourses ; // Ensure myCourses is an array even if it's missing
            //const courseIds = myCourses.map((course:any) => course.id); // Assuming each course object has an 'id' property
            fetchCourses2(doc.data().myCourses);
            
          } else {
            console.log('No such courses!');
          }
        }).catch((error) => {
          console.log('Error getting courses:', error);
        });
        }
      };         
    
    if(bool){fetchCourses();}
    setbool( false);
    
  }, []);

  
  

    const fetchCourses2 = async (array : string[]) => {
      setcourses([]);
      array.map(async (id,i) => {
        console.log("id :" +id +" et i :"+i);
        let ref = doc(db, "courses", id);
        let docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const courseExists = courses.some(course => course.id === docSnap.id);
          //console.log("courses data: gggggggggg", docSnap.data());
          // setcourses( prevcourses => [
          //   ...prevcourses,
          //   { id: docSnap.id, ...docSnap.data() }
          // ]);
          if (!courseExists) {
            setcourses(prevcourses => [...prevcourses, { id: docSnap.id, ...docSnap.data() }]);
          } else {
            console.log("Course already exists!");
          }
        } else {
          console.log("No such courses!");
        }
        console.log("courses from use effect",courses);
       });
    };

  

      const updatedCourses= courses.filter((_, index) => index % 2 === 0);

    console.log("courses",courses);


        return (
            <div id="myCourses" className="flex-col mx-auto mb-5  lg:w-[1350px]  ">
            <h1 style={{padding: '0 0 1.5rem 0',
                        fontWeight: '700',
                        fontSize: '3.2rem',
                        lineHeight: '1.25',
                        letterSpacing: '-.016rem',
                        maxWidth: '36em',
                        fontFamily: 'Poppins'
                        }}>
            my courses</h1>
            <div  >
            { courses.length === 0  &&
              <p className="text-center text-2xl my-5">No courses yet in this section</p>
            }
             { (courses.length === 1|| courses.length === 2 || courses.length === 3||courses.length === 4 ) &&
                   <Carousel>
                   <CarouselContent>
                     {updatedCourses.map((item, index) => (
                     <CarouselItem key={index} className="basis-1/4">
                                  <CardComponent key={index} id={item.id} title={item.courseName} instructor={"item.instructor"} imageUrl={item.courseImage} prix={500} rating={5}></CardComponent>

                     </CarouselItem>
                     ))}
                   </CarouselContent>
                 </Carousel>
              }
              {courses.length > 4  &&
                <Carousel>
                  <CarouselContent>
                    {updatedCourses.map((item, index) => (
                    <CarouselItem key={index} className="basis-1/4">
                       <CardComponent key={index} id={item.id} title={item.courseName} instructor={item.instructor} imageUrl={item.courseImage} prix={500} rating={5}></CardComponent>

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

export default myCourses;