<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LangueController;
use App\Http\Controllers\Api\QualiteController;
use App\Http\Controllers\Api\EtudeController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProfilController;

Route::apiResource('langues', LangueController::class);
Route::apiResource('qualites', QualiteController::class);
Route::apiResource('etudes', EtudeController::class);
Route::apiResource('experiences', ExperienceController::class);
Route::apiResource('profils', ProfilController::class);
