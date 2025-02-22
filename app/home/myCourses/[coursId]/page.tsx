"use client";

import React, { useEffect, useState } from 'react';
import {  Image } from "@nextui-org/react";
import { db, storage } from '@/app/firebaseConfing'; 
import { collection, doc ,updateDoc,getDocs, getDoc } from 'firebase/firestore';
import {getDownloadURL,ref} from 'firebase/storage';
import { getGlobalVariable, setGlobalVariable } from '../../../page';

const CoursePage = ({ params }) => {
  console.log("params"+params);

 
  const { coursId } = params; console.log("coursId"+coursId);
  const [courseDetails, setCourseDetails] = useState<{ id: string , courseDescription: string, courseImage: string, courseName: string, courseCategory:string}[]>([]);
  const [videoList, setVideoList] = useState([{}]);
  const [vedio, setvedio] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async (id:string) => {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCourseDetails({ id: docSnap.id, ...docSnap.data() });
        const imageUrl = docSnap.data().courseImage;
        const imageRef = ref(storage,imageUrl);
        const url = await getDownloadURL(imageRef);
        setImageSrc(url);
      } else {
        console.log('No such document!');
      }
    };
    fetchCourseDetails(coursId);
  },[] );

  const [userN, setUser] = useState("hamid");
  useEffect(()=> {
    const fetchuser = async () => {
    let idS = getGlobalVariable();
    const studentDocRef = doc(db, '/user/all users/students', idS);  
    const docSnapshot = await getDoc(studentDocRef);
    if (docSnapshot.exists()) {
      setUser(docSnapshot.data().username);
    }
    }
    fetchuser();
  },[] );

// ...

useEffect(() => {
  const fetchVideos = async () => {
    try {
      const collectionRef = collection(db, 'courses', coursId, 'videos');
      const snapshot = await getDocs(collectionRef);
      const documentIds = snapshot.docs.map(doc => doc.id);

      const videoData = await Promise.all(
        documentIds.map(async (idv) => {
          const docRef = doc(db, 'courses', coursId, 'videos', idv);
          const docSnapshot = await getDoc(docRef);
         return({ id: docSnapshot.id, ...docSnapshot.data() });
        })
      );

      setVideoList(videoData);
      videoData.sort((a, b) => a.vedioRank - b.vedioRank);

        setVideoList(videoData);
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  fetchVideos();
}, [coursId]);

// ...


  const fetchVideos = async (id:string,urlv:string) => {
    console.log("id ved:"+id);
    const vedioRef = ref(storage,urlv );
    const url = await getDownloadURL(vedioRef);
    setvedio(url);
    }

    const handleCommentSubmit = async (event) => {
      event.preventDefault();
      const comment = event.target.comment.value;
      if (!comment) return; // Skip if comment is empty
  
      try {
        // Add the comment to the comments array in Firestore document
        await updateDoc(doc(db, 'courses', coursId), {
          comments: [...courseDetails.comments, { user: userN, comment: comment }]
          
        });
        alert("comment added");
        // Clear the input field after adding the comment
        event.target.comment.value = '';
  
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
    const handleCommentSubmitVedio = async (event) => {
      event.preventDefault();
      const comment = event.target.comment.value;
      if (!comment) return; // Skip if comment is empty
  
      try {
        // Add the comment to the comments array in Firestore document
        if(currentVideo.comments == null){
          currentVideo.comments = [];
        }
        await updateDoc(doc(db, 'courses', coursId,'videos',currentVideo.id), {
          comments: [ ...currentVideo.comments,{ user: userN, comment: comment }]
        });
        alert("comment added");
        // Clear the input field after adding the comment
        event.target.comment.value = '';
  
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
  return (
    <div className="flex h-screen" style={ {fontFamily: 'Poppins'}}>
      <aside className="fixed z-50 md:relative">
        <nav aria-label="Sidebar Navigation" className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-700 text-white transition-all md:h-screen md:w-64 lg:w-72">
          <div className="bg-slate-800 mt-5 py-4 pl-10 md:mt-10">
            <span className="">
              <span className="text-xl">{courseDetails.courseName}</span>
            </span>
          </div>
          <h2 className="text-xl w-full p-3 pt-8 font-bold mb-4 ">Videos List :</h2>
          <ul className="mt-8 space-y-3 md:mt-20">
          {videoList.map((video) => (
            <div>
            <li
              key={video.vedioRank}
              className="cursor-pointer mb-2"
              onClick={() => {setCurrentVideo(video);fetchVideos(video.id,video.VideoPath);}}
            >
             <h1 className='p-3'>- {video.vedioRank} : {video.VideoName}</h1> 
              
            </li></div>
          ))}
          </ul>

            <div className="my-6 mt-auto ml-3 flex cursor-pointer">
              <div>
                <img className="h-12 w-12 rounded-full" src="/teacher.jpg" />
              </div>
              <div className="ml-3 ">
                <p className="font-medium text-xl pt-2">{courseDetails.instructor}</p>
              </div>
            </div>
          </nav>
  </aside>

      {/* Main Content */}
      <div className="w-full p-4 pl-7">
        <div className="mb-8">
          {currentVideo ? (
            <div className="h-full overflow-hidden">
            <div id="dashboard-main" className="h-[calc(100vh-1rem)] overflow-auto pr-6 py-10">
              <div className='inline '>
              <h1 className="text-2xl font-bold mb-4">{currentVideo.VideoName}</h1>
              <video
                src={vedio}
                controls
                className="w-full mb-4"
              />
               <div className=" w-full rounded-xl bg-white py-5 shadow-md">
                  <h1 className="text-2xl font-black text-gray-800 px-2 pb-4  inline-block">Comments :</h1>
                    {currentVideo.comments && currentVideo.comments.length > 0 ? (
                      currentVideo.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-100 p-4 mx-2 rounded-lg mb-4">
                          <p className="text-gray-800"><strong>{comment.user}</strong>: {comment.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className='mx-3'>No comments yet.</p>
                    )}

                  {/* n'oublie pas de ajouter user name when you add data to the database from user info */}
                    <form id="commentForm" className="mt-6 flex" onSubmit={handleCommentSubmitVedio}>
                      <div className="mb-4 flex-grow">
                        <input type='text' id="comment" name="comment" className="w-full px-4 py-2 border border-blue-600 rounded-lg" placeholder='Add Comment' required />
                      </div>
                      <button type="submit" className="bg-blue-500 text-white px-4  rounded-lg hover:bg-blue-600">
                        Add Comment
                      </button>
                    </form>
                  </div>
            </div>
          </div>
          </div>
          ) : (
            
            <div className="h-full overflow-hidden pl-10">
            <div id="dashboard-main" className="h-[calc(100vh-1rem)] overflow-auto px-4 py-10">
              <div className='flex justify-center items-center '>
                <h1 className="text-2xl font-black text-gray-800 inline-block">Course : 
                  <h2 className="text-3xl inline-block font-black text-gray-600">{" "+courseDetails.courseName}</h2>
                </h1>
              </div>
              <p className="flex justify-center items-center text-xl mt-2  mb-3 text-gray-600">{courseDetails.courseDescription}</p>
              <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-8">
                <div className="flex justify-center items-center rounded-xl bg-white p-2 shadow-md">
                  <Image
                      className="object-cover w-full  rounded-xl px-2 mx-2 bg-white shadow-md"
                      alt="cours image"
                      src={imageSrc}
                       style={{ width: '900px', height: '600px' }}
                    />
                </div>
                
                {/* Comments Section */}
                <div className=" w-full rounded-xl bg-white py-5 shadow-md">
                  <h1 className="text-2xl font-black text-gray-800 px-2 pb-4  inline-block">Comments :</h1>
                  {courseDetails.comments && courseDetails.comments.length > 0 ? (
                    courseDetails.comments.map((comment, index) => (
                      <div key={index} className="bg-gray-100 p-4 mx-2 rounded-lg mb-4">
                        <p className="text-gray-800"><strong>{comment.user}</strong>: {comment.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className='mx-3'>No comments yet.</p>
                  )}

                  {/* n'oublie pas de ajouter user name when you add data to the database from user info */}
                  <form id="commentForm" className="mt-6 flex" onSubmit={handleCommentSubmit}>
                    <div className="mb-4 flex-grow">
                      <input type='text' id="comment" name="comment" className="w-full px-4 py-2 border border-blue-600 rounded-lg" placeholder='Add Comment' required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4  rounded-lg hover:bg-blue-600">
                      Add Comment
                    </button>
                  </form>


                </div>
                </div>
               
              </div>
              
          </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default CoursePage;
