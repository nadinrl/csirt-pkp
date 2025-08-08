<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Incident extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ticket_number',
        'reporter_name',
        'reporter_email',
        'reporter_phone',
        'title',
        'description',
        'status', // Pastikan 'status' ada di fillable
        'attachment'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // Jika Anda ingin mengelola status sebagai Enum di Laravel 10+, Anda bisa menambahkan ini:
        // 'status' => IncidentStatusEnum::class,
        // Namun, untuk saat ini, kita biarkan sebagai string biasa karena kita menggunakan ENUM di DB.
    ];

    /**
     * Get the responses for the incident.
     */
    public function responses()
    {
        return $this->hasMany(IncidentResponse::class);
    }
}
