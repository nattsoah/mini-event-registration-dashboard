<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'event_name' => $this->event_name,
            'status' => $this->status,
            'notes' => $this->notes,
            'registered_at' => $this->registered_at?->toDateTimeString(),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
            'logs' => $this->whenLoaded('logs', function () {
                return $this->logs->map(function ($log) {
                    return [
                        'id' => $log->id,
                        'status' => $log->status,
                        'message' => $log->message,
                        'created_at' => $log->created_at->toDateTimeString(),
                    ];
                });
            }),
        ];
    }
}
