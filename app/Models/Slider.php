<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'title',
        'image',
        'caption',
        'is_active',
    ];
	protected $appends = ['image_url'];
	public function getImageUrlAttribute()
	{
		return $this->image ? asset('storage/' . $this->image) : null;
	}

}
