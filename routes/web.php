<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

use App\Http\Controllers\{
    ProfileController,
    PermissionController,
    RoleController,
    UserController,
    ArticleController,
    SliderController,
    GuideController,
    IncidentController,
    IncidentResponseController,
    PublicController
};

// 🌐 Halaman Publik
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/artikel', [ArticleController::class, 'publicIndex'])->name('public.articles');
Route::get('/artikel/{slug}', [ArticleController::class, 'show'])->name('articles.show');

Route::get('/panduan', [GuideController::class, 'publicIndex'])->name('public.guides');
Route::get('/panduan/{guide}', [GuideController::class, 'show'])->name('public.guides.show'); // untuk download
Route::get('/panduan/{guide}/detail', [GuideController::class, 'detail'])->name('public.guides.detail'); // untuk preview
Route::get('/panduan-publik', [GuideController::class, 'publicIndex'])->name('public.guides.index');


Route::prefix('lapor-insiden')->group(function () {
    Route::get('/', [IncidentController::class, 'create'])->name('incidents.create');
    Route::post('/', [IncidentController::class, 'store'])->name('incidents.store');
});
Route::get('/track-insiden', function () {
    return Inertia::render('Public/Incidents/Track');
})->name('incidents.track.form');

Route::get('/track-insiden/{ticket}', [IncidentController::class, 'track'])->name('incidents.track');
Route::get('/captcha-refresh', function () {
    $a = rand(1, 10);
    $b = rand(1, 10);
    session(['captcha_result' => $a + $b]);

    return response()->json([
        'a' => $a,
        'b' => $b,
    ]);
});

Route::get('/kontak', function () {
    return Inertia::render('Public/Contact');
})->name('public.contact');

// 🖥️ Dashboard
Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// 🔐 Page Admin (Autentikasi Diperlukan)
Route::middleware('auth')->group(function () {

    // 👤 Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // 🔐 Akses
    Route::resource('permissions', PermissionController::class);
    Route::resource('roles', RoleController::class)->except('show');
    Route::resource('users', UserController::class);

    // 📄 Konten
    Route::resource('articles', ArticleController::class)->except('show');
    Route::resource('sliders', SliderController::class)->except('show');
    Route::resource('guides', GuideController::class)->except('show');

    // ⚠️ Insiden
    Route::prefix('incidents')->name('incidents.')->group(function () {
        Route::get('/', [IncidentController::class, 'index'])->name('index');
        Route::get('/{incident}', [IncidentController::class, 'show'])->name('show');
        Route::delete('/{incident}', [IncidentController::class, 'destroy'])->name('destroy');

        // 🔁 Respons Insiden Historikal
        Route::post('/{incident}/responses', [IncidentResponseController::class, 'store'])->name('responses.store');
    });
});

require __DIR__.'/auth.php';
