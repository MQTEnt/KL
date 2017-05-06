<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        //Check if user authenticated (All roles)
        if (Auth::guard($guard)->check()) {
            return redirect('/');
        }
        if (Auth::guard('admin')->check()) {
            return redirect('/admin/dashboard');
        }

        return $next($request);
    }
}
