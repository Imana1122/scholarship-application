<?php


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//for frontend routing


// routes/web.php
Route::get('/','App\Http\Controllers\AppController@index')->name('welcome');



Route::get('/about', function () {
    return Inertia::render('User/About');
})->name('about');

Route::get('/downloads','App\Http\Controllers\DownloadController@index')->name('downloads');

Route::get('/contact', 'App\Http\Controllers\ContactController@showContact')->name('contact');

Route::get('/notices', 'App\Http\Controllers\NoticeController@show')->name('notices');
Route::get('/members', 'App\Http\Controllers\MemberController@index')->name('members');

Route::get('/scholarship-result/{id}', 'App\Http\Controllers\StudentScholarshipController@showResult' )->name('scholarship-result.id');
Route::get('/scholarship-result', 'App\Http\Controllers\StudentScholarshipController@checkResult' )->name('scholarship-result');
Route::get('/scholarship-apply','App\Http\Controllers\StudentScholarshipController@showScholarshipApplicationForm' )->name('scholarship-apply');
Route::get('/scholarship-admit-card/request-form','App\Http\Controllers\AdmitCardController@giveAdmitCardRequestForm')->name('scholarship-admit-card.request-form');
Route::get('/scholarship-admit-card/{id}','App\Http\Controllers\AdmitCardController@showAdmitCard')->name('scholarship-admit-card');
Route::get('/user-login-form','App\Http\Controllers\Auth\UserAuthController@showLoginForm')->name('user-login-form');
Route::get('/school-login-form','App\Http\Controllers\Auth\SchoolAuthController@showLoginForm')->name('school-login-form');
Route::post('/user/login','App\Http\Controllers\Auth\UserAuthController@login')->name('user.login');
Route::post('/school/login','App\Http\Controllers\Auth\SchoolAuthController@login')->name('school.login');
Route::get('/login-choose-user','App\Http\Controllers\AppController@chooseUser')->name('login');
Route::post('/scholarship-apply/{id}','App\Http\Controllers\StudentScholarshipController@applyForScholarship')->name('scholarship.apply');

Route::get('/school/send-token-form','App\Http\Controllers\SchoolPasswordResetController@showSendTokenForm')->name('school.send-token.form');
Route::get('/school/verify-token-form/{id}','App\Http\Controllers\SchoolPasswordResetController@showVerifyTokenForm')->name('school.verify-token.form');
Route::get('/school/reset-password-form/{id}','App\Http\Controllers\SchoolPasswordResetController@showResetPasswordForm')->name('school.reset-password.form');
Route::post('/school/send-token','App\Http\Controllers\SchoolPasswordResetController@sendToken')->name('school.send-token');
Route::put('/school/verify-token','App\Http\Controllers\SchoolPasswordResetController@verifyToken')->name('school.verify-token');
Route::put('/school/reset-password','App\Http\Controllers\SchoolPasswordResetController@resetPassword')->name('school.reset-password');

Route::middleware(['auth:school'])->group(function () {
    // Your protected routes go here
    Route::get('/school/dashboard','App\Http\Controllers\AppController@showSchoolDashboard')->name('school-dashboard');
    Route::post('/register-student','App\Http\Controllers\StudentController@registerStudent')->name('register-student');
    Route::post('/school/logout','App\Http\Controllers\Auth\SchoolAuthController@logout')->name('school.logout');
    Route::get('/school/students', 'App\Http\Controllers\StudentController@showStudentsForSchool')->name('show-school-students');
    Route::get('/student/create', 'App\Http\Controllers\StudentController@showRegisterForm')->name('student.create');
    Route::get('/student/update-form/{id}', 'App\Http\Controllers\StudentController@showUpdateForm')->name('student.update-form');
    Route::post('/student/update/{id}', 'App\Http\Controllers\StudentController@updateStudent')->name('student.update');
    Route::delete('/student/delete/{id}', 'App\Http\Controllers\StudentController@delete')->name('student.delete');

    Route::post('/school/update-profile', 'App\Http\Controllers\SchoolController@updateProfile')->name('school-profile.update');
    Route::put('/school/update-password', 'App\Http\Controllers\SchoolController@updatePassword')->name('school-password.update');
    Route::delete('/school/delete-profile', 'App\Http\Controllers\SchoolController@deleteProfile')->name('school-profile.delete');
    Route::get('/school/profile', 'App\Http\Controllers\SchoolController@showProfile')->name('school-profile');

    Route::get('/school/search-students/{id}', 'App\Http\Controllers\SearchController@searchStudents')->name('school.search-students');

});

Route::middleware(['auth:user'])->group(function () {
    // Your protected routes go here
    Route::get('/user/dashboard','App\Http\Controllers\AppController@showUserDashboard')->name('user-dashboard');
    Route::get('/update-admin-profile', 'App\Http\Controllers\Profile\UserProfileController@showUpdateForm' )->name('user.profile');
    Route::get('/user/students', 'App\Http\Controllers\StudentController@showStudentsForAdmin')->name('show-admin-students');

    Route::get('/user/create', 'App\Http\Controllers\Auth\UserAuthController@showRegisterForm')->name('user.create');
    Route::post('/register-user','App\Http\Controllers\UserController@registerUser')->name('register-user');
    Route::get('/user/users','App\Http\Controllers\UserController@showUsersForAdmin')->name('show-admin-users');
    Route::delete('/user/delete/{id}', 'App\Http\Controllers\UserController@delete')->name('user.delete');
    Route::get('/user/update-form/{id}', 'App\Http\Controllers\UserController@showUpdateForm')->name('user.update-form');
    Route::put('/user/update/{id}', 'App\Http\Controllers\UserController@updateUser')->name('user.update');

    Route::get('/user/profile', 'App\Http\Controllers\UserController@showProfile')->name('user-profile');
    Route::put('/user/update-profile', 'App\Http\Controllers\UserController@updateProfileInformation')->name('user-profile.update');
    Route::put('/user/update-password', 'App\Http\Controllers\UserController@updatePassword')->name('user-password.update');
    Route::delete('/user/delete-profile', 'App\Http\Controllers\UserController@deleteProfile')->name('user-profile.delete');
    Route::post('/user/logout','App\Http\Controllers\Auth\UserAuthController@logout')->name('user.logout');

    Route::get('/member/create', 'App\Http\Controllers\MemberController@showRegisterForm')->name('member.create');
    Route::get('/user/members','App\Http\Controllers\MemberController@showMembersForAdmin')->name('show-admin-members');
    Route::post('/register-member','App\Http\Controllers\MemberController@registerMember')->name('register-member');
    Route::get('/member/update-form/{id}', 'App\Http\Controllers\MemberController@showUpdateForm')->name('member.update-form');
    Route::post('/member/update/{id}', 'App\Http\Controllers\MemberController@updateMember')->name('member.update');
    Route::delete('/member/delete/{id}', 'App\Http\Controllers\MemberController@delete')->name('member.delete');

    Route::get('/school/create', 'App\Http\Controllers\Auth\SchoolAuthController@showRegisterForm')->name('school.create');
    Route::post('/register-school','App\Http\Controllers\SchoolController@registerSchool')->name('register-school');
    Route::get('/user/schools','App\Http\Controllers\SchoolController@getSchoolsWithStudents')->name('show-admin-schools');
    Route::get('/school/update-form/{id}', 'App\Http\Controllers\SchoolController@showUpdateForm')->name('school.update-form');
    Route::post('/school/update/{id}', 'App\Http\Controllers\SchoolController@updateSchool')->name('school.update');
    Route::delete('/school/delete/{id}', 'App\Http\Controllers\SchoolController@delete')->name('school.delete');


    Route::get('/notice/create','App\Http\Controllers\NoticeController@showNoticeRegisterForm')->name('notice.create');
    Route::post('/register-notice','App\Http\Controllers\NoticeController@registerNotice')->name('register-notice');
    Route::get('/user/notices','App\Http\Controllers\NoticeController@showNoticesForAdmin')->name('show-admin-notices');
    Route::get('/notice/update-form/{id}', 'App\Http\Controllers\NoticeController@showUpdateForm')->name('notice.update-form');
    Route::post('/notice/update/{id}', 'App\Http\Controllers\NoticeController@updateNotice')->name('notice.update');
    Route::delete('/notice/delete/{id}', 'App\Http\Controllers\NoticeController@delete')->name('notice.delete');


    Route::get('/user/students','App\Http\Controllers\StudentController@showStudentsForAdmin')->name('show-admin-students');
    Route::get('/student/admin-update-result-form/{id}','App\Http\Controllers\StudentController@showUpdateStudentResultForm')->name('student-result-update-form');
    Route::put('/student/updateResult/{id}','App\Http\Controllers\StudentController@updateStudentResult')->name('student-result.update');

    Route::get('/scholarship-application-status/update-form', 'App\Http\Controllers\StudentScholarshipController@showScholarshipApplicationUpdateForm' )->name('scholarship.application-status.index');
    Route::post('/scholarship/update-status', 'App\Http\Controllers\StudentScholarshipController@updateScholarshipApplicationStatus')->name('scholarship.updateStatus');

    Route::get('/download-file/create','App\Http\Controllers\DownloadController@showRegisterForm')->name('download-file.create');

    Route::get('/background-image/create', 'App\Http\Controllers\ApplicationImageController@showRegisterForm')->name('background-image.create');
    Route::get('/user/background-images','App\Http\Controllers\ApplicationImageController@showImagesForAdmin')->name('show-admin-background-images');
    Route::post('/register-background-image','App\Http\Controllers\ApplicationImageController@registerApplicationImage')->name('register-background-image');
    Route::get('/background-image/update-form/{id}', 'App\Http\Controllers\ApplicationImageController@showUpdateForm')->name('background-image.update-form');
    Route::post('/background-image/update/{id}', 'App\Http\Controllers\ApplicationImageController@updateApplicationImage')->name('background-image.update');
    Route::delete('/background-image/delete/{id}', 'App\Http\Controllers\ApplicationImageController@delete')->name('background-image.delete');

    Route::get('/download-file/create', 'App\Http\Controllers\DownloadController@showRegisterForm')->name('download-file.create');
    Route::get('/user/download-files','App\Http\Controllers\DownloadController@showFilesForAdmin')->name('show-admin-download-files');
    Route::post('/register-download-file','App\Http\Controllers\DownloadController@registerDownloadFile')->name('register-download-file');
    Route::get('/download-file/update-form/{id}', 'App\Http\Controllers\DownloadController@showUpdateForm')->name('download-file.update-form');
    Route::post('/download-file/update/{id}', 'App\Http\Controllers\DownloadController@updateDownloadFile')->name('download-file.update');
    Route::delete('/download-file/delete/{id}', 'App\Http\Controllers\DownloadController@delete')->name('download-file.delete');

    Route::get('/logo', 'App\Http\Controllers\LogoController@showUpdateForm')->name('logo');
    Route::post('/logo/update', 'App\Http\Controllers\LogoController@updateLogo')->name('logo.update');

    Route::get('/user/search-students/{id}', 'App\Http\Controllers\SearchController@searchStudentsForAdmin')->name('admin.search-students');
    Route::get('/user/search-notices/{id}', 'App\Http\Controllers\SearchController@searchNotices')->name('admin.search-notices');
    Route::get('/user/search-users/{id}', 'App\Http\Controllers\SearchController@searchUsers')->name('admin.search-users');
    Route::get('/user/search-members/{id}', 'App\Http\Controllers\SearchController@searchMembers')->name('admin.search-members');
    Route::get('/user/search-images/{id}', 'App\Http\Controllers\SearchController@searchImages')->name('admin.search-images');
    Route::get('/user/search-files/{id}', 'App\Http\Controllers\SearchController@searchFiles')->name('admin.search-files');

});










