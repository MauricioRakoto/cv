<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etude extends Model
{
    // Clé primaire personnalisée
    protected $primaryKey = 'etude_id';

    // Champs mass-assignable
    protected $fillable = [
        'etude',
        'adresse_et',
        'date_et',
    ];

    // Cast de la date
    protected $casts = [
        'date_et' => 'date',
    ];
}
