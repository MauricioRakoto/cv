<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    // ========== LISTE DE TOUTES LES EXPERIENCES ==========
    public function index()
    {
        $experiences = Experience::all();

        return response()->json([
            'success' => true,
            'data'    => $experiences
        ], 200);
    }

    // ========== CRÉER UNE EXPERIENCE ==========
    public function store(Request $request)
    {
        $request->validate([
            'poste'      => 'required|string|max:255',
            'adress_exp' => 'required|string|max:255',
            'date_exp'   => 'required|date',
        ]);

        $experience = Experience::create([
            'poste'      => $request->poste,
            'adress_exp' => $request->adress_exp,
            'date_exp'   => $request->date_exp,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Expérience créée avec succès',
            'data'    => $experience
        ], 201);
    }

    // ========== AFFICHER UNE EXPERIENCE ==========
    public function show($id)
    {
        $experience = Experience::find($id);

        if (!$experience) {
            return response()->json([
                'success' => false,
                'message' => 'Expérience non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $experience
        ], 200);
    }

    // ========== MODIFIER UNE EXPERIENCE ==========
    public function update(Request $request, $id)
    {
        $experience = Experience::find($id);

        if (!$experience) {
            return response()->json([
                'success' => false,
                'message' => 'Expérience non trouvée'
            ], 404);
        }

        $request->validate([
            'poste'      => 'sometimes|required|string|max:255',
            'adress_exp' => 'sometimes|required|string|max:255',
            'date_exp'   => 'sometimes|required|date',
        ]);

        $experience->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Expérience mise à jour avec succès',
            'data'    => $experience
        ], 200);
    }

    // ========== SUPPRIMER UNE EXPERIENCE ==========
    public function destroy($id)
    {
        $experience = Experience::find($id);

        if (!$experience) {
            return response()->json([
                'success' => false,
                'message' => 'Expérience non trouvée'
            ], 404);
        }

        $experience->delete();

        return response()->json([
            'success' => true,
            'message' => 'Expérience supprimée avec succès'
        ], 200);
    }
}
