"use client"
import React, {useState,useEffect} from 'react';
import CourseCard from '../../components/ui/cardProf'; // Assuming CourseCard component is defined separately
import Header from '@/components/ui/headerSetting';
import Footer from '@/components/ui/footer';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import {auth, db , storage} from '@/app/firebaseConfing';
import { getStorage, ref,uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc ,updateDoc,deleteDoc, where,setDoc, getDocs, getDoc } from 'firebase/firestore';
import { set } from 'firebase/database';
import { getAuth, deleteUser } from 'firebase/auth';
import { getGlobalVariable, setGlobalVariable } from '../../app/page';
import { get } from 'http';


const id = getGlobalVariable();
console.log("id : "+id);


const Setting = () => {
    const menuItems = [
        "Profile",
        "Account",
        "Billing",
        "Notifications",
        "Delete account",
        "Disconnect"
      ];
  const router=useRouter();
  const [clickedItem, setClickedItem] = useState("Profile");
  const [imageUrl, setImageUrl] = useState('');
  const [image,setImage]=useState('');
  const [userDatas,setUserDatas] = useState<{ }>();
  const [iduser,setId] =useState(id);
  console.log("iduser : "+iduser);
  console.log("id"+id);
  //const iduser = "0txQYJemZ2MSzVWw3FjQxrwxSMs2";
  useEffect(() => {
    const fetchUserInfo = async () => {
        try {
            //setId(auth.currentUser.uid);
            const studentDocRef = doc(db, 'user/all users/students', iduser);
            const teacherDocRef = doc(db, 'user/all users/teachers', iduser);
            const docSnapshot = await getDoc(studentDocRef);
            const docSnapshot2 = await getDoc(teacherDocRef);
            if (docSnapshot.exists()) {
                setUserDatas({userType: 'student', ...docSnapshot.data()});
                console.log("student", docSnapshot.data());
                setImageUrl(docSnapshot.data().imageUrl);
                
                const imageRef = ref(storage, docSnapshot.data().imageUrl);
            const url = await getDownloadURL(imageRef);
            setImage(url);
                
            } else if (docSnapshot2.exists()){
                setUserDatas({  userType: 'teacher', ...docSnapshot2.data() });
                console.log("teacher", docSnapshot2.data());
                setImageUrl(docSnapshot2.data().imageUrl);

                const imageRef = ref(storage, docSnapshot2.data().imageUrl);
            const url = await getDownloadURL(imageRef);
            setImage(url);
                
            }
            
            
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };

    fetchUserInfo();

      
  }, []);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target.files;
    if (newImage) {
      setSelectedFiles(newImage);
    }

};

const modifyImage = async () => {
    if (selectedFiles) {
        const file = selectedFiles[0];
        const storageRef = ref(storage, `${userDatas.userType}/${iduser}/${file.name}`);
        const blob = new Blob([selectedFiles[0]]); // Assuming selectedFiles is an array of files
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        setImage(url);
        
        const userRef = doc(db, `user/all users/${userDatas.userType}s`, iduser);console.log("userRef",userRef);
        await updateDoc(userRef, { imageUrl: `${userDatas.userType}/${iduser}/${file.name}` });
    }
}

const deleteAccount = async () => {
    try {
       await deleteUser(auth.currentUser!);
        console.log(`Successfully deleted user with uid: ${iduser}`);
        const docRef = doc(db, `user/all users/${userDatas.userType}s`, iduser);
        await deleteDoc(docRef);
        router.push('/');
        } catch (error) {
              console.error('Error deleting user:', error);
            }
}

  return (
    <>
    <Header></Header>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet" />


<div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
  <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
    <div className="relative my-4 w-56 sm:hidden">
      <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
      <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
      <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <div className="col-span-2 hidden sm:block">
    <ul>
      {menuItems.map((item) => (
        <li
          key={item}
          className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${
            clickedItem === item ? "border-l-blue-700 text-blue-700" : "border-transparent"
          } hover:border-l-blue-700 hover:text-blue-700`}
        >{item === "Disconnect" && <Button onClick={()=>{setGlobalVariable(''); router.push('/')}}>{item}</Button>}
          {item !== "Disconnect" && <Button onClick={() => setClickedItem(item)}>{item}</Button>}
        </li>
      ))}
    </ul>
    </div>
    

    {clickedItem === "Profile" &&(
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Profile</h1>
            </div>
            <div className="flex justify-center items-center ">
                <img src={image} alt="image profil" className="rounded-full w-40 h-40 object-cover" />
            </div>
            {userDatas && <>
                <p className="py-2 text-xl font-semibold">Full Name :</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-gray-600"> {userDatas && <strong>{userDatas.fullName}</strong>}</p>
                    </div>
                <p className="py-2 text-xl font-semibold">User Name :</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-gray-600"> {userDatas && <strong>{userDatas.username}</strong>}</p>
                    </div>
               
                </>}
            <p className="py-2 text-xl font-semibold">Email Address :</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">Your email address is {userDatas && <strong>{userDatas.email}</strong>}</p>
            </div>
            <hr className="mt-4 mb-8" />
           <div>
                <p className="py-2 text-xl font-semibold">Change profile image :</p>
                <div className='flex'>
                <input 
                    id="courseImage"
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}  
                    className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500  mt-1 mb-2"
                    required
                />
                <button onClick={modifyImage} className="rounded-lg bg-blue-600 px-4  text-white">Save Image</button>
                </div>
           </div>
            <hr className="mt-4 mb-8" />
        </div>
    )}
    {clickedItem === "Account" &&(
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">Your email address is <strong>john.doe@company.com</strong></p>
          <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Password</p>
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label htmlFor="login-password">
              <span className="text-sm text-gray-500">Current Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
            <label htmlFor="login-password">
              <span className="text-sm text-gray-500">New Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </div>
        <p className="mt-2">Can't remember your current password. <a className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover Account</a></p>
        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
        <hr className="mt-4 mb-8" />
      </div>
    )}
    {clickedItem === "Billing" &&(
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">Profile</h1>
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Email Address</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">Your email address is <strong>john.doe@company.com</strong></p>
            <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
            </div>
            <hr className="mt-4 mb-8" />
        </div>
    )}
    {clickedItem === "Notifications" &&(
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Profile</h1>
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Email Address</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">Your email address is <strong>john.doe@company.com</strong></p>
            <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
            </div>
            <hr className="mt-4 mb-8" />
        </div>
    )}
    {clickedItem === "Delete account" &&(
       <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <br /><br/>

      <div className="mb-10">
        <p className="py-2 text-xl font-semibold">Delete Account</p><br/>
        <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Proceed with caution
        </p>
        <p className="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
        <button onClick={deleteAccount} className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
      </div>
    </div>
    )}
    
  </div>
</div>
<Footer></Footer>
    </>
  );
};

export default Setting;
