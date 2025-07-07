import React from "react";

export default function PublicFooter() {
    return (
        <footer className="bg-[#0f172a] text-white py-6 text-center text-sm mt-20">
            <p>
                &copy; {new Date().getFullYear()} <strong>CSIRT Kementerian Perumahan dan Kawasan Permukiman</strong>.
            </p>
            <p className="mt-1 text-red-400 italic">Merah Putih • Aman • Responsif</p>
        </footer>
    );
}
