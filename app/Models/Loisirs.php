<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loisirs extends Model
{
    protected $primaryKey = 'loisirs_id';

    protected $fillable = [
        'nom_loisirs',
    ];
}
