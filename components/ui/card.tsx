"use client"
import React, { useState ,useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Button } from "@/components/ui/button"
import {  ref, getDownloadURL } from "firebase/storage";
import {db,storage} from "@/app/firebaseConfing";
import NextLink from "next/link";
import { setGlobalVariable ,getGlobalVariable} from '@/app/page';
import { collection, doc ,updateDoc,deleteDoc, where,setDoc, getDocs, getDoc } from 'firebase/firestore';

interface CardProps {
  id: string;
  title: string;
  instructor: string;
  imageUrl: string;
  price: number; // Add the missing property 'prix' of type number
  rating: number; // Add the missing property 'rating' of type number
}

const CustomCard: React.FC<CardProps> = ({ id ,title , instructor , imageUrl , price ,rating }) => {
  const idS= getGlobalVariable();

  const [imageSrc, setImageSrc] = useState("");
  const add_Cart = async (id:string) => {
    try {
      const studentDocRef = doc(db, 'user/all users/students', idS);
      const docSnapshot = await getDoc(studentDocRef);
      if (docSnapshot.exists()) {
        const myCart = docSnapshot.data().myCart;
       // Check if the course ID is already in the cart
       console.log("myCart",myCart);
       console.log("ids",idS);
      if (!myCart.includes(id)) {
        myCart.push(id);
        await updateDoc(studentDocRef, { myCart: myCart });
      } else {
        console.log("Course already exists in the cart.");
      }
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  }
  const removeCart = async (id:string) => {
    try {
      const studentDocRef = doc(db, 'user/all users/students', idS);
      const docSnapshot = await getDoc(studentDocRef);
      if (docSnapshot.exists()) {
        const myCart = docSnapshot.data().myCart;
        const index = myCart.indexOf(id);
        if (index > -1) {
          myCart.splice(index, 1);
        }
        await updateDoc(studentDocRef, { myCart: myCart });
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  }
  const [addCart , setcart] = useState(false);
  const togglecart = () => {
    if(addCart){
        removeCart(id);
        alert("course removed from cart");
      }
    else{
        add_Cart(id);
        alert("course added to cart");
      }
    setcart(!addCart);
  }


  const add_Fav = async (id:string) => {
    try {
      const studentDocRef = doc(db, 'user/all users/students', idS);
      const docSnapshot = await getDoc(studentDocRef);
      if (docSnapshot.exists()) {
        const myFavCourses = docSnapshot.data().myFavCourses;
        if (!myFavCourses.includes(id)) {
          myFavCourses.push(id);
          await updateDoc(studentDocRef, { myFavCourses: myFavCourses });
        } else {
          console.log("Course already exists in the favorite courses.");
        }
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  }
  const removeFav = async (id:string) => {
    try {
      const studentDocRef = doc(db, 'user/all users/students', idS);
      const docSnapshot = await getDoc(studentDocRef);
      if (docSnapshot.exists()) {
        const myFavCourses = docSnapshot.data().myFavCourses;
        const index = myFavCourses.indexOf(id);
        if (index > -1) {
          myFavCourses.splice(index, 1);
        }
        await updateDoc(studentDocRef, { myFavCourses: myFavCourses });
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  }
  const [ fav , setfav] = useState(false);
  const togglefav = () => {
    if(fav){
        removeFav(id);
        alert("course removed from favorite");
      }
      else{ 
        add_Fav(id);
        alert("course added to favorite");
      }
    setfav(!fav);
  }
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, imageUrl);
        const url = await getDownloadURL(imageRef);
        setImageSrc(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [imageUrl]);
  return (
    <div className="z-10 flex" >
    <Card className=" bg-gray-200 rounded-xl w-100">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
        <p className="text-tiny  text-sc">{instructor}</p>
      </CardHeader>
      <NextLink href={`/home/coursDetails/${id}`}title="Click for more details cours" passHref>
      <CardBody className="relative  py-1 ">
        <Image
          className="object-cover rounded-xl"
          alt="cours image"
          src={imageSrc}
         // style={{ width: '270px', height: '200px' }}
        />
      </CardBody>
      </NextLink>

      <CardFooter className="flex justify-between">
        <div  className="ml-1 mb-1 text-sc font-semibold"> {price} DA</div>
        <div className="felx flex space-x-2 pr-2">
          <div className="flex items-end pb-[3px] ">
            <div>  <Image alt="rating" className=" align-end"
                src={'/ratingYellow.png'}
                width={20}></Image>
            </div>
            <div className="text-xl  ">
              {rating}
            </div>
            <div>  <Image alt="rating"
                src={'/ratingYellow.png'}
                width={20}></Image>
            </div>
          </div>
         <div onClick={togglecart}>
            
          {addCart ? (
          <Image src="/cartDone.png" alt="cart" width={30} height={20} />
          ) : (
          <Image src="/addCart.png" alt="cart" width={30} height={20} />
          )}
          </div>
          <div onClick={togglefav}>
          {fav ? (<Image alt="favorite" src={'/heartRed.png'} width={30}></Image>)
                 :
                 (<Image alt="favorite" src={'/heart.png'} width={30}></Image>)
          }
          </div>            
        </div>
      </CardFooter>
    </Card>
    </div>
  );
};

export default CustomCard;
