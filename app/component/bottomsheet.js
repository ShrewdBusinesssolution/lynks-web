import React from 'react'

export default function BottomSheet({ flag, message }) {
    // Determine if the bottom sheet should be shown based on the flag
    const isVisible = flag === true; // Adjust this condition based on your flag's logic

    // Apply the 'hidden' class if the bottom sheet should not be shown
    const visibilityClass = isVisible ? '' : 'hidden';

    return (
        <div className={`fixed h-1/2 bottom-0 bg-white w-full shadow-lg rounded-[30px] border-t-2 border-[#14437A]/20 ${visibilityClass}`}>
            <div className='flex justify-center'>
                <div className='w-[100px] h-[5px] bg-[#14437A] mt-2 rounded-full'></div>
            </div>

            <div className='w-full h-full flex justify-center items-center'>
                <h3 className='text-xl font-medium text-[#14437A]'>{message}</h3>
            </div>
        </div>
    );
}

