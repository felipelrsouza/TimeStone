<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>@yield('title') - TimeSTONE</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

  <!-- This website CSS -->
  <link rel="stylesheet" href="/css/style.css" />
</head>

<body>
  <div class="header container-fluid">
    <div class="row align-items-center">
      <div class="logo col-2 text-center text-nowrap"><a href="/">TimeSTONE</a></div>
      <div class="tools col-8 text-center">
        <ul>
          <li>
            <a href="/">
              <i class="fa-solid fa-clock"></i>
              <div class="tools-i-title">Time Tracker</div>
            </a>
          </li>
          <li>
            <a href="/tags">
            <i class="fa-solid fa-tag"></i>
              <div class="tools-i-title">Tags</div>
            </a>
          </li>
          <li>
            <a href="/projects">
              <i class="fa-solid fa-newspaper"></i>
              <div class="tools-i-title"> Projects</div>
            </a>
          </li>
        </ul>
      </div>
      <div class="user-info col-2 text-center"><a href="https://github.com/felipelrsouza"><i class="fa-brands fa-github"></i> GitHub</a>
      </div>
    </div>
  </div>

  @yield('content')
  
  <!-- FontAwesome JS -->
  <script src="https://kit.fontawesome.com/c897f32515.js" crossorigin="anonymous"></script>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>