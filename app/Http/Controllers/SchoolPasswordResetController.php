<?php

namespace App\Http\Controllers;

use App\Models\School;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class SchoolPasswordResetController extends Controller
{
    public function showSendTokenForm()
    {
        return Inertia::render('Auth/School/SendToken');
    }

    public function showVerifyTokenForm($id)
    {
        return Inertia::render('Auth/School/VerifyToken', ['school_phone' => $id]);
    }

    public function showResetPasswordForm($id)
    {
        return Inertia::render('Auth/School/ResetPassword', ['school_phone' => $id]);
    }

    public function sendToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_phone' => [
                'required',
                'numeric',
                'exists:Schools,school_phone',
            ],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $school_phone = strval($request->input('school_phone'));

        $verification_token = mt_rand(10000, 99999);
        $encryptedToken = Hash::make($verification_token);

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
                // Eager load the passwordResetToken relationship
                $School = School::with('passwordResetToken')->where('school_phone', $school_phone)->first();

                // Create or update the SchoolPasswordResetToken
                if (!$School->passwordResetToken) {
                    $School->passwordResetToken()->create([
                        'verification_token' => $encryptedToken,
                        'expires_at' => now()->addMinutes(1),
                        'verification_status' => false,
                    ]);
                } else {
                    $School->passwordResetToken->update([
                        'verification_token' => $encryptedToken,
                        'expires_at' => now()->addMinutes(1),
                        'verification_status' => false,
                    ]);
                }

                // Redirect to another URL with a success message
                return redirect("/password-reset/school/verify-token-form/$school_phone");
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

        // Eager load the passwordResetToken relationship
        $School = School::with('passwordResetToken')->where('school_phone', $school_phone)->first();

        if (!$School || !$School->passwordResetToken) {
            return response()->json(['error' => 'Verification token is missing or expired.', 'verification_status' => false], 404);
        }

        $verificationRecord = $School->passwordResetToken;

        $expiresAt = \Carbon\Carbon::parse($verificationRecord->expires_at, 'Asia/Kathmandu');
        if ($expiresAt->isBefore(now('Asia/Kathmandu')->subMinutes(1))) {

            return response()->json(['error' => 'Verification token is expired.', 'verification_status' => false], 422);
        }

        $storedVerificationToken = $verificationRecord->verification_token;

        if (Hash::check($verification_token, $storedVerificationToken)) {
            $verificationRecord->update(['verification_status' => true]);

            return response()->json(['message' => 'Verification token is successful', 'verification_status' => true]);
        } else {
            return response()->json(['error' => 'Invalid verification token. Try regenerating again.', 'verification_status' => false], 422);
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_phone' => 'required|exists:Schools,school_phone',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols(),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the School by the school_phone
        $School = School::where('school_phone', $request->school_phone)->first();

        if (!$School) {
            return response()->json(['error' => 'School not found'], 404);
        }

        // Eager load the passwordResetToken relationship
        $verificationRecord = $School->passwordResetToken;

        $expiresAt = \Carbon\Carbon::parse($verificationRecord->expires_at, 'Asia/Kathmandu');
        if (!$verificationRecord || !$verificationRecord->verification_status || $expiresAt->isBefore(now('Asia/Kathmandu')->subMinutes(1))) {
            return back()->withErrors(['error' => 'Invalid or expired verification token. Please resend the token.']);
        }

        // Update the School's password
        $School->update([
            'password' => $request->password,
        ]);

        // Mark the verification record as used
        $verificationRecord->update(['verification_status' => false]);

        return redirect('/auth/school-login-form');
    }
}
