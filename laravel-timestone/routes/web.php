<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\MainController;

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/dashboard', [MainController::class, 'activityIndex'])->name('dashboard');

    Route::get('/', [MainController::class, 'activityIndex']);

    Route::controller(MainController::class)->group(function () {
        Route::get('/projects', 'projectIndex');
        Route::post('/projects', 'projectStore');
    });

    Route::controller(MainController::class)->group(function () {
        Route::get('/tags', 'tagsIndex');
        Route::post('/tags', 'tagsStore');
    });
});
