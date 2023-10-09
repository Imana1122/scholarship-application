<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeRequest;
use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NoticeController extends Controller
{
    public function show()
{
    $notices = Notice::orderBy('updated_at', 'desc')->get();


    return Inertia::render('User/Notice', ['notices' => $notices, 'activeRoute'=>'notices']);
}

public function showNoticeRegisterForm(){
    // Get the authenticated school
    $user = Auth::guard('user')->user();

    return Inertia::render('Admin/NewNotice', ['currentUser'=>$user]);
}

public function registerNotice(NoticeRequest $request){

 $data=$request->validated();

 $notice=Notice::create([
    'type'=>$data['type'],
    'content'=>$data['content']
 ]);

 if($notice){
    return redirect('/user/notices');
 }else{
    return back();
 }
}


public function showUpdateForm(Request $request, $id){
    // Get the authenticated school
    $user = Auth::guard('user')->user();

    // Fetch the student using the provided $id
    $notice = Notice::find($id);

    if (!$notice) {
        // Return back with an error message
        return redirect()->back()->with('error', 'Notice with ID ' . $id . ' not found.');
    }

    return Inertia::render('Admin/UpdateNotice', [
        'currentUser'=>$user,
        'notice' => $notice,
    ]);
}

public function updateNotice(NoticeRequest $request, $id){


    $notice = Notice::find($id);

    if (!$notice) {
        // Return a response with a 404 Not Found status code
        return response()->json(['error' => 'Notice with ID ' . $id . ' not found.'], 404);
    }

    $data = $request->validated();

    $updatedNotice=$notice->update([
        'type'=>$data['type'],
        'content'=>$data['content']
     ]);

     if($updatedNotice){
        return redirect('/user/notices');
     }else{
        return back();
     }

}

public function delete(Request $request, $id)
{
    // Fetch the student using the provided $id
    $notice = Notice::findOrFail($id);



    if (!$notice) {
        // Return a response with a 404 Not Found status code
        return response()->json(['error' => 'Notice with ID ' . $id . ' not found.'], 404);
    }

    if ($notice->delete()) {
        // Return a response with a 200 OK status code and success message
        return response()->json(['message' => 'Notice deleted successfully.'], 200);
    } else {
        // Return a response with a 500 Internal Server Error status code and error message
        return response()->json(['error' => 'Failed to delete notice.'], 500);
    }
}


public function showNoticesForAdmin(){
    // Get the authenticated school
    $user = Auth::guard('user')->user();

    $notices = Notice::orderBy('created_at', 'desc')->get();

    $informationNotices = $notices->where('type', 'info')->values()->all();

    $warningNotices = $notices->where('type', 'warning')->values()->all();

    $errorNotices = $notices->where('type', 'error')->values()->all();



    return Inertia::render('Admin/Notices',['notices'=>['All'=>$notices, 'Information'=>$informationNotices,'Warning'=>$warningNotices,'Error'=>$errorNotices],'currentUser'=>$user]);
}


}
