<?php

use Illuminate\Support\Facades\Route;


Route::get('/modal/{path?}', function () {
    return view('modal');
})->where( "path", ".*" );

/**
 * Catch All route to pass all other request to the UI
 */
Route::get( "/ui/{path?}", function () {

    return view('welcome');
})->where( "path", ".*" );