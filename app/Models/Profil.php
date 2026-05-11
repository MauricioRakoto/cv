<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    protected $primaryKey = 'profil_id';

    protected $fillable = [
        'nom', 'prenom', 'sexe', 'email', 'photo',
        'adresse_pr', 'status', 'date_birth',
        'nationalite', 'desc',
        'langue_id', 'qualite_id', 'etude_id',
        'exp_id', 'competence_id', 'loisirs_id',
    ];

    // ===== CAST JSON =====
    protected $casts = [
        'date_birth'    => 'date',
        'langue_id'     => 'array',  // ← JSON array
        'qualite_id'    => 'array',  // ← JSON array
        'etude_id'      => 'array',  // ← JSON array
        'exp_id'        => 'array',  // ← JSON array
        'competence_id' => 'array',  // ← JSON array
        'loisirs_id'    => 'array',  // ← JSON array
    ];

    // ===== RELATIONS (retourne plusieurs) =====
    public function langues()
    {
        return Langue::whereIn('langue_id', $this->langue_id ?? [])->get();
    }

    public function qualites()
    {
        return Qualite::whereIn('qualite_id', $this->qualite_id ?? [])->get();
    }

    public function etudes()
    {
        return Etude::whereIn('etude_id', $this->etude_id ?? [])->get();
    }

    public function experiences()
    {
        return Experience::whereIn('exp_id', $this->exp_id ?? [])->get();
    }

    public function competences()
    {
        return Competence::whereIn('competence_id', $this->competence_id ?? [])->get();
    }

    public function loisirs()
    {
        return Loisirs::whereIn('loisirs_id', $this->loisirs_id ?? [])->get();
    }
}
