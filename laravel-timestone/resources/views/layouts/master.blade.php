<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>@yield('title') - {{ config('app.name', 'Laravel') }}</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
  
  <!-- Jetstream CSS -->
  <link rel="stylesheet" href="<?php echo URL::to('/'); ?>/css/app.css">

  @livewireStyles
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

  <!-- This website CSS -->
  <link rel="stylesheet" href="<?php echo URL::to('/'); ?>/css/style.css" />
</head>

<body>
  <div class="header container-fluid">
    <div class="row align-items-center">
      <div class="logo col-2 text-center text-nowrap"><a href="<?php echo URL::to('/'); ?>">TimeSTONE</a></div>
      <div class="tools col-8 text-center">
        <ul>
          <li>
            <a href="<?php echo URL::to('/'); ?>">
              <i class="fa-solid fa-clock"></i>
              <div class="tools-i-title">Time Tracker</div>
            </a>
          </li>
          <li>
            <a href="<?php echo URL::to('tags'); ?>">
            <i class="fa-solid fa-tag"></i>
              <div class="tools-i-title">Tags</div>
            </a>
          </li>
          <li>
            <a href="<?php echo URL::to('projects'); ?>">
              <i class="fa-solid fa-newspaper"></i>
              <div class="tools-i-title"> Projects</div>
            </a>
          </li>
        </ul>
      </div>
      <div class="user-info btn btn-outline-dark" data-bs-toggle="dropdown" aria-expanded="false" type="button">
        <img src="<?php echo Auth::user()->profile_photo_url; ?>" alt="<?php echo Auth::user()->name."'s profile picture"; ?>"> <?php echo Auth::user()->name; ?>
      </div>

      <ul class="user-info-menu dropdown-menu">
        <div class="menu-item">
          <div>
            <a href="<?php echo URL::to('/'); ?>/user/profile">
              <i class="fa-solid fa-user"></i> My Profile
            </a>
          </div>
        </div>
        <div class="menu-item">
          <form method="POST" action="{{ route('logout') }}">
            @csrf
            <div c>
                <a href="{{ route('logout') }}" onclick="event.preventDefault();
                            this.closest('form').submit(); " role="button">
                    <i class="fas fa-sign-out-alt"></i>
    
                    {{ __('Log Out') }}
                </a>
            </div>
        </form>
        </div>
      </ul>
    </div>
  </div>

  @yield('content')
  
  <!-- FontAwesome JS -->
  <script src="https://kit.fontawesome.com/c897f32515.js" crossorigin="anonymous"></script>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>