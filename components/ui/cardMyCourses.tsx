"use client"

import React, { useState ,useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Button } from "@/components/ui/button"
import {  ref, getDownloadURL } from "firebase/storage";
import {storage} from "@/app/firebaseConfing";
import { url } from "inspector";
import { useRouter } from "next/navigation";

interface CardProps {
  id : string,
  title: string;
  instructor: string;
  imageUrl: string;
  prix: number; // Add the missing property 'prix' of type number
  rating: number; // Add the missing property 'rating' of type number
}

const CustomCard: React.FC<CardProps> = ({id, title , instructor , imageUrl , prix ,rating }) => {
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState("");

  const [addCart , setcart] = useState(false);
  const togglecart = () => {
    setcart(!addCart);
  }

  const [ fav , setfav] = useState(false);
  const togglefav = () => {
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

  const enroll = (id: string) => {
    router.push(`/home/myCourses/${id}`);
  }
  return (
    <div className="z-10 flex" >
    <Card className=" bg-gray-200 rounded-xl w-100">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
        <p className="text-tiny  text-sc">{instructor}</p>
      </CardHeader>

      <CardBody className="relative  py-1 ">
        <Image
          className="object-cover rounded-xl"
          alt="cours image"
          src={imageSrc}
         // style={{ width: '270px', height: '200px' }}
        />
      </CardBody>

      <CardFooter className="flex justify-between">
        <div onClick={() => enroll(id)} className="felx flex w-full space-x-2 pr-2">
          
          <Button className="bg-sc hover:bg-green-700  w-full px-8">Enroll in Course</Button>

        </div>
      </CardFooter>
    </Card>
    </div>
  );
};

export default CustomCard;
