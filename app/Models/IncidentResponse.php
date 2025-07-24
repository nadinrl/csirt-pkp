<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IncidentResponse extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'incident_id',
        'responder_id',
        'response',
        'status_at_response', // Tambahkan kolom baru ini ke fillable
    ];

    /**
     * Get the incident that owns the response.
     */
    public function incident()
    {
        return $this->belongsTo(Incident::class);
    }

    /**
     * Get the responder (user) who made the response.
     */
    public function responder()
    {
        // Ubah relasi ini agar responder_id bisa nullable
        return $this->belongsTo(User::class, 'responder_id');
    }
}

