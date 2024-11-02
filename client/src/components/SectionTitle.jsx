import React from 'react'
import './sectionTitle.css'

const SectionTitle = ({title}) => {
  return (
    <div className='section-title'>
        <h1>{title}</h1>
        <div className='title-line'>

        </div>
    </div>
  ) 
}

export default SectionTitle