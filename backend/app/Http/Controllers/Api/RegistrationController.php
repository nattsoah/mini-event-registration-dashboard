<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegistrationCollection;
use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the registrations.
     */
    public function index(Request $request): RegistrationCollection
    {
        $query = Registration::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('event_name', 'like', "%{$search}%");
            });
        }

        // Filter by Status
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Sort
        $sortField = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortField, $sortOrder);

        // Pagination (Bonus)
        $perPage = $request->get('per_page', 10);
        
        return new RegistrationCollection($query->paginate($perPage));
    }

    /**
     * Store a newly created registration.
     */
    public function store(Request $request): RegistrationResource
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'unique:registrations,email,NULL,id,event_name,' . $request->event_name
            ],
            'phone' => 'nullable|string|max:20',
            'event_name' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ], [
            'email.unique' => 'You have already registered for this event.'
        ]);

        $validated['status'] = 'pending';
        $validated['registered_at'] = now();

        $registration = Registration::create($validated);

        // Record initial log
        $registration->logs()->create([
            'status' => 'pending',
            'message' => 'Initial status automatically set to Pending.',
        ]);

        return new RegistrationResource($registration);
    }

    /**
     * Display the specified registration.
     */
    public function show(Registration $registration): RegistrationResource
    {
        return new RegistrationResource($registration->load('logs'));
    }

    /**
     * Update the status of the specified registration.
     */
    public function updateStatus(Request $request, Registration $registration): RegistrationResource
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $oldStatus = $registration->status->value;
        $newStatus = $validated['status'];

        if ($oldStatus !== $newStatus) {
            $registration->update($validated);

            // Record status change log
            $message = $newStatus === 'pending' 
                ? "Status reset to Pending by administrator (previously " . ucfirst($oldStatus) . ")."
                : "Status changed from " . ucfirst($oldStatus) . " to " . ucfirst($newStatus) . " by administrator.";

            $registration->logs()->create([
                'status' => $newStatus,
                'message' => $message,
            ]);
        }

        return new RegistrationResource($registration->load('logs'));
    }

    /**
     * Export registrations as CSV (Bonus).
     */
    public function exportCsv()
    {
        $registrations = Registration::all();
        $csvFileName = 'registrations_' . now()->format('Ymd_His') . '.csv';
        
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$csvFileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['ID', 'Name', 'Email', 'Phone', 'Event', 'Status', 'Registered At'];

        $callback = function() use($registrations, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($registrations as $registration) {
                fputcsv($file, [
                    $registration->id,
                    $registration->name,
                    $registration->email,
                    $registration->phone,
                    $registration->event_name,
                    $registration->status->value,
                    $registration->registered_at->toDateTimeString(),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
