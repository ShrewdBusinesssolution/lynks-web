"use client"
import React, { useState } from 'react'
import { toast } from 'sonner';
import Lottie from "react-lottie";
import animationData from "../../public/loader.json"; // Import your Lottie animation JSON file







export default function SaveContact({ uuid }) {

    const [count, setcount] = useState(1)
    const [loader, setloader] = useState(false)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData, // Your Lottie animation JSON
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };



    const handleShareContact = async () => {
        try {
            const type = window?.navigator?.platform;


            if (count <= 2) {
                setcount(count + 1)
                if (type !== 'iPhone') {
                    window.open('https://play.google.com/store/apps/details?id=com.shrewd.lynksapp', '_blank');
                    return 0
                } else if (type === 'iPhone') {
                    window.open('https://apps.apple.com/in/app/lynksapp/id6477260859', '_blank');
                    return 0
                } else {
                    window.open('https://play.google.com/store/apps/details?id=com.shrewd.lynksapp', '_blank');
                    return 0
                }
            }

            const requestOptions = {
                method: 'POST', // Specify the method
                headers: {
                    'Content-Type': 'application/json', // Set the content type header
                },
                body: JSON.stringify({ uuid: uuid }), // Convert the UUID to a JSON string
            };

            setloader(true)

            // Make the POST request
            const res = await fetch('https://dev-lynkapp.shrewdbs.com/api/web/contact-export-id', requestOptions);
            const response = await res.json(); // Parse the JSON response
            console.log("🚀 ~ handleShareContact ~ response:", response.data);

            const googleUlr = "https://drive.google.com/uc?export=download&id=";
            window.location = googleUlr + response.data;
            setloader(false)




        } catch (error) {
            toast.error(`Contact Import Not Support in Desktop Browser`, { position: "top-right", duration: 3000 });

        }
    };


    const isAndroid = async () => {
        return /Android/i.test(navigator.userAgent);
    }

    // Function to check if the user is using iOS
    const isiOS = async () => {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    return (
        <>
            {loader && (
                <div className="fixed inset-0 z-[99999] bg-white/60 backdrop-blur-md flex justify-center items-center">
                    <Lottie options={defaultOptions} height={200} width={200} />
                </div>
            )}
            <button onClick={handleShareContact} className="px-8 py-3 whitespace-nowrap rounded-full bg-[#14437A] text-white capitalize active:opacity-50">
                save contact
            </button>
        </>
    )
}
