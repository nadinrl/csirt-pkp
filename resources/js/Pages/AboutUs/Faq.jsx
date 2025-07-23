import React, { useState } from 'react'; // Import useState
import { Head } from '@inertiajs/react';
import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';

export default function Faq() {
    // State untuk melacak FAQ mana yang sedang terbuka.
    // Kita akan menyimpan indeks dari FAQ yang sedang terbuka.
    // Jika tidak ada yang terbuka, nilainya bisa null.
    const [openIndex, setOpenIndex] = useState(null);

    // Fungsi untuk mengubah status terbuka/tertutup FAQ
    const toggleFaq = (index) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const faqs = [
        {
            question: "1. What is the difference between CERT and CSIRT ?",
            answer: "CSIRT stands for computer security incident response team. CERT stands for computer emergency response (or readiness) team. And CIRT can stand for either computer incident response team or, less frequently, cybersecurity incident response team. CSIRT, CERT and CIRT are often used interchangeably in the field. In fact, CSIRT and CIRT are almost always near-equivalent; essentially they are synonyms. An organization might prefer one or the other based on the organization’s language or style, or subtle differences in organizational scope. Generally though, the meaning is consistent with the formal definition and description of CSIRT’s outlined in the 2007 Carnegie Mellon document “Defining Computer Security Incident Response Teams.” Its first line reads: “A computer security incident response team (CSIRT) is a concrete organizational entity (i.e., one or more staff) that is assigned the responsibility for coordinating and supporting the response to a computer security event or incident.”"
        },
        {
            question: "2. What is the difference between ID-SIRTI/CC and CSIRT.ID ?",
            answer: "ID-SIRTII/CC is the national computer security incident response team, while CSIRT.ID is an identifier that distinguishes a CSIRT that focuses on handling incidents in a specific sector or organization. (This answer needs to be filled with actual relevant information)."
        },
        {
            question: "3. Contoh pertanyaan lain?",
            answer: "Ini adalah jawaban untuk pertanyaan lain. Anda bisa mengisi dengan konten yang relevan."
        }
    ];

    return (
        <>
            <Head title="FAQ - CSIRT Kementerian PKP" />

            <PublicHeader />

            {/* Main content area, adjust max-w- and padding to match image */}
            <main className="max-w-3xl mx-auto px-4 py-12"> {/* Adjusted max-w- to 3xl and px- to 4 */}
                <h1 className="text-4xl font-bold mb-8 text-[#0f172a] text-center">F.A.Q</h1> {/* Adjusted text size to 4xl to match image */}

                {/* Container for all FAQ items */}
                <div className="bg-white rounded-lg shadow-md p-6"> {/* Added p-6 for inner padding */}
                    {faqs.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                overflow-hidden
                                ${index < faqs.length - 1 ? 'border-b border-gray-200 mb-0' : 'mb-0'} {/* Only add border-b for items not last, no mb- */}
                                ${index > 0 ? 'mt-0' : ''} {/* No margin-top if it's the first item */}
                            `}
                        >
                            {/* Question button */}
                            <button
                                className="w-full text-left py-4 px-0 flex justify-between items-center text-lg font-semibold text-gray-800 cursor-pointer focus:outline-none" // Adjusted padding and text color
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                {item.question}
                                {/* Icon */}
                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${ // Adjusted icon size
                                        openIndex === index ? 'rotate-180' : ''
                                    } text-gray-600`} // Adjusted icon color
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={openIndex === index ? "M19 9l-7 7-7-7" : "M19 9l-7 7-7-7"} // Changed icon to chevron
                                    ></path>
                                </svg>
                            </button>

                            {/* Answer section */}
                            {openIndex === index && (
                                <div
                                    id={`faq-answer-${index}`}
                                    className="pb-4 pt-2 text-gray-600 leading-relaxed animate-fade-in" // Adjusted padding and text color
                                >
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <PublicFooter />
        </>
    );
}