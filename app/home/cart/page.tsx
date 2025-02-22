"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Header from '@/components/ui/header';
import CardComponentCart from '@/components/ui/cardCart'// import CourseCard from 'path_to_your_coursecard_component';
import Footer from '@/components/ui/footer';
import { setGlobalVariable ,getGlobalVariable} from '@/app/page';
import {auth, db , storage} from '@/app/firebaseConfing';
import { getStorage, ref,uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc ,updateDoc,deleteDoc, where,setDoc, getDocs, getDoc } from 'firebase/firestore';
import {useRouter}  from 'next/navigation';

const cart: React.FC= () => {
    const [loading,setloading]=useState(true);
    const [FavCourses, setFavCourses] = useState([{ title: "", instructor: "", imageUrl: "courseImg.jpg" }]);
    const [idCours,setIdCours]=useState([]);
    const [courses, setcourses] = useState<{}[]>([]);
    const router = useRouter();


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const iduser = getGlobalVariable();
                const studentDocRef = doc(db, 'user/all users/students', iduser);
                const docSnapshot = await getDoc(studentDocRef);
                if (docSnapshot.exists()) {
                    setIdCours(docSnapshot.data().myCart);
                    console.log("idCours",docSnapshot.data().myCart);
                    fetchCourses2(docSnapshot.data().myCart); 
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
                setcourses((prev) => [...prev, { id: docSnapshot.id,instructor:docSnapshot.data().instructor, courseDescription: docSnapshot.data().courseDescription, courseImage: docSnapshot.data().courseImage, courseName: docSnapshot.data().courseName, courseCategory: docSnapshot.data().courseCategory , price: docSnapshot.data().price}]);
                
            }
            catch(error) { 
                    console.error("Error fetching document: ", error);
            }
            
        });
    };
    const updatedCourses = courses.filter((_, index) => index % 2 === 0);


    const handleDeleteAll =async () => {
        try {
            const iduser = getGlobalVariable();
            const studentDocRef = doc(db, 'user/all users/students', iduser);
            await updateDoc(studentDocRef, { myCart: [] });
            alert("All Courses has been deleted from your cart.\nIf it still appears, please refresh.")
            
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    }

    const handleBuyAll = async () => {
        try {
            const iduser = getGlobalVariable();
            const studentDocRef = doc(db, 'user/all users/students', iduser);
            const studentDocSnapshot = await getDoc(studentDocRef);
            
            if (studentDocSnapshot.exists()) {
                const userData = studentDocSnapshot.data();
                const myCart = userData.myCart || [];
                const myCourses = userData.myCourses || [];
    
                // Add all courses from myCart to myCourses
                const updatedMyCourses = [...new Set([...myCourses, ...myCart])]; // Ensure no duplicates
    
                // Update Firestore document
                await updateDoc(studentDocRef, {
                    myCourses: updatedMyCourses,
                    myCart: []
                });
                alert("All Courses has been bought successfully.");
                router.push('/home');
            } else {
                console.error("User document does not exist.");
            }
        } catch (error) {
            console.error("Error buying all courses:", error);
        }
    };
    
const [pay,setPay]=useState(false);
// const [total,setTotal]=useState(0);
// let total=0;
// const total_calc=() => {
    
//         updatedCourses.map((item, index) => (
//             //setTotal(total+item.price)
//             total+=item.price
//         ))
    
// }
const total = updatedCourses.reduce((sum, course) => sum + course.price, 0);

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
                My Cart</h1>
                { loading &&
                    <div className='h-[500px] '>
                        <h1>loading ... </h1>
                    </div>
                }
                { updatedCourses.length === 0  && !loading && !pay &&
                    <div className='h-[500px] '>
                        <h2>there is no courses in this section </h2>
                    </div>
                }
                {updatedCourses.length > 0  && !loading && !pay &&
                    <>
                        <div className='grid grid-cols-3 gap-4 '>
                            {updatedCourses.map((item, index) => (
                            <>
                                <CardComponentCart key={index} id={item.id} title={item.courseName} instructor={item.instructor} imageUrl={item.courseImage}></CardComponentCart>
                            </>
                            ))}
                        </div>
                        <div> 
                            <Button className="bg-fc hover:bg-bleu-500 mt-3 m-6 px-6"  onClick={()=>{setPay(true);}}>Buy All</Button>
                            <Button className="bg-red-600 hover:bg-red-500 mt-3 m-6"  onClick={handleDeleteAll}>Delete All</Button>
                        </div>

                    </>
                }
                {pay &&
                      <div className="mt-10  px-4 pt-8 lg:mt-0 bg-green-50 rounded-2xl">
                      <p className="text-xl font-medium">Payment Details</p>
                      <p className="text-gray-400">Complete your order by providing your payment details.</p>
                      <div className="">
                        <label  className="mt-4 mb-2 block text-sm font-medium">Email</label>
                        <div className="relative">
                          <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                          </div>
                        </div>
                        <label  className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
                        <div className="relative">
                          <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                            </svg>
                          </div>
                        </div>
                        <label  className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
                        <div className="flex">
                          <div className="relative w-7/12 flex-shrink-0">
                            <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                              </svg>
                            </div>
                          </div>
                          <input type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
                          <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
                        </div>

                        <div className="mt-6 border-t border-b py-2">
                        {updatedCourses.map((item, index) => (
                            <>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">{item.courseName}</p>
                                    <p className="font-semibold text-gray-900">{item.price} DA</p>
                                </div>
                            </>
                        ))
                        }
                          
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">Total</p>
                          <p className="text-2xl font-semibold text-gray-900">{total}.00 DA</p>
                        </div>
                      </div>
                      <button className="mt-4 mb-8 w-full rounded-md bg-fc px-6 py-3 font-medium text-xl text-white" onClick={handleBuyAll}>Place Order</button>
                    </div>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default cart;