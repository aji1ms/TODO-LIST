import React from 'react';
import typeScriptimg from "../assets/image.webp";
import reactimg from "../assets/image2.webp";

const ImageHeader = () => {
    return (
        <div className='flex items-center'>
            <img className='w-28 h-28 object-contain' src={reactimg} alt="" />
            <span className='mx-4 font-bold'>+</span>
            <img className='w-28 h-28 object-contain' src={typeScriptimg} alt="" />
        </div>
    )
}

export default ImageHeader;
