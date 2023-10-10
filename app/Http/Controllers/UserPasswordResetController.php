<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserPasswordResetController extends Controller
{
    public function showSendTokenForm()
    {
        return Inertia::render('Auth/User/SendToken');
    }

    public function showVerifyTokenForm($id)
    {
        return Inertia::render('Auth/User/VerifyToken', ['phone_number' => $id]);
    }

    public function showResetPasswordForm($id)
    {
        return Inertia::render('Auth/User/ResetPassword', ['phone_number' => $id]);
    }

    public function sendToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone_number' => [
                'required',
                'numeric',
                'exists:users,phone_number',
            ],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $phone_number = strval($request->input('phone_number'));

        $verification_token = mt_rand(10000, 99999);
        $encryptedToken = Hash::make($verification_token);

        try {
            $client = new Client();
            $response = $client->post('https://sms.aakashsms.com/sms/v3/send', [
                'form_params' => [
                    'auth_token' => 'c1eecbd817abc78626ee119a530b838ef57f8dad9872d092ab128776a00ed31d',
                    'to' => $phone_number,
                    'text' => "Your verification token is: $verification_token",
                ],
            ]);

            if ($response->getStatusCode() === 200) {
                // Eager load the passwordResetToken relationship
                $user = User::with('passwordResetToken')->where('phone_number', $phone_number)->first();

                // Create or update the UserPasswordResetToken
                if (!$user->passwordResetToken) {
                    $user->passwordResetToken()->create([
                        'verification_token' => $encryptedToken,
                        'expires_at' => now()->addMinutes(1),
                        'verification_status' => false,
                    ]);
                } else {
                    $user->passwordResetToken->update([
                        'verification_token' => $encryptedToken,
                        'expires_at' => now()->addMinutes(1),
                        'verification_status' => false,
                    ]);
                }

                // Redirect to another URL with a success message
                return redirect("/user/verify-token-form/$phone_number");
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
            'phone_number' => ['required', 'numeric'],
            'verification_token' => ['required', 'numeric'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $phone_number = $request->input('phone_number');
        $verification_token = $request->input('verification_token');

        // Eager load the passwordResetToken relationship
        $user = User::with('passwordResetToken')->where('phone_number', $phone_number)->first();

        if (!$user || !$user->passwordResetToken) {
            return response()->json(['error' => 'Verification token is missing or expired.', 'verification_status' => false], 404);
        }

        $verificationRecord = $user->passwordResetToken;

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
            'phone_number' => 'required|exists:users,phone_number',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols(),
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the user by the phone_number
        $user = User::where('phone_number', $request->phone_number)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Eager load the passwordResetToken relationship
        $verificationRecord = $user->passwordResetToken;

        $expiresAt = \Carbon\Carbon::parse($verificationRecord->expires_at, 'Asia/Kathmandu');
        if (!$verificationRecord || !$verificationRecord->verification_status || $expiresAt->isBefore(now('Asia/Kathmandu')->subMinutes(1))) {
            return back()->withErrors(['error' => 'Invalid or expired verification token. Please resend the token.']);
        }

        // Update the user's password
        $user->update([
            'password' => $request->password,
        ]);

        // Mark the verification record as used
        $verificationRecord->update(['verification_status' => false]);

        return redirect('/user-login-form');
    }
}
