<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Competence;
use Illuminate\Http\Request;

class CompetenceController extends Controller
{
    // ========== LISTE ==========
    public function index()
    {
        $competences = Competence::all();

        return response()->json([
            'success' => true,
            'data'    => $competences
        ], 200);
    }

    // ========== CRÉER ==========
    public function store(Request $request)
    {
        $request->validate([
            'nom_comp' => 'required|string|max:50',
        ]);

        $competence = Competence::create([
            'nom_comp' => $request->nom_comp,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Compétence créée avec succès',
            'data'    => $competence
        ], 201);
    }

    // ========== AFFICHER ==========
    public function show($id)
    {
        $competence = Competence::find($id);

        if (!$competence) {
            return response()->json([
                'success' => false,
                'message' => 'Compétence non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $competence
        ], 200);
    }

    // ========== MODIFIER ==========
    public function update(Request $request, $id)
    {
        $competence = Competence::find($id);

        if (!$competence) {
            return response()->json([
                'success' => false,
                'message' => 'Compétence non trouvée'
            ], 404);
        }

        $request->validate([
            'nom_comp' => 'sometimes|required|string|max:50',
        ]);

        $competence->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Compétence mise à jour avec succès',
            'data'    => $competence
        ], 200);
    }

    // ========== SUPPRIMER ==========
    public function destroy($id)
    {
        $competence = Competence::find($id);

        if (!$competence) {
            return response()->json([
                'success' => false,
                'message' => 'Compétence non trouvée'
            ], 404);
        }

        $competence->delete();

        return response()->json([
            'success' => true,
            'message' => 'Compétence supprimée avec succès'
        ], 200);
    }
}
