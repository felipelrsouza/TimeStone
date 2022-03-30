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

use App\Http\Controllers\ActionController;

Route::get('/', [ActionController::class, 'index'] );

Route::get('/projects', function () {

    return view('projects');
});

Route::get('/calendar', function () {

    return view('calendar');
});

Route::get('/dashboard', function () {

    return view('dashboard');
});

Route::get('/reports', function () {

    return view('reports');
});
