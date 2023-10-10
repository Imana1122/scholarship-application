<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>
        @if(Route::is('welcome'))
            Welcome to Itahari Municipality Scholarship Application
        @elseif(Route::is('about'))
            About Us
        @elseif(Route::is('downloads'))
            Downloads
        @elseif(Route::is('contact'))
            Contacts
        @elseif(Route::is('scholarship.result'))
            Result
        @elseif(Route::is('scholarship.result.check'))
            Result Check
        @elseif(Route::is('scholarship.apply'))
            Scholarship Apply
        @elseif(Route::is('scholarship.admit-card.request-form'))
            Admit Card Request Form
        @elseif(Route::is('scholarship.admit-card'))
            Admit Card
        @else
            Itahari Scholarship Application
        @endif
    </title>
    <link rel="icon" type="image/png" href="/storage/images/logo.png" />

    @viteReactRefresh
    @vite('resources/css/app.css')
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body>
    <script
      type="module"
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
    ></script>
    @inertia
  </body>
</html>
