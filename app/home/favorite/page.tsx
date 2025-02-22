"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Header from '@/components/ui/header';
import CardComponentFav from '@/components/ui/cardFav'// import CourseCard from 'path_to_your_coursecard_component';
import Footer from '@/components/ui/footer';


import { setGlobalVariable ,getGlobalVariable} from '@/app/page';
import {auth, db , storage} from '@/app/firebaseConfing';
import { getStorage, ref,uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc ,updateDoc,deleteDoc, where,setDoc, getDocs, getDoc } from 'firebase/firestore';
import myCourses from '@/components/ui/myCourses';
import { set } from 'firebase/database';


const FavoriteCourses: React.FC= () => {
    const [idCours,setIdCours]=useState([]);
    const [FavCourses, setFavCourses] = useState([{ title: "", instructor: "", imageUrl: "courseImg.jpg" }]);
    const [courses, setcourses] = useState<{}[]>([]);


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const iduser = getGlobalVariable();
                const studentDocRef = doc(db, 'user/all users/students', iduser);
                const docSnapshot = await getDoc(studentDocRef);
                if (docSnapshot.exists()) {
                    setIdCours(docSnapshot.data().myFavCourses);
                    console.log("idCours",docSnapshot.data().myFavCourses);
                    fetchCourses2(docSnapshot.data().myFavCourses); 
                }
                
            } catch (error) {
                console.error("Error fetching document: ", error);
            }setloading(false);
        };
        fetchUserInfo();
  }, []);

    const fetchCourses2 = async (ids:string[]) => {
        ids.map(async (id) => {

            try {
                const studentDocRef = doc(db, 'courses', id);
                const docSnapshot = await getDoc(studentDocRef);
                console.log("docSnapshot cours :",docSnapshot.data());
                setcourses((prev) => [...prev, { id: docSnapshot.id,instructor:docSnapshot.data().instructor, courseDescription: docSnapshot.data().courseDescription, courseImage: docSnapshot.data().courseImage, courseName: docSnapshot.data().courseName, courseCategory: docSnapshot.data().courseCategory }]);
                
            }
            catch(error) { 
                    console.error("Error fetching document: ", error);
            }
            
        });
    };
    const updatedCourses = courses.filter((_, index) => index % 2 === 0);

    const [loading,setloading]=useState(true);
   
    const handleDeleteAll = async () => {
        try {
            const iduser = getGlobalVariable();
            const studentDocRef = doc(db, 'user/all users/students', iduser);
            await updateDoc(studentDocRef, { myFavCourses: [] });
            alert("All Courses has been deleted from your favorite courses.\nIf it still appears, please refresh.")
            
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };
       
    


    return (
        <div>
            <Header></Header>
            <div id="myCourses" className="flex flex-col items-center mb-5 lg:w-[1350px] mx-auto ">
                <h1 style={{padding: '0 0 1.5rem 0',
                            fontWeight: '700',
                            fontSize: '3.2rem',
                            lineHeight: '1.25',
                            letterSpacing: '-.016rem',
                            maxWidth: '36em',
                            fontFamily: 'Poppins',
                            margin: 'auto'
                            }}>
                Favorite Courses</h1>
                { loading &&
                    <div className='h-[500px] '>
                        <h1>loading ... </h1>
                    </div>
                }
                { updatedCourses.length === 0 && !loading &&
                    <div className='h-[500px] '>
                        <h2>there is no Courses in this section </h2>
                    </div>
                }
                {updatedCourses.length > 0  && !loading &&
                    <>
                        <div className='grid grid-cols-3 gap-4 '>
                            {updatedCourses.map((item, index) => (
                            <CardComponentFav key={index} id={item.id} title={item.courseName} instructor={item.instructor} imageUrl={item.courseImage} ></CardComponentFav>
                            ))}
                        </div>
                        
                        <Button className="bg-red-600 hover:bg-red-500 mt-3"  onClick={()=>{handleDeleteAll();}}>Delete All</Button>
                    </>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default FavoriteCourses;