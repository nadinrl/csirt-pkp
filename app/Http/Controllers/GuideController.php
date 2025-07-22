<?php

namespace App\Http\Controllers;

use App\Models\Guide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class GuideController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:guides index', only: ['index']),
            new Middleware('permission:guides create', only: ['create', 'store']),
            new Middleware('permission:guides edit', only: ['edit', 'update']),
            new Middleware('permission:guides delete', only: ['destroy']),
        ];
    }

    /**
     * Admin: Daftar panduan
     */
    public function index(Request $request)
    {
        $guides = Guide::with('author')
            ->when($request->search, fn($q) =>
                $q->where('title', 'like', "%{$request->search}%")
            )
            ->latest()
            ->paginate(10);

        return inertia('Guides/Index', [
            'guides' => $guides,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Admin: Form tambah panduan
     */
    public function create()
    {
        return inertia('Guides/Create');
    }

    /**
     * Admin: Simpan panduan baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'is_active' => 'required|boolean',
        ]);

        $path = $request->file('file')->store('guides', 'public');

        Guide::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'file_path' => $path,
            'is_active' => $validated['is_active'],
            'author_id' => auth()->id(),
        ]);

        return to_route('guides.index')->with('success', 'Panduan berhasil ditambahkan.');
    }

    /**
     * Admin: Form edit panduan
     */
    public function edit(Guide $guide)
    {
        $guide->file_url = Storage::url($guide->file_path);

        return inertia('Guides/Edit', [
            'guide' => $guide,
        ]);
    }

    /**
     * Admin: Update panduan
     */
    public function update(Request $request, Guide $guide)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('file')) {
            if ($guide->file_path && Storage::disk('public')->exists($guide->file_path)) {
                Storage::disk('public')->delete($guide->file_path);
            }

            $validated['file_path'] = $request->file('file')->store('guides', 'public');
        } else {
            $validated['file_path'] = $guide->file_path; // keep existing
        }

        $guide->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'file_path' => $validated['file_path'],
            'is_active' => $validated['is_active'],
        ]);

        return to_route('guides.index')->with('success', 'Panduan berhasil diperbarui.');
    }

    /**
     * Admin: Hapus panduan
     */
    public function destroy(Guide $guide)
    {
        if ($guide->file_path && Storage::disk('public')->exists($guide->file_path)) {
            Storage::disk('public')->delete($guide->file_path);
        }

        $guide->delete();

        return back()->with('success', 'Panduan berhasil dihapus.');
    }

    /**
     * Public: Daftar panduan aktif
     */
    public function publicIndex(Request $request)
    {
        $guides = Guide::where('is_active', true)
        ->when($request->search, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%");
        })
            ->latest()
            ->paginate(10)
            ->appends(['search' => $request->search]);

        return inertia('Public/Guides/Index', [
            'guides' => $guides,
            'filters' => $request->only('search'), // opsional, kalau mau kirim ke frontend
        ]);
    }

    /**
     * Public: Download panduan
     */
    public function show(Guide $guide)
    {
        abort_unless($guide->is_active, 403);

        if (!Storage::disk('public')->exists($guide->file_path)) {
            abort(404, 'File tidak ditemukan.');
        }

        $path = storage_path('app/public/' . $guide->file_path);
        $filename = str()->slug($guide->title) . '.' . pathinfo($guide->file_path, PATHINFO_EXTENSION);

        return response()->download($path, $filename);
    }

    public function detail(Guide $guide, Request $request)
	{
		abort_unless($guide->is_active, 403);

		return inertia('Public/Guides/Show', [
			'guide' => [
				'id' => $guide->id,
				'title' => $guide->title,
				'description' => $guide->description,
				'download_url' => route('public.guides.show', $guide),
                'file_url' => asset('storage/' . $guide->file_path), // penting
            ],
             'page' => $request->query('page'),
		]);
	}

}
