<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Etude;
use Illuminate\Http\Request;

class EtudeController extends Controller
{
    // ========== LISTE DE TOUTES LES ETUDES ==========
    public function index()
    {
        $etudes = Etude::all();

        return response()->json([
            'success' => true,
            'data'    => $etudes
        ], 200);
    }

    // ========== CRÉER UNE ETUDE ==========
    public function store(Request $request)
    {
        $request->validate([
            'etude'      => 'required|string|max:255',
            'adresse_et' => 'required|string|max:255',
            'date_et'    => 'required|date',
        ]);

        $etude = Etude::create([
            'etude'      => $request->etude,
            'adresse_et' => $request->adresse_et,
            'date_et'    => $request->date_et,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Etude créée avec succès',
            'data'    => $etude
        ], 201);
    }

    // ========== AFFICHER UNE ETUDE ==========
    public function show($id)
    {
        $etude = Etude::find($id);

        if (!$etude) {
            return response()->json([
                'success' => false,
                'message' => 'Etude non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $etude
        ], 200);
    }

    // ========== MODIFIER UNE ETUDE ==========
    public function update(Request $request, $id)
    {
        $etude = Etude::find($id);

        if (!$etude) {
            return response()->json([
                'success' => false,
                'message' => 'Etude non trouvée'
            ], 404);
        }

        $request->validate([
            'etude'      => 'sometimes|required|string|max:255',
            'adresse_et' => 'sometimes|required|string|max:255',
            'date_et'    => 'sometimes|required|date',
        ]);

        $etude->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Etude mise à jour avec succès',
            'data'    => $etude
        ], 200);
    }

    // ========== SUPPRIMER UNE ETUDE ==========
    public function destroy($id)
    {
        $etude = Etude::find($id);

        if (!$etude) {
            return response()->json([
                'success' => false,
                'message' => 'Etude non trouvée'
            ], 404);
        }

        $etude->delete();

        return response()->json([
            'success' => true,
            'message' => 'Etude supprimée avec succès'
        ], 200);
    }
}
