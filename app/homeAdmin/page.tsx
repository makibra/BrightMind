"use client";

import React from 'react';
import Header from '@/components/ui/headerAdmin'; 
import Footer from '@/components/ui/footer';
import { useRouter } from 'next/navigation';



const HomeAdmin = () => {

 const router = useRouter();
  const approvelink = () => {
    router.push('homeAdmin/approveCourses');
  }
  const manageAccounts = () => {
    router.push('homeAdmin/manageAccounts');
  }
  const statistics = () => {
    router.push('homeAdmin/statistics');
  }

  return (
    <>
      <Header />
      <section className="py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-xl px-4 md:px-8">
    <div className="relative mb-10 pt-8 md:mb-16">
      <h2 className="mb-4 text-center font-serif text-3xl font-bold text-blue-900 md:mb-6 md:text-4xl"></h2>
    </div>
    
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
      <article className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
        <h1 className="text-lg font-semibold uppercase">Statistics</h1>
        <h1 className="text-sm ">Overview key metrics like total courses and student enrollments to monitor platform performance.</h1>
        <a onClick={statistics} className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center bg-blue-500 text-white transition-all hover:w-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </article>

      <article className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
        <h1 className="text-lg font-semibold uppercase">Manage Accounts</h1>
        <h1 className="text-sm ">Oversee user accounts, update information, and manage permissions for platform security.</h1>
        <a onClick={manageAccounts} className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center bg-blue-500 text-white transition-all hover:w-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </article>

      <article className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
        <h1 className="text-lg font-semibold uppercase">Approve Courses</h1>
        <h1 className="text-sm ">Review and approve new courses to ensure quality and appropriateness for publication.</h1>
        <a onClick={approvelink} className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center bg-blue-500 text-white transition-all hover:w-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </article>

      
    </div>
  </div>
</section>

      <Footer />
    </>
  );
};

export default HomeAdmin;
