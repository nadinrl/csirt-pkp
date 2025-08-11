<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Slider;
use App\Models\Guide;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('Public/Home', [
            'sliders' => Slider::where('is_active', true)->latest()->get()->map(function ($slider) {
                return [
                    'id' => $slider->id,
                    'title' => $slider->title,
                    'caption' => $slider->caption,
                    'image' => $slider->image,
                ];
            }),
            'articles' => Article::with('author')->where('is_active', true)->latest()->take(3)->get()->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'slug' => $article->slug,
                    'excerpt' => \Str::limit(strip_tags($article->content), 60),
                    'author' => [
                        'name' => optional($article->author)->name,
                    ],
                    'image' => $article->image,
                ];
            }),
            'guides' => Guide::where('is_active', true)->latest()->get()->map(function ($guide) {
                return [
                    'id' => $guide->id,
                    'title' => $guide->title,
                    'file' => $guide->file,
                ];
            }),
            'pgpPublicKeyUrl' => asset('files/public-key.asc'),
            'rfc2350Url' => asset('files/rfc2350.pdf'),
        ]);
    }
}
