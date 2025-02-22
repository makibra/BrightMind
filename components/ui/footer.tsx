
import React from 'react';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faXTwitter, faYoutube, faLinkedin,faTiktok } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/logo.svg'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer :  React.FC= () => {



  return (
    <footer className="bg-gray-800 text-white ">
      <div className="all container mx-auto px-4 md:px-8 lg:px-16 ">
        <hr className="border-t border-gray-700 mx-auto my-8 w-full " />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col items-center">
            <Image title='logo' src={logo} alt='logo'  width={150}/>
           

                        <div className="flex mt-4 justify-between w-[140px] mb-4">
                          <Link href="#" className="hover:text-customGreen transition-colors pl-[10px]">
                            <FontAwesomeIcon icon={faFacebookF} />
                          </Link>
                          <Link href="#"  target="_blank" className="hover:text-customGreen transition-colors">
                            <FontAwesomeIcon icon={faInstagram} />
                          </Link>
                          <Link href="#"  target="_blank" className="hover:text-customGreen transition-colors">
                            <FontAwesomeIcon icon={faTiktok}/>
                          </Link>
                          <Link href="#" className="hover:text-customGreen transition-colors">
                            <FontAwesomeIcon icon={faLinkedin} />
                          </Link>
                        </div>
          </div>
          {/* <div className="grid grid-cols-3 sm:grid-cols-3 gap-8 mb-10 bg-red-500">
            
            <div className="flex flex-col space-y-4">
              <Link href="#home" className="hover:text-customGreen transition-colors">
              </Link>
              <Link href="#services" className="hover:text-customGreen transition-colors">
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <Link href="#ourWork" className="hover:text-customGreen transition-colors">
              </Link>
              <Link href="#aboutUs" className="hover:text-customGreen transition-colors">
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <Link href="#ourteamsection" className="hover:text-customGreen transition-colors">
              </Link>
              <Link href="#contact" className="hover:text-customGreen transition-colors">
              </Link>
            </div> 
          </div>*/}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 py-10">
            <div className="flex flex-col space-y-4 items-center ">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Algeria, Sidi Bel Abbès
              </p>
            </div>
            <div className="flex flex-col space-y-4 items-center">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                0678912345
              </p>
            </div>
            <div className="flex flex-col space-y-4 items-center">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                contact@BrightMinds.com
              </p>
              
            </div>
          </div>
        </div>
        <p className="text-center text-sm font-semibold pb-10">
          © 2024 Braithminds. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

