"use client"

import React,{useState, useEffect} from 'react';
import Header from '@/components/ui/headerAdmin'; 
import Footer from '@/components/ui/footer';

import {db} from '@/app/firebaseConfing';
import { collection, query, orderBy, getDocs,limit } from 'firebase/firestore';

import TopCategoriesChart from './TopCategoriesChart';
import RevenueChart from './RevenueChart'; 
import TopSellingCoursesChart from './TopSellingCoursesChart';
import PlatformUsageChart from './PlatformUsageChart';
import MostIncomeLessonsChart from './MostIncomeLessonsChart';

const stat = () => {
  const [topSellingCourses,settopSellingCourses] =useState([]);
  useEffect(() => {
    const fetchTopSellingCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        const coursesQuery = query(coursesCollection, orderBy("enrolStudents", "desc"), limit(4));
        const querySnapshot = await getDocs(coursesQuery);

        const coursesData = querySnapshot.docs.map(doc => ({name:doc.data().courseName, sales : doc.data().enrolStudents, price:doc.data().price }));
        console.log("coursesData",coursesData);
        settopSellingCourses(coursesData);
      }catch (error) {
        console.error("Error fetching courses: ", error);
      }
    
      // settopSellingCourses(topSellingCourses);
    };
    fetchTopSellingCourses();
  }, []);

  const [topCategoriess, setTopCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        const querySnapshot = await getDocs(coursesCollection);
        
        const categoryCount = {};
        
        querySnapshot.docs.forEach((doc) => {
          const category = doc.data().courseCategory;
          if (category) {
            if (categoryCount[category]) {
              categoryCount[category]++;
            } else {
              categoryCount[category] = 1;
            }
          }
        });

        const sortedCategories = Object.entries(categoryCount)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => ({ name, count }));

        setTopCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching top categories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCategories();
  }, []);


  const platformUsageData = [
    { month: 'January', website: 60, mobileApp: 30 },
    { month: 'February', website: 130, mobileApp: 50 },
    { month: 'March', website: 155, mobileApp: 100 },
    { month: 'April', website: 160, mobileApp: 90 },
    { month: 'May', website: 180, mobileApp: 130 },
    { month: 'June', website: 183, mobileApp: 140 },
  ];


  const [clickedItem, setClickedItem] = useState("Profile");
    // Dummy data for demonstration purposes
    const topCategories = [
      { name: 'Category 1', count: 45 },
      { name: 'Category 2', count: 78 },
      { name: 'Category 3', count: 32 },
      { name: 'Category 4', count: 67 },
      { name: 'Category 5', count: 54 },
    ];
    const last6MonthsRevenue = [
      { month: 'January', revenue: 100 },
      { month: 'February', revenue: 2500 },
      { month: 'March', revenue: 5500 },
      { month: 'April', revenue: 5000 },
      { month: 'May', revenue: 9000 },
      { month: 'June', revenue: 2000 },
    ];
  const menuItems = [
    "top categories",
    "Top selling",
    "Most Income Lesson",
    "Users platform",
    "Income over last 6 months"
    ];
  return (
    <>
      <Header />

    
     <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Platform Analytics</h2>
        <div className='grid grid-cols-8 pt-3 sm:grid-cols-10'>
          <div className="col-span-2 hidden sm:block">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item}
                className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${
                  clickedItem === item ? "border-l-blue-700 text-xl text-blue-700" : "border-transparent"
                } hover:border-l-blue-700 hover:text-blue-700`}
              >
                <button onClick={()=>setClickedItem(item)}>{item}</button>
              </li>
            ))}
          </ul>
        </div>
        { clickedItem === "top categories" &&  <div className='w-[900px]'>
            <TopCategoriesChart data={topCategoriess} />
          </div>}
        { clickedItem === "Income over last 6 months" && <div className='w-[900px]'>
        <RevenueChart data={last6MonthsRevenue} />
          </div>}
        { clickedItem === "Top selling" && <div className='w-[900px]'>
          <TopSellingCoursesChart data={topSellingCourses} />
          </div>}
        { clickedItem === "Users platform" && <div className='w-[900px]'>
        <PlatformUsageChart data={platformUsageData} />
          </div>} 
        { clickedItem === "Most Income Lesson" && <div className='w-[900px]'>
            <MostIncomeLessonsChart data={topSellingCourses} />
          </div>}
      </div>
    </div>

      <Footer />
    </>
  );
};

export default stat;
