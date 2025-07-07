<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class SliderController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:sliders index', only: ['index']),
            new Middleware('permission:sliders create', only: ['create', 'store']),
            new Middleware('permission:sliders edit', only: ['edit', 'update']),
            new Middleware('permission:sliders delete', only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $sliders = Slider::query()
            ->when($request->search, fn ($q) => $q->where('title', 'like', "%{$request->search}%"))
            ->latest()
            ->paginate(10);

        return inertia('Sliders/Index', [
            'sliders' => $sliders,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return inertia('Sliders/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'image' => 'required|image|max:2048',
            'is_active' => 'required|boolean',
        ]);

        $path = $request->file('image')->store('sliders', 'public');

        Slider::create([
            'title' => $request->title,
            'caption' => $request->caption,
            'image' => $path,
            'is_active' => $request->is_active,
        ]);

        return to_route('sliders.index');
    }

    public function edit(Slider $slider)
    {
        return inertia('Sliders/Edit', [
			'slider' => [
				'id' => $slider->id,
				'title' => $slider->title,
				'caption' => $slider->caption, 
				'image_url' => asset('storage/' . $slider->image),
				'is_active' => $slider->is_active,
			]
		]);
    }

    public function update(Request $request, Slider $slider)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($slider->image);
            $slider->image = $request->file('image')->store('sliders', 'public');
        }

        $slider->update([
            'title' => $request->title,
            'caption' => $request->caption,
            'is_active' => $request->is_active,
            'image' => $slider->image,
        ]);

        return to_route('sliders.index');
    }

    public function destroy(Slider $slider)
    {
        Storage::disk('public')->delete($slider->image);
        $slider->delete();

        return back();
    }
}
