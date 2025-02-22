"use client"
import React, { use, useState } from 'react';
import Header from '@/components/ui/headerTeacher';
const AddCoursePage = () => {
   const [currentForm, setCurrentForm] = useState(0);
  const handleSubmit = () => {
  setCurrentForm(currentForm + 1);  
    }
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
        
        {currentForm === 0 &&
            <form onSubmit={handleSubmit} className="bor m-auto p-10 px-20 bg-gray-100" style={{width :'450px'}}>
                <label>0000</label>
                <h2 className="text-2xl font-bold mb-4">information course:</h2>
                
                <div>
                    <label htmlFor="courseDescription" className="block">Course Description:</label>
                    <textarea id="courseDescription" rows={3} 
                        cols={50} className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2" />
                </div>
                <div>
                    <label htmlFor="courseImage" className="block">Course Image:</label>
                    <input 
                        id="courseImage"
                        type="file" 
                        accept="image/*"
                        className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2"
                        
                     />
                </div>
                
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>}
         
        {currentForm === 1 &&
           

            <form>
                <label>1111</label>
                <input type="text" 
                    
                    className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 w-full mt-1 mb-2"/>
                  
                            
                           
                   <button  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 w-full rounded">Submit</button>
            </form>
        }

            {currentForm === 2 &&
            <form className="bor m-auto  p-10 px-20 bg-gray-100" style={{width :'450px'}}>
                <label>2222</label>
                <button onClick={()=>handleSubmit} type="submit" className=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>}

            {currentForm === 3 &&
            <form className="bor m-auto  p-10 px-20 bg-gray-100" style={{width :'450px'}}>
                <label>3333</label>
                <button onClick={()=>handleSubmit} type="submit" className=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>}
      
    </div>
</>
    );
};

export default AddCoursePage;
