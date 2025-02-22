import React from "react";
import { useState, useEffect } from 'react';
import Image from "next/image";

const signe = () => {

  return (
    <form action="post" style={{ margin: '20px' }}>
    <label>Name</label>
    <input type="text" style={{ display: 'block', marginBottom: '10px' }} />
    <label>Password</label>
    <input type="text" style={{ display: 'block', marginBottom: '10px' }} />
    <button type="submit">Submit</button>
  </form>
  );
};

export default signe;