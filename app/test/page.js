"use client"
import React from 'react'

export default function Test() {
    const handleSaveContact = () => {
        // Dummy contact information
        const contactData = `BEGIN:VCARD
VERSION:3.0
FN:Rabins walterraj
TEL:8807212405
END:VCARD`;

        // Create a Blob containing the contact data
        const blob = new Blob([contactData], { type: 'text/vcard' });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contact.vcf'; // Set the filename for the download

        // Programmatically click the anchor element to initiate the download
        document.body.appendChild(a); // Append the anchor to the document body
        a.click();

        // Clean up by revoking the URL object
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a); // Remove the anchor from the document body


    };
    return (
        <div>
            <button onClick={handleSaveContact} className='bg-black text-white rounded-full p-3 active:opacity-50'>Save Contact</button>
        </div>
    )
}
