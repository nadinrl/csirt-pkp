<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\IncidentResponse;
use Illuminate\Http\Request;

class IncidentResponseController extends Controller
{
    public function store(Request $request, Incident $incident)
	{
		$request->validate([
			'response' => 'required|string',
			'new_status' => 'nullable|in:open,in_progress,resolved',
		]);

		// Simpan respons
		$incident->responses()->create([
			'responder_id' => auth()->id(),
			'response' => $request->response,
			'new_status' => $request->new_status,
		]);

		// Jika ada pembaruan status
		if ($request->filled('new_status') && $incident->status !== $request->new_status) {
			$incident->status = $request->new_status;
			$incident->save();
		}

		return back()->with('success', 'Respon berhasil ditambahkan.');
	}

}
