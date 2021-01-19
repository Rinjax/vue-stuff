<?php

Route::view('/login', 'welcome')->middleware('web')->name('login');

Route::post('/login', 'AuthController@login')->middleware('spa');

Route::get('/login/{token}', 'AuthController@loginWithSynergyToken')->middleware('web')->name('login.token');

Route::get('/modal/{token}/{path}', 'AuthController@modalLogin')->where("path", ".*" )->middleware('web');

Route::get('/synergy', 'AuthController@goToSynergy')->middleware('web');

Route::get('/logout', 'AuthController@logout')->name('logout');

Route::get('/user', 'AuthController@user')->middleware(['spa', 'auth:sanctum']);

// todo heartbeat to automatically close the UI, below wont work because it will keep the session live.
//Route::get('/heartbeat', 'AuthController@heartbeat')->middleware(['spa','auth:sanctum']);