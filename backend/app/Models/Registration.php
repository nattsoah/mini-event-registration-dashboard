<?php

namespace App\Models;

use App\Enums\RegistrationStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Registration extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'event_name',
        'status',
        'notes',
        'registered_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => RegistrationStatus::class,
            'registered_at' => 'datetime',
        ];
    }

    public function logs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(RegistrationLog::class)->orderBy('created_at', 'desc');
    }

    public function scopePending(Builder $query): Builder
    {
        // TODO: filter pending registrations
        return $query;
    }

    public function scopeConfirmed(Builder $query): Builder
    {
        // TODO: filter confirmed registrations
        return $query;
    }

    public function scopeCancelled(Builder $query): Builder
    {
        // TODO: filter cancelled registrations
        return $query;
    }
}
