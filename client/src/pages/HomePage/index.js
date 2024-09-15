import React, { useState } from 'react'
import './HomePage.css';
import Carousels_Feature from '../../components/Carousels_Features';

export default function HomePage() {
  return (
    <div className='home-container'>
      <Carousels_Feature />
    </div>
  )
}
