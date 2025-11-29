<?php

use App\Http\Controllers\DiscoverController;
use App\Http\Controllers\FrontendController;

// this all are get route for frontend
Route::get('/', [FrontendController::class, 'home'])->name('home');
Route::get('/store', [FrontendController::class, 'store'])->name('store')->middleware('auth');
Route::get('/redeem', [FrontendController::class, 'redeem'])->name('redeem')->middleware('auth');
Route::get('/quests/active-quests', [FrontendController::class, 'activeQuests'])->name('active-quests')->middleware('auth');
Route::get('/quests/single-quest/{id}', [FrontendController::class, 'singleQuest'])->name('single-quest')->middleware('auth');
Route::get('/quests/quest-series', [FrontendController::class, 'questSeries'])->name('quest-series')->middleware('auth');
Route::get('/quests/single-quest-series/{id}', [FrontendController::class, 'singleQuestSeries'])->name('single-quest-series')->middleware('auth');
Route::get('/quests/entered-quests', [FrontendController::class, 'enteredQuests'])->name('entered-quests')->middleware('auth');
Route::get('/quests/ended-quests', [FrontendController::class, 'endedQuests'])->name('ended-quests')->middleware('auth');
Route::get('/profile/{id}', [FrontendController::class, 'profile'])->name('profile')->middleware('auth');
Route::get('/all-help-categories', [FrontendController::class, 'allHelpCategories'])->name('all-help-categories');
Route::get('/single-category-helps/{section}', [FrontendController::class, 'singleCategoryHelps'])->name('single-category-helps');
Route::get('/searched-helps', [FrontendController::class, 'searchedHelps'])->name('searched-helps');
Route::get('/single-faq/{id}/{section}', [FrontendController::class, 'singleFaq'])->name('single-faq');
Route::get('/quests/ended-single-quest/{id}', [FrontendController::class, 'endedSingleQuest'])->name('ended-single-quest')->middleware('auth');
Route::get('/about-us', [FrontendController::class, 'aboutUs'])->name('about-us');
Route::get('/discover', [DiscoverController::class, 'discover'])->name('discover');
Route::get('/brand-marketing', [FrontendController::class, 'brandMarketing'])->name('brand-marketing');
Route::get('/contact-us', [FrontendController::class, 'contactUs'])->name('contact-us');

// this all are the functional route for handle user interaction
Route::post('/join-quest/{id}', [FrontendController::class, 'joinQuest'])->name('join-quest')->middleware('auth');
// Route::post('/vote/{id}', [FrontendController::class, 'vote'])->name('vote')->middleware('auth');
Route::post('/vote/{imageId}/{questId}', [FrontendController::class, 'vote'])->name('vote')->withoutMiddleware(\App\Http\Middleware\HandleInertiaRequests::class);

Route::post('/follow-user', [FrontendController::class, 'followUser'])->name('follow-user');
Route::post('/contact-us', [FrontendController::class, 'createContact'])->name('create-contact');
Route::post('/handle-payment', [FrontendController::class, 'handlePayment'])->name('handle-payment');
Route::post('/claim', [FrontendController::class, 'claim'])->name('claim');
