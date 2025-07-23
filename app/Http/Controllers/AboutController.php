<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; // <-- PENTING: Tambahkan baris ini untuk mengatasi error "Class 'App\Http\Controllers\Controller' not found"
use Inertia\Inertia; // PENTING: Diperlukan untuk merender komponen Inertia/React

class AboutController extends Controller
{
    /**
     * Menampilkan halaman "About Us".
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Inertia::render() akan mencari komponen React di resources/js/Pages/
        return Inertia::render('About');
    }
}