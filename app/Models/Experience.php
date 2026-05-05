<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    // Clé primaire personnalisée
    protected $primaryKey = 'exp_id';

    // Champs mass-assignable
    protected $fillable = [
        'poste',
        'adress_exp',
        'date_exp',
    ];

    // Cast de la date
    protected $casts = [
        'date_exp' => 'date',
    ];
}
