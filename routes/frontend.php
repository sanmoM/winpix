<?php

use App\Http\Controllers\DiscoverController;
use App\Http\Controllers\FrontendController;

Route::get('/', [FrontendController::class, 'home'])->name('home');
Route::get('/store', [FrontendController::class, 'store'])->name('store');
Route::get('/redeem', [FrontendController::class, 'redeem'])->name('redeem');
Route::get('/quests/active-quests', [FrontendController::class, 'activeQuests'])->name('active-quests');
Route::get('/quests/single-quest/{id}', [FrontendController::class, 'singleQuest'])->name('single-quest');
Route::get('/quests/quest-series', [FrontendController::class, 'questSeries'])->name('quest-series');
Route::get('/quests/single-quest-series', [FrontendController::class, 'singleQuestSeries'])->name('single-quest-series');
Route::get('/quests/entered-quests', [FrontendController::class, 'enteredQuests'])->name('entered-quests');
Route::get('/quests/ended-quests', [FrontendController::class, 'endedQuests'])->name('ended-quests');
Route::get('/profile/{id}', [FrontendController::class, 'profile'])->name('profile');
Route::get('/all-help-categories', [FrontendController::class, 'allHelpCategories'])->name('all-help-categories');
Route::get('/single-category-helps', [FrontendController::class, 'singleCategoryHelps'])->name('single-category-helps');
Route::get('/searched-helps', [FrontendController::class, 'searchedHelps'])->name('searched-helps');
Route::get('/single-faq', [FrontendController::class, 'singleFaq'])->name('single-faq');
Route::get('/quests/ended-single-quest/{id}', [FrontendController::class, 'endedSingleQuest'])->name('ended-single-quest');
Route::get('/about-us', [FrontendController::class, 'aboutUs'])->name('about-us');
Route::get('/discover', [DiscoverController::class, 'discover'])->name('discover');
Route::get('/create-quest', [FrontendController::class, 'createQuest'])->name('create-quest');