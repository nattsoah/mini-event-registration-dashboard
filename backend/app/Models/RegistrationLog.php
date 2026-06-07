<?php

namespace App\Models;

use App\Enums\RegistrationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistrationLog extends Model
{
    const UPDATED_AT = null;

    protected $fillable = [
        'registration_id',
        'status',
        'message',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => RegistrationStatus::class,
            'created_at' => 'datetime',
        ];
    }

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
