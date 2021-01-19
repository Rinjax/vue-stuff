<?php

namespace Synavel\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Synavel\Http\Controllers\Controller;
use Synavel\Models\User;

/**
 * Class AuthController
 * Handles user login/out requests. Authenticating users using legacy synergy methods.
 * @package Synergy\Http\Controllers\Auth
 */
class AuthController extends Controller
{
    /**
     * User fields that get returned for use by the frontend application. Make sure sensitive fields are excluded.
     * @var array
     */
    protected $user_fields_to_return = [
        "user_id",
        "company_ids",
        "username",
        "first_name",
        "last_name",
        "position",
        "ddi",
        "group_memberships",
        "additional_privileges",
        "excluded_privileges",
        "email_address",
        "telesales_team_id",
    ];

    /**
     * Main login function to authenticate user for API requests using Laravel Sanctum.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $user = $this->findUserUsingLegacySynergyPassword(
            $request->input('username'),
            $request->input('password')
        );

        if ($user) {
            \Auth::login($user);
            return response()->json(['success'], 204);
        }

        return response()->json(['invalid'], 403);
    }

    public function loginWithSynergyToken(string $token)
    {
        $user = User::where('integration_token', $token)->first();

        if ($user) {
            \Auth::login($user);

            $user->update(['integration_token' => null]);

            session()->save();

           //dd(\Auth::user(), session()->all());

            return redirect('/ui/dashboard');
        }

        dd('no user!');

    }

    public function modalLogin($token, $path)
    {
        $user = User::where('integration_token', $token)->first();

        if ($user) {
            \Auth::login($user);

            $user->update(['integration_token' => null]);

            session()->save();

            //dd(\Auth::user(), session()->all(), '/'.$path);

            return redirect('/'. $path);
        }

        dd('no user oh dear!');
    }

    public function goToSynergy(Request $request)
    {
        $token = Str::random(40);

        $request->user()->update(['integration_token' => $token]);

        return redirect('http://dev.synergy.co.uk/ii/synavelIntegration/loginWithSynergyToken/' . $token);
    }

    /**
     * Log the user out
     * @return JsonResponse
     */
    public function logout()
    {
        try{
             \Auth::logout();

             return response()->json(['success'], 200);

        } catch (\Exception $e) {
            return response()->json([$e->getMessage()], 200);

        }
    }

    /**
     * Return the authenticated user. Used by the frontend application to store the user details. Only selected fields
     * return back via $user_fields_to_return property.
     * @param Request $request
     * @return User|null
     */
    public function user(Request $request): ?User
    {
        if ($request->user()) {
            return $request->user()->makeHidden($this->getUserFieldsToHide($request->user()->getAttributes()));
        }

        return null;
    }

    /**
     * Find user in the database using legacy sha1 hash on pwdHash column
     * @param string $username
     * @param string $password
     * @return User|null
     */
    private function findUserUsingLegacySynergyPassword(string $username, string $password): ?User
    {
        return User::where('username', $username)->where('pwdHash', sha1($password))->first();
    }

    /**
     * Sort through the current model's attributes and compare with the $user_fields_to_return array, to see which ones
     * need to be hidden.
     * @param array $modelAttributes
     * @return array
     */
    private function getUserFieldsToHide(array $modelAttributes): array
    {
        return array_diff(array_keys($modelAttributes), $this->user_fields_to_return);
    }
}
