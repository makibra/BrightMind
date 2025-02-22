import React,{useState,useEffect} from 'react';
import Image from "next/image";
import { storage } from '@/app/firebaseConfing';
import { ref, getDownloadURL } from 'firebase/storage';
import NextLink from "next/link";


interface CardProps {
  key: number;
  id: string;
  title: string;
  instructor: string;
  imageUrl: string;
  price: number; // Add the missing property 'prix' of type number
  rating: number; // Add the missing property 'rating' of type number
}


const CourseCard: React.FC<CardProps> = ({key, id ,title , instructor , imageUrl , price ,rating }) => {

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
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <NextLink href={`/home/coursDetails/${id}`}title="Click for more details cours" passHref>

      <img
            className="object-cover rounded-xl"
            alt='course image'
            src={image}
            width={500}
            height={270}
          /> 
      </NextLink>
      {/* Actions (e.g., remove course) */}
      
    </div>
  );
};

export default CourseCard;
