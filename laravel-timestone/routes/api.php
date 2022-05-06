<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/projects', \App\Http\Controllers\API\ProjectAPIController::class)->middleware('auth.basic');

Route::apiResource('/activities', \App\Http\Controllers\API\ActivityAPIController::class)->middleware('auth.basic');

Route::apiResource('/tags', \App\Http\Controllers\API\TagAPIController::class)->middleware('auth.basic');

Route::resource('/users', \App\Http\Controllers\API\UserController::class);
