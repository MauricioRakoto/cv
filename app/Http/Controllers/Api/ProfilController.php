<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profil;
use App\Models\Langue;
use App\Models\Qualite;
use App\Models\Etude;
use App\Models\Experience;
use App\Models\Competence;
use App\Models\Loisirs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilController extends Controller
{
    // ===== HELPER — Charger les relations =====
    private function loadRelations(Profil $profil): array
    {
        $data = $profil->toArray();

        $data['langues']     = Langue::whereIn('langue_id', $profil->langue_id ?? [])->get();
        $data['qualites']    = Qualite::whereIn('qualite_id', $profil->qualite_id ?? [])->get();
        $data['etudes']      = Etude::whereIn('etude_id', $profil->etude_id ?? [])->get();
        $data['experiences'] = Experience::whereIn('exp_id', $profil->exp_id ?? [])->get();
        $data['competences'] = Competence::whereIn('competence_id', $profil->competence_id ?? [])->get();
        $data['loisirs']     = Loisirs::whereIn('loisirs_id', $profil->loisirs_id ?? [])->get();

        return $data;
    }

    // ========== LISTE ==========
    public function index()
    {
        $profils = Profil::all()->map(function ($profil) {
            return $this->loadRelations($profil);
        });

        return response()->json([
            'success' => true,
            'data'    => $profils
        ], 200);
    }

    // ========== CRÉER ==========
    public function store(Request $request)
    {
        $request->validate([
            'nom'           => 'required|string|max:255',
            'prenom'        => 'required|string|max:255',
            'sexe'          => 'required|string|max:50',
            'email'         => 'required|email|unique:profils,email',
            'photo'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'adresse_pr'    => 'required|string|max:255',
            'status'        => 'required|string|max:255',
            'date_birth'    => 'required|date',
            'nationalite'   => 'required|string|max:255',
            'desc'          => 'nullable|string',
            'langue_id'     => 'required|array',
            'qualite_id'    => 'required|array',
            'etude_id'      => 'required|array',
            'exp_id'        => 'required|array',
            'competence_id' => 'required|array',
            'loisirs_id'    => 'required|array',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public');
        }

        $profil = Profil::create([
            'nom'           => $request->nom,
            'prenom'        => $request->prenom,
            'sexe'          => $request->sexe,
            'email'         => $request->email,
            'photo'         => $photoPath,
            'adresse_pr'    => $request->adresse_pr,
            'status'        => $request->status,
            'date_birth'    => $request->date_birth,
            'nationalite'   => $request->nationalite,
            'desc'          => $request->desc,
            'langue_id'     => $request->langue_id,
            'qualite_id'    => $request->qualite_id,
            'etude_id'      => $request->etude_id,
            'exp_id'        => $request->exp_id,
            'competence_id' => $request->competence_id,
            'loisirs_id'    => $request->loisirs_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profil créé avec succès',
            'data'    => $this->loadRelations($profil)
        ], 201);
    }

    // ========== AFFICHER ==========
    public function show($id)
    {
        $profil = Profil::find($id);

        if (!$profil) {
            return response()->json([
                'success' => false,
                'message' => 'Profil non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $this->loadRelations($profil)
        ], 200);
    }

    // ========== MODIFIER ==========
    public function update(Request $request, $id)
    {
        $profil = Profil::find($id);

        if (!$profil) {
            return response()->json([
                'success' => false,
                'message' => 'Profil non trouvé'
            ], 404);
        }

        $request->validate([
            'nom'           => 'sometimes|required|string|max:255',
            'prenom'        => 'sometimes|required|string|max:255',
            'sexe'          => 'sometimes|required|string|max:50',
            'email'         => 'sometimes|required|email|unique:profils,email,' . $id . ',profil_id',
            'photo'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'adresse_pr'    => 'sometimes|required|string|max:255',
            'status'        => 'sometimes|required|string|max:255',
            'date_birth'    => 'sometimes|required|date',
            'nationalite'   => 'sometimes|required|string|max:255',
            'desc'          => 'nullable|string',
            'langue_id'     => 'sometimes|array',
            'qualite_id'    => 'sometimes|array',
            'etude_id'      => 'sometimes|array',
            'exp_id'        => 'sometimes|array',
            'competence_id' => 'sometimes|array',
            'loisirs_id'    => 'sometimes|array',
        ]);

        if ($request->hasFile('photo')) {
            if ($profil->photo) {
                Storage::disk('public')->delete($profil->photo);
            }
            $profil->photo = $request->file('photo')->store('photos', 'public');
        }

        // Mettre à jour les champs
        $fields = [
            'nom', 'prenom', 'sexe', 'email', 'adresse_pr',
            'status', 'date_birth', 'nationalite', 'desc',
            'langue_id', 'qualite_id', 'etude_id',
            'exp_id', 'competence_id', 'loisirs_id'
        ];

        foreach ($fields as $field) {
            if ($request->has($field)) {
                $profil->$field = $request->$field;
            }
        }

        $profil->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès',
            'data'    => $this->loadRelations($profil)
        ], 200);
    }

    // ========== SUPPRIMER ==========
    public function destroy($id)
    {
        $profil = Profil::find($id);

        if (!$profil) {
            return response()->json([
                'success' => false,
                'message' => 'Profil non trouvé'
            ], 404);
        }

        if ($profil->photo) {
            Storage::disk('public')->delete($profil->photo);
        }

        $profil->delete();

        return response()->json([
            'success' => true,
            'message' => 'Profil supprimé avec succès'
        ], 200);
    }
}
