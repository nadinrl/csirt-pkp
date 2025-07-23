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
            question: "Apa itu CSIRT?",
            answer: "CSIRT (Computer Security Incident Response Team) adalah tim yang bertanggung jawab untuk menerima, meninjau, dan merespons laporan insiden keamanan siber. Tujuan utamanya adalah untuk meminimalkan dampak insiden keamanan dan memulihkan sistem secepat mungkin."
        },
        {
            question: "Bagaimana cara melaporkan insiden keamanan?",
            answer: "Anda dapat melaporkan insiden keamanan melalui menu 'Lapor Insiden' yang tersedia di navigasi utama kami. Ikuti langkah-langkah yang diminta untuk memberikan detail insiden."
        },
        {
            question: "Apa yang harus saya lakukan jika sistem saya terinfeksi malware?",
            answer: "Segera putuskan koneksi internet pada perangkat yang terinfeksi untuk mencegah penyebaran lebih lanjut. Jangan mencoba membersihkan sendiri jika Anda tidak yakin. Laporkan insiden tersebut kepada kami melalui formulir laporan insiden."
        },
        {
            question: "Apakah laporan insiden saya akan dirahasiakan?",
            answer: "Ya, semua laporan insiden ditangani dengan kerahasiaan penuh. Informasi yang Anda berikan hanya akan digunakan untuk tujuan penanganan dan analisis insiden."
        },
        {
            question: "Berapa lama waktu yang dibutuhkan untuk merespons laporan insiden?",
            answer: "Waktu respons kami bervariasi tergantung pada tingkat keparahan dan kompleksitas insiden. Namun, kami berkomitmen untuk merespons semua laporan secepat mungkin dan memberikan pembaruan secara berkala."
        }
    ];

    return (
        <>
            <Head title="FAQ - CSIRT Kementerian PKP" />

            <PublicHeader />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8 text-[#0f172a] text-center">FAQ</h1>

                <div className="max-w-4xl mx-auto px-6 space-y-4"> {/* Mengurangi space-y menjadi 4 */}
                    {faqs.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
                            {/* Bagian Pertanyaan yang bisa diklik */}
                            <button
                                className="w-full text-left p-5 flex justify-between items-center text-xl font-semibold text-[#0f172a] cursor-pointer hover:bg-gray-50 focus:outline-none"
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openIndex === index} // Aksesibilitas
                                aria-controls={`faq-answer-${index}`} // Aksesibilitas
                            >
                                {item.question}
                                {/* Icon Plus/Minus */}
                                <svg
                                    className={`w-6 h-6 transform transition-transform duration-300 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={openIndex === index ? "M18 12H6" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
                                    ></path>
                                </svg>
                            </button>

                            {/* Bagian Jawaban yang tersembunyi/muncul */}
                            {openIndex === index && (
                                <div
                                    id={`faq-answer-${index}`} // Aksesibilitas
                                    className="px-5 pb-5 pt-0 text-gray-700 leading-relaxed animate-fade-in" // Menambahkan padding-top 0
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