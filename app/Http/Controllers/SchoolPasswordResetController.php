<?php

namespace App\Http\Controllers;


use App\Models\School;
use App\Models\SchoolPasswordResetToken;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SchoolPasswordResetController extends Controller
{

    public function showSendTokenForm(){
        return Inertia::render('Auth/School/SendToken');
    }

    public function showVerifyTokenForm($id){
        return Inertia::render('Auth/School/VerifyToken',['school_phone'=>$id]);
    }

    public function showResetPasswordForm($id){
        return Inertia::render('Auth/School/ResetPassword',['school_phone'=>$id]);
    }

    public function sendToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_phone' => [
                'required',
                'numeric',
                'exists:schools,school_phone'
            ],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $school_phone = strval($request->input('school_phone'));

        $verification_token = mt_rand(10000, 99999);
        $encryptedToken = Hash::make($verification_token);
        echo($school_phone);

        try {
            $client = new Client();
            $response = $client->post('https://sms.aakashsms.com/sms/v3/send', [
                'form_params' => [
                    'auth_token' => 'c1eecbd817abc78626ee119a530b838ef57f8dad9872d092ab128776a00ed31d',
                    'to' => $school_phone,
                    'text' => "Your verification token is: $verification_token",
                ],
            ]);

            if ($response->getStatusCode() === 200) {
                SchoolPasswordResetToken::updateOrCreate(
                    ['school_phone' => $school_phone],
                    [
                        'verification_token' => $encryptedToken,
                        'expires_at' => now()->addMinutes(1),
                        'verification_status' => false,
                    ]
                );

                // Redirect to another URL with a success message
                return redirect("/school/verify-token-form/$school_phone");
            } else {
                // Redirect back with an error message
                return back()->with('error', 'Failed to send verification token');
            }
        } catch (\Exception $e) {
            // Redirect back with an error message and input
            return back()
                ->withErrors('error', 'Failed to send verification token: ' . $e->getMessage())
                ->withErrors('errorShow', 'Failed to send verification token. Check your Internet Connection.');
        }
    }



    public function verifyToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_phone' => ['required', 'numeric'],
            'verification_token' => ['required', 'numeric'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $school_phone = $request->input('school_phone');
        $verification_token = $request->input('verification_token');

        $verificationRecord = DB::table('school_password_reset_tokens')
            ->where('school_phone', $school_phone)
            ->where('expires_at', '>', now('Asia/Kathmandu')->subMinutes(1))
            ->latest()
            ->first();

        if (!$verificationRecord) {
            return response()->json(['error' => 'Verification token is missing or expired.', 'verification_status' => false], 404);
        }

        $storedVerificationToken = $verificationRecord->verification_token;
        if (Hash::check($verification_token, $storedVerificationToken)) {
            DB::table('school_password_reset_tokens')
                ->where('school_phone', $school_phone)
                ->update(['verification_status' => true]);

            return response()->json(['message' => 'Verification token is successful', 'verification_status' => true]);
        } else {
            return response()->json(['error' => 'Invalid verification token. Try regenerating again.', 'verification_status' => false], 422);
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_phone' => 'required|exists:schools,school_phone',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols(),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the user by the school_phone
        $user = School::where('school_phone', $request->school_phone)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Check if there is a valid verification record
        $verificationRecord = SchoolPasswordResetToken::where('school_phone', $request->school_phone)
            ->where('verification_status', true)
            ->where('expires_at', '>', now('Asia/Kathmandu')->subMinutes(1))
            ->first();

        if (!$verificationRecord) {
            return back()->withErrors(['error' => 'Invalid or expired verification token. Please resend the token.']);
        }

        // Update the user's password
        $user->update([
            'password' => $request->password
        ]);

        // Optional: Mark the verification record as used if needed
        $verificationRecord->update(['verification_status' => false]);

        return redirect('/school-login-form');
    }
}
