<?php 
use Illuminate\Support\Facades\Route;
?>

<div class="login-background min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div>
        {{ $logo }}
    </div>

    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        {{ $slot }}
    </div>
    <?php if(Route::currentRouteName() == 'login'){?>
    <div class="text-center w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        Don't have an account? <a class="underline" href="register">Sign up</a>.
    </div>

    <div class="text-center text-white sm:max-w-md mt-6 px-6">
        This is an app under development.<br>Data may disappear without previous notice.
    </div>
    <?php } ?>
</div>
