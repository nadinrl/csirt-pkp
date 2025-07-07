<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IncidentResponse extends Model
{
    use HasFactory;

    protected $fillable = ['incident_id', 'responder_id', 'response'];

    public function incident()
    {
        return $this->belongsTo(Incident::class);
    }

    public function responder()
    {
        return $this->belongsTo(User::class, 'responder_id');
    }
}
