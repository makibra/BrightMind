import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { Button } from "./button";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

import { setGlobalVariable ,getGlobalVariable} from '@/app/page';
import {auth, db , storage} from '@/app/firebaseConfing';
import { getStorage, ref,uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc ,updateDoc,deleteDoc, where,setDoc, getDocs, getDoc } from 'firebase/firestore';

import NextLink from "next/link";


interface CardProps {
    id: string;
  title: string;
  instructor: string;
  imageUrl: string; // changed from imageUrl to image
}

const handleDelete = async (idCours) => {
    try {
      const iduser = getGlobalVariable();
      const studentDocRef = doc(db, 'user/all users/students', iduser); // Use iduser from getGlobalVariable
      const docSnapshot = await getDoc(studentDocRef);
  
      if (docSnapshot.exists()) {
        const currentFavCourses = docSnapshot.data().myCart || [];
        console.log("currentFavCourses",currentFavCourses);
        const updatedFavCourses = currentFavCourses.filter(courseId => courseId !== idCours);
        console.log("updatedFavCourses",updatedFavCourses);
  
        await updateDoc(studentDocRef, { myCart: updatedFavCourses });
        console.log(`Course ID ${idCours} has been deleted from myCart.`);
        alert("Course has been deleted from your favorite courses.\nIf it still appears, please refresh.");
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };


const cardCart: React.FC<CardProps> = ({ id ,title , instructor , imageUrl }) => {
    const router = useRouter();
   
    const handleMoreDetails = (id : string) => {
     router.push(`/home/coursDetails/${id}`);
   };
    const [image, setImage] = useState<string>('');
  useEffect (() => {
    const fetch = async () => {
      const imageRef = ref(storage, imageUrl);
      console.log("imageRef",imageRef);

      const url = await getDownloadURL(imageRef);
      setImage(url);
    }
      fetch();
  },[]);

 
  return (
    <div className="z-10 flex py-3"> 
       
            <Card className=" bg-gray-200 rounded-xl w-100">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{title}</h4>
                <p className="text-tiny text-sc">{instructor}</p>
                </CardHeader>
                <NextLink href={`/home/coursDetails/${id}`}title="Click for more details cours" passHref>
                <div  title="Click for more details cours">
                <CardBody className="relative py-1">
                <img
                    className="object-cover rounded-xl"
                    alt='course image'
                    src={image}
                    width={270}
                    height={270}
                />
                </CardBody>
            </div>
            </NextLink>
                <CardFooter className="flex justify-between">
                    <Button className="bg-sc hover:bg-green-700" onClick={() => handleMoreDetails(id)}>More Details</Button>

                    <Button className="bg-red-400 hover:bg-red-600" onClick={() => handleDelete(id)}>Remove</Button>
                </CardFooter>
            </Card>
 
    </div>
  );
};

export default cardCart;
