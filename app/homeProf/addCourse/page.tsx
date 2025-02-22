"use client"
import React, { use, useState,useEffect } from 'react';
import Header from '@/components/ui/headerTeacher';
  import { collection, addDoc,updateDoc, getDoc, doc ,arrayUnion} from "firebase/firestore";
  import { db, storage ,auth} from "@/app/firebaseConfing";
  import { ref, uploadBytes ,getDownloadURL } from "firebase/storage";
  import { getGlobalVariable, setGlobalVariable } from '../../../app/page';
  import { set } from 'firebase/database';
import { Console } from 'console';

const AddCoursePage = () => {
  const userid=auth.currentUser?.uid;

  const[user,setUser]=useState('');
  const idT = getGlobalVariable();
  useEffect(() => {
   const  fetchTeachers = async () => {
    
    const docRef = doc(db, "user", "all users", "teachers",userid);
    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists()) {
      setUser(querySnapshot.data().fullName);
    }
  }
  fetchTeachers();
}, []);

    const Categorie = [
        "Web Development",
        "Artificial Intelligence",
        "Design",
        "Programming",
        "Business",
        "Finance",
        "Marketing",
        "Other",
      ];
    const [courseName, setCourseName] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const [courseImage, setCourseImage] = useState('');
    const [selectedImage, setSelectedImage] = useState<File[]>([]);
   
    const [price,setPrice]=useState(0);

    const [nbrCourses , setNbrCourses] = useState(1);
    const handleAddCourse = () => {
        setNbrCourses(nbrCourses + 1);
    };
    const handleDeleteCourse = () => {
        setNbrCourses(nbrCourses - 1);
    };

    const [vedios, setvedios] = useState([
        {
            VideoName: '',
            VideoPath: '',
            
        }
      ]);


    const handleChange2 = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
      ) => {
     
        const updatedvedios = [...vedios];
        updatedvedios[index] = {
          ...updatedvedios[index],
          VideoName: e.target.value ,  
        };
        setvedios(updatedvedios);
        updatedvedios.map((vedios) => console.log(vedios));
      };


    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        console.log("files : "+files);

        if (files) {
          // Convert the FileList object to an array and store it in state
          const filesArray: File[] = Array.from(files);
          setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };

      
    const handleAdd= () => {
        setvedios([
          ...vedios,
          {
            VideoName: "",
            VideoPath: "",
          }
        ]);
        handleAddCourse();
      };
    
       const handleDelete = () => {
       const updatedVedios = [...vedios];
       updatedVedios.pop();
       setvedios(updatedVedios); 
       handleDeleteCourse();
    };

    const handleCourseNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCourseName(event.target.value);
    };

    const handleCourseCategoryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCourseCategory(event.target.value);
    };

    const handleCourseDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCourseDescription(event.target.value);
    };

    const handleCoursePriceChange = (event) => {
      setPrice(event.target.value);
  };

    const [courseREF, setCourseREF] = useState('');

    const handleSubmit = async(event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const courseId = await addCourseToDatabase();
        await addImageCourseToStorage(courseId);
        await addVideosCourseToDatabase(courseId);
        
        // await addCourseToDatabase();
        // await addImageCourseToStorage();
        // await addVediosCourseToDatabase();
    };

    const addCourseToDatabase = async () => {
        try {
          const numericPrice = parseFloat(price.toString());
          const docRef = await addDoc(collection(db, "courses"), {
            courseName: courseName,
            courseCategory: courseCategory,
            courseDescription: courseDescription,
            courseImage: courseImage,
            price: numericPrice ,
            enrolStudents: 0,
            instructor: user,
            TeacherId: userid,
          });
          console.log("Course Document written with ID: ", docRef.id);
          const teacherDocRef = doc(db, 'user/all users/teachers', userid);
          await updateDoc(teacherDocRef, {
            myCourses: arrayUnion(docRef.id)
          });
          return docRef.id;
        } catch (e) {
          console.error("Error adding document: ", e);
          throw e;
        }
      };
      
      const addImageCourseToStorage = async (courseId : string) => {
        try {
          const courseImageRef = ref(storage, `courses/${courseId}/image.png`);
          const blob = new Blob([selectedFiles[0]]); // Assuming selectedFiles is an array of files
          await uploadBytes(courseImageRef, blob);
          console.log("Course Image uploaded successfully!");
      
          const imageRefinFS = doc(db, "courses", courseId);
          await updateDoc(imageRefinFS, {
            courseImage: `courses/${courseId}/image.png`
          });
        } catch (e) {
          console.error("Error uploading course image: ", e);
          throw e;
        }
      };
      
      const addVideosCourseToDatabase = async (courseId:string) => {
        try {
          console.log("starting add vedios");
            const courseRef = doc(db, "courses", courseId);
            const videosCollectionRef = collection(courseRef, "videos");
            let i=1;
            for (const video of vedios) {
                const videoRef = ref(storage, `courses/${courseId}/videos/video${i}`);
                await uploadBytes(videoRef, selectedFiles[i]);
                await addDoc(videosCollectionRef, {
                vedioRank: i,
                VideoName: video.VideoName,
                VideoPath: `courses/${courseId}/videos/video${i}`
              });
              i++;
            }
         


        //   for (const video of selectedFiles) {
        
        //     console.log("selected File n : \n" + 1);
        //     const videoRef = ref(storage, `courses/${courseId}/videos/video${1}`);
        //     await uploadBytes(videoRef, selectedFiles[1]);
      
        //     const videoURL = await getDownloadURL(videoRef);
      
        //     await addDoc(videosCollectionRef, {
        //       VideoPath: videoURL
        //     });
        //   }
      
          console.log("Videos added to the course document successfully!");
        } catch (error) {
          console.error("Error adding videos to the course document:", error);
          throw error;
        }
      };
    // const addVideosCourseToDatabase = async (courseId: string) => {
    //     try {
    //       const courseRef = doc(db, "courses", courseId);
    //       const videosCollectionRef = collection(courseRef, "videos");
      
    //       for (const video of vedios) {
    //         await addDoc(videosCollectionRef, {
    //           VideoName: video.VideoName,
    //           VideoPath: video.VideoPath
    //         });
    //       }
      
    //       console.log("Videos added to the course document successfully!");
    //     } catch (error) {
    //       console.error("Error adding videos to the course document:", error);
    //       throw error;
    //     }
    //   };










  
// const addCourseToDatabase = async () => {
//   try {
//     const docRef = await addDoc(collection(db, "courses"), {
//       courseName: courseName,
//       courseCategory: courseCategory,
//       courseDescription: courseDescription,
//       courseImage: courseImage,
//     });
//     setCourseREF(docRef.id);
//     console.log("course Document written with ID: ", courseREF);
    
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

// const addImageCourseToStorage = async () => {
//   try {
//     if (!courseREF) {
//       throw new Error("courseREF is not set");
//     }
//     const courseImageRef = ref(storage, `courses/${courseREF}/image.png`);
//     const blob = new Blob([selectedFiles[0]]); // Assuming selectedFiles is an array of files
//     await uploadBytes(courseImageRef, blob);
//     console.log("Course Image uploaded successfully!");

//     const imageRefinFS = doc(db, "courses", courseREF);
//     await updateDoc(imageRefinFS, {
//       courseImage: `courses/${courseREF}/image.png`
//     });
//   } catch (e) {
//     console.error("Error uploading course image: ", e);
//   }
// };

// const addVediosCourseToDatabase = async () => {
//   try {
//     const courseR = doc(db, "courses", courseREF);
//     const videosCollectionRef = collection(courseR, "videos");

//     for (const video of vedios) {
//       await addDoc(videosCollectionRef, {
//         VideoName: video.VideoName,
//         VideoPath: video.VideoPath
//       });
//     }

//     console.log("Videos added to the course document successfully!");
//   } catch (error) {
//     console.error("Error adding videos to the course document:", error);
//   }
// };














    // const addCourseToDatabase = async () => {
    //     try {
    //         const docRef = await addDoc(collection(db, "courses"), {
    //             courseName: courseName,
    //             courseCategory: courseCategory,
    //             courseDescription: courseDescription,
    //             courseImage: courseImage,
               
    //         });
    //         console.log("course Document written with ID: ", docRef.id);
    //         setcourseREF(docRef.id);
            
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
        
    // };
    // const addImageCourseToStorage=async()=>{
    //      try {
    //         const courseImageRef = ref(storage, `courses/${courseREF}/image.png`);
    //         const blob = new Blob(selectedFiles);
    //         await uploadBytes(courseImageRef, blob);
    //         console.log("------------------------------ nrmlmn image rahat")
    //         const imageRefinFS = doc(db, "courses", courseREF); // Change from collection() to doc()
    //          updateDoc(imageRefinFS, {
    //             courseImage: `courses/${courseREF}/image.png`
    //         });
    //         console.log("Course Image uploaded successfully!");
            
    //     } catch (e) {
    //         console.error("Error uploading course image: ", e);
    //     }
    // }
    // const addVediosCourseToDatabase=async()=>{
    //     try {
    //         // Create a new course document
    //         const courseRef = doc(db, "courses", courseREF);
    //         console.log("first try");
    //         // Add a new collection named "videos" to the course document
    //         const videosCollectionRef = collection(courseRef, "videos");
    //         console.log("second try");
    //         // Loop through each video in the state and add it to the "videos" collection
    //         vedios.forEach(async (video) => {
    //             await addDoc(videosCollectionRef, {
    //                 VideoName: video.VideoName,
    //                 VideoPath: video.VideoPath
    //             });
    //         });
    
    //         console.log("Videos added to the course document successfully!");
    //     } catch (error) {
    //         console.error("Error adding videos to the course document:", error);
    //     }
    // }

    return (
    <>
        <Header></Header>
       
        <h1 style={{ 
          marginTop: '30px',
          display: 'flex',
          padding: '0 0 1.5rem 0',
          fontWeight: '700',
          fontSize: '3.2rem',
          lineHeight: '1.25',
          letterSpacing: '-.016rem',
          maxWidth: '36em',
          fontFamily: 'Poppins',
        }}
        className='justify-center items-center'>
        Add course
        </h1>
        <div className="flex justify-center items-center py-8" style={{fontFamily: 'Poppins'}}>
        
            <form onSubmit={handleSubmit} className="bor m-auto p-10 px-20 bg-gray-100" style={{width :'450px'}}>
                <h2 className="text-2xl font-bold mb-4">information course:</h2>
                <div>
                    <label htmlFor="courseName" className="block">Course Name:</label>
                    <input id="courseName" type="text" value={courseName} onChange={handleCourseNameChange} required className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2" />
                </div>
                <div>
                    <label htmlFor="courseCategory" className="block">Course Category:</label>
                    <select id="courseCategory" value={courseCategory} onChange={handleCourseCategoryChange} className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2">
                        <option value="">Select Category</option>
                        {Categorie.map((category, index) => (
                        <option key={index} value={category}>
                        {category}
                        </option>))}
                    </select>
                </div>
                <div>
                    <label htmlFor="courseDescription" className="block">Course Description:</label>
                    <textarea id="courseDescription" rows={3} 
                        cols={50} value={courseDescription} onChange={handleCourseDescriptionChange} className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2" />
                </div>
                <div>
                    <label htmlFor="courseImage" className="block">Course Image:</label>
                    <input 
                        id="courseImage"
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}  
                        className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2"
                        required
                     />
                </div>
                <div>
                    <label  className="block">Price:</label>
                    <input 
                        id="coursePrice"
                        type="number" 
                        value={price}
                        onChange={handleCoursePriceChange}  
                        className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2"
                        required
                     />
                </div>
                <h2 className="text-2xl font-bold mb-4">Videos:</h2>
                 {vedios.map((vedio, index) => (<div key={index}>
                    <div className=' rounded pb-3 mt-3'>
                    <div className='flex flex-cols-3'>
                      <div className="w-[120px] mt-3" style={{ borderTop: '1px solid gray' }}></div>
                      <div className='text-gray-600 px-4'>{index+1}</div>
                      <div className="w-[120px] mt-3 " style={{ borderTop: '1px solid gray' }}></div>
                    </div>
                    <label htmlFor={`courseVideoName-${index}`} className="block">Course Video Name:</label>
                    <input
                        id={`courseVideoName-${index}`}
                        type="text"
                        value={vedio.VideoName}
                        onChange={(e) => handleChange2(e,index)}
                        required
                        className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2"
                    />

                    {/* { we need file path to the coursevedio } */}

                    <label htmlFor={`courseVideo-${index}`} className="block">Course Video:</label>
                    <input
                        type="file"
                        id={`courseVideo-${index}`}
                        title="Please choose video file."
                        accept="video/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                handleFileChange(e);
                            }
                        }}
                        required
                        className="rounded py-2 px-1  text-gray-700 leading-tight focus:outline-blue-500 w-full"
                    />
                </div>
          
                
                
                </div>))} 
                
               {nbrCourses > 1 && (
                    <button type="button"
                            onClick={handleDelete} 
                            className="w-full my-2 bg-red-500 flex mx-auto hover:bg-red-700 text-white font-bold justify-center  py-2 px-4 rounded">Delete Course
                    </button>
                )} 
                {nbrCourses >= 0 && nbrCourses < 6 && (
                    <button type="button"
                            onClick={ handleAdd} 
                            className="w-full my-2 bg-green-500 flex mx-auto hover:bg-green-700 text-white justify-center font-bold py-2 px-4 rounded">Add Course
                    </button>
                )} 
                
                <button type="submit" className="w-full   bg-blue-500 hover:bg-blue-700 text-white justify-center font-bold py-2 px-4 rounded">Submit</button>
            </form>
         
         

          
      
    </div>
</>
    );
};

export default AddCoursePage;
