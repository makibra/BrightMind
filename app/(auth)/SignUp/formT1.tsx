
"use client"
import { useState } from "react"
import Image from "next/image"
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, User , sendEmailVerification } from "firebase/auth";
import { db, storage } from "@/app/firebaseConfing";
import { set } from "firebase/database";
import { ref, uploadBytes } from "firebase/storage";

function isPDF(file: File) {
  return file && file.type === "application/pdf";
}

export default function formT1({handleNext}: {handleNext: () => void}){
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
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event : any) => {
  //   const file = event.target.files[0]; // Access the first selected file
  //   setSelectedFile(file);
  // };

  const addData = async () => {

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userID = userCredential.user.uid;


      // Ajouter les autres données de l'utilisateur à Firestore
      const userData = {
        verify: false,
        fullName: formData.fullName,
        username: formData.username,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email,
        imageUrl: "/images/teacher.jpg",
        // Vous n'avez pas besoin d'ajouter le mot de passe ici
        myCourses: [],
        
      };
      //  myDiplomas: diplomas.map(diploma => ({
      //     diplomaName: diploma.diplomaName,
      //     establishmentName: diploma.establishmentName,
      //     diplomaFileUrl: diploma.diplomaFile // Ajoutez l'URL du fichier ici
      // }))
      await setDoc(doc(collection(db, 'user' ,'all users' , 'teachers'), userID), userData);
      console.log("User data added to Firestore");

      const diplomasCollectionRef = collection(db, 'user', 'all users', 'teachers', userID, 'diplomas');
      // const dip=[{
      //   diplomaName: "diploma.diplomaName",
      //   establishmentName: "diploma.establishmentName",},
      //   {
      //     diplomaName: "diploma.diplomaName22",
      //     establishmentName: "diploma.establishmentName22",
      //   }]

          // Assign the appropriate value to imageUpload
 
          const teacherDocRef = doc(collection(db, 'user', 'all users', 'teachers'), userID);
          let nmbrDiploma = 0;
          for (const diploma of diplomas) {
            try {
              const storageRef = ref(storage, `teachers/diplomas/${teacherDocRef.id}/${diploma.diplomaName}.pdf`);
              if (selectedFiles[nmbrDiploma] !== null) {
                const diplomaWithPath = {
                  ...diploma,
                  diplomaFilePath:  `teachers/diplomas/${teacherDocRef.id}/${diploma.diplomaName}.pdf`
                };
                await uploadBytes(storageRef, selectedFiles[nmbrDiploma]);
                await addDoc(diplomasCollectionRef, diplomaWithPath);
                console.log(`Diploma ${diploma.diplomaName} added successfully`);
              }
            } catch (error) {
              console.error('Error adding diploma:', error);
            }
            nmbrDiploma++;
          }
          console.log("Diplomas added successfully");
    } 
    catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Email already in use. Please use a different email.");
        alert("Email already in use. Please use a different email.");setCurrentForm(3);
      return;
      } else {
        console.error("Error adding document: ", error);
        return;
      }
    }
    handleNext();
    handleNext2();
  }



  const [formul, setCurrentForm] = useState(3);
  const handleNext2 = () => {
    setCurrentForm(formul + 1);
  };

  const [bool, setBool] = useState(false);
  const toggleBool=()=>{
    setBool(!bool);
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  

  const [formData, setFormData] = useState({
      fullName: '',
      username: '',
      dateOfBirth: '', 
      gender: '',
      email: '',
      password: '',
      //confirmPassword only for confirmation
      confirmPassword: '',
  })

  const [nbrDiplomas, setNbrDiplomas] = useState(1);
   
  const addDiploma = () => {
    setNbrDiplomas(nbrDiplomas+1); ;  
  }
  const deleteDiploma = () => {
    setNbrDiplomas(nbrDiplomas-1); ;  
  }

  const [diplomas, setDiplomas] = useState([
    {
      diplomaName: "",
      establishmentName: "",
      diplomaFilePath: ""
    }
  ]);

  const handleAddDiploma = () => {
    setDiplomas([
      ...diplomas,
      {
        diplomaName: "",
        establishmentName: "",
        diplomaFilePath: ""
      }
    ]);
    addDiploma();
  };

  const handleDeleteDiploma = (index: number) => {
    setDiplomas(diplomas.filter((_, i) => i !== index));
    deleteDiploma();
  };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Custom validation logic
        if(formData.dateOfBirth === '' ){
          alert("Please enter date of birth")
          return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        handleNext();
        handleNext2();
    };

    const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addData();
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
          ...formData,
          [event.target.name]: event.target.value
      });
  }

  const handleChange2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, files } = e.target;
    const updatedDiplomas = [...diplomas];
    updatedDiplomas[index] = {
      ...updatedDiplomas[index],
      [name]: name === "diplomaFile" ? (files && files[0]) : value
    };
    setDiplomas(updatedDiplomas);
    updatedDiplomas.map((diploma) => console.log(diploma));
  };

  // function handleFileChange(
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   index: number) {
  //   const selectedFile = e.target.files?.[0];
  
  //   if (selectedFile && !isPDF(selectedFile)) {
  //     alert("Please select a PDF file.");
  //     // Reset the input value to clear the non-PDF file selection
  //     e.target.value = "";
  //     return;
  //   }
  
  //   handleChange2(e, index);
  // }

    return(<>
      { formul === 3 && <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 px-10 py-6 max-w-screen-sm   w-[640px] mx-auto">
      <div className="p-2">
          <label htmlFor="fullName" className="sr-only">First Name</label>
          <input
              type="text"
              id="fullName"
              title="Please enter a valid name."
              pattern="[A-Za-z][A-Za-z][A-Z a-z]+"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
          />
      </div>

      
      <div className="p-2">
        <label htmlFor="username" className="sr-only">Username</label>
        <input
          type="text"
          id="username"
          name="username" 
          title="Please enter a valid username that contains only letters, numbers, hyphens'-', and underscores'_'."
          pattern="[a-zA-Z0-9_\- ][a-zA-Z0-9_\- ][a-zA-Z0-9_\- ]+"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
        />
      </div>
      {bool === false &&
        <div className="p-2">
          <input
            type="text"
            placeholder="Date of Birth"
            onClick={toggleBool}
            className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
          />
        </div>
        }
      {bool === true &&
       <div className="p-2">
          <label htmlFor="dateOfBirth" className="sr-only">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="Date of Birth "
            value={formData.dateOfBirth}
            onChange={handleChange} 
            required
            className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
            min="1930-01-01"
            max="2020-12-31"
          />
      </div>
      }
    
      <div className="p-2">
        <label htmlFor="gender" className="sr-only">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    
      <div className="col-span-2 p-2">
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
        />
      </div>
    
      <div className="p-2">
        <label htmlFor="password" className="sr-only">Password</label>
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character from '@$!%*?&+' ."
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$"
            required
            className="rounded pr-[30px] py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
          />
           <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 cursor-pointer"
          >
            {passwordVisible ? (
              <Image src="/open_eye.png" alt="Eye Open" width={20} height={20} />
            ) : (
              <Image src="/close_eye.png" alt="Eye Closed" width={20} height={20} />
            )}
          </button>
        </div>
      </div>
    
      <div className="p-2">
        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
        <div className="relative">
          <input
            type={passwordVisible2 ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="rounded pr-[30px] py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility2}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 cursor-pointer"
          >
            {passwordVisible2 ? (
              <Image src="/open_eye.png" alt="Eye Open" width={20} height={20} />
            ) : (
              <Image src="/close_eye.png" alt="Eye Closed" width={20} height={20} />
            )}
          </button>
        </div>
      </div>
    
      <div className="col-span-2 p-2">
        <button type="submit" className="w-full bg-fc hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"  >Submit</button>
      </div>
    </form>
    </div>}
    { formul === 4 && <div>
      <form
          onSubmit={handleSubmit2}
          className="grid grid-cols-2 gap-4 px-10 py-6 max-w-screen-sm w-600 mx-auto"
        >
          {diplomas.map((diploma, index) => (
            <div key={index}>
              <div className="p-2">
                <label htmlFor={`diplomaName-${index}`} className="sr-only">
                  Diploma Name
                </label>
                <input
                  type="text"
                  id={`diplomaName-${index}`}
                  name={`diplomaName`}
                  placeholder="Diploma"
                  value={diploma.diplomaName}
                  onChange={(e) => handleChange2(e, index)}
                  required
                  className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
                />
              </div>

              <div className="p-2">
                <label htmlFor={`establishmentName-${index}`} className="sr-only">
                  Establishment Name
                </label>
                <input
                  type="text"
                  id={`establishmentName-${index}`}
                  name={`establishmentName`}
                  placeholder="Establishment Name"
                  value={diploma.establishmentName}
                  onChange={(e) => handleChange2(e, index)}
                  required
                  className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full"
                />
              </div>





            <div className="flex flex-col-2">
              <div className="col p-0">
                <label htmlFor={`diplomaFile-${index}`} className="sr-only">
                  Diploma PDF
                </label>
                <input
                  type="file"
                  id={`diplomaFile-${index}`}
                  title="Please choose pdf file ."
                  name={`diplomaFile`}
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e)}
                  required
                  className="rounded py-2 px-1 text-gray-700 leading-tight focus:outline-blue-500 w-full"
                />
              </div>
              
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteDiploma(index)}
                    className="focus:outline-none"
                  >
                    <div  className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full p-[1px]">
                        <Image className='cursor-pointer' src="/delete.svg" alt="delete" width={25} height={25} />
                    </div>
                  </button>
                )}
            

            </div>
            </div>
          ))}
          
          {nbrDiplomas < 4 && (
              <div className="col-span-2 p-2">
                  <button
                      type="button"                    
                      onClick={handleAddDiploma}                    
                      className="bg-sc hover:bg-fc text-white font-bold py-2 px-4 rounded"                                     
                      >                    
                      Add Diploma                    
                  </button>                    
              </div>)
          }
          <div className="col-span-2 p-2">
            
              <button
                  type="submit"
                  className="w-full bg-fc hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                  Submit
              </button>
          
          </div>
        </form>
      </div>}
      { formul === 5 && <div className="flex flex-col items-center justify-center w-[640px] h-[337px] px-5">
            <Image src="/logo.svg" alt="BrigthMindsLogo" width={80} height={80} />
            <h2 className="text-lg font-bold mb-4 mt-3">Teacher Account Submitted Successfully</h2>
            <p className="text-sm text-center mb-4">Thank you for submitting your information.  We will review your information and activate your account within the next 48 hours. Once your account is activated, we will notify you via email.</p>
            <a href="/homeGuest" className="w-48 bg-sc hover:bg-fc text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mx-auto">Visite as Guest</a>
        </div>}
    </>    
    )
}