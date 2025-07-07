<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Incident extends Model
{
    use HasFactory;

    protected $fillable = ['ticket_number', 'reporter_name', 'reporter_email', 'title', 'description', 'status','attachment'];

    public function responses()
    {
        return $this->hasMany(IncidentResponse::class);
    }
}

