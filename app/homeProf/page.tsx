"use client"
import React, { useEffect,useState } from 'react';
import CourseCard from '../../components/ui/cardProf'; // Assuming CourseCard component is defined separately
import Header from '@/components/ui/headerTeacher';
import Footer from '@/components/ui/footer';
import { useRouter } from 'next/navigation';
import {db , storage,auth} from '@/app/firebaseConfing';
import { collection, doc ,query, where, getDocs, getDoc } from 'firebase/firestore';

const DashboardTeacher = () => {
  const router=useRouter();
  const [courses, setcourses] = useState<{ id: string , courseDescription: string, courseImage: string, courseName: string, courseCategory:string}[]>([]);
  const [bool, setbool] = useState(true);
  const idT=auth.currentUser?.uid;
  useEffect(() => {
    
      const fetchCourses = async () => {
        if(courses.length <= 1){
        const docRef = doc(db, "user",'all users','teachers',idT); // Use doc instead of collection
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
          setloading(false);
        }
        console.log("courses from use effect",courses);
        setloading(false);
       });
    };

  

      const updatedCourses= courses.filter((_, index) => index % 2 === 0);
      const [loading,setloading]=useState(true);

  return (
    <>
    <Header></Header>
    <div className="container mx-auto p-6" style={{fontFamily: 'Poppins'}}>
      {/* Course Management Section */}
      <div className="mb-6">
      <h1 style={{padding: '0 0 1.5rem 0',
                        fontWeight: '700',
                        fontSize: '2.2rem',
                        lineHeight: '1.25',
                        letterSpacing: '-.016rem',
                        maxWidth: '36em',
                        fontFamily: 'Poppins',
                        }}>
            my courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        { loading &&
                    <div className='h-[500px] '>
                        <h1>loading ... </h1>
                    </div>
                }
        { updatedCourses.length === 0  && !loading && 
                    <div className='h-[500px] '>
                        <h2>there is no courses in this section </h2>
                    </div>
                }
          {updatedCourses.map((item,index) => (
            <CourseCard key={index} id={item.id} title={item.courseName} instructor={item.instructor} imageUrl={item.courseImage} prix={500} rating={5}/>
          ))}
        </div>
      </div>

      {/* Add New Course Button (can be implemented as a modal or separate page) */}
    <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        onClick={() => router.push('homeProf/addCourse')}
    >
        Add New Course
    </button>
    </div>
    
    </>
  );
};

export default DashboardTeacher;
