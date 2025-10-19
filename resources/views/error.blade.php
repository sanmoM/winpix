<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>403 | Access Denied</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Inter", sans-serif;
      background: #f8f9fa;
      color: #333;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .error-container {
      text-align: center;
      max-width: 480px;
      padding: 40px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 96px;
      color: #F91E4E;
      margin-bottom: 10px;
      line-height: 1;
    }

    h2 {
      font-size: 24px;
      margin-bottom: 16px;
    }

    p {
      color: #666;
      margin-bottom: 24px;
      font-size: 15px;
    }

    a {
      display: inline-block;
      padding: 10px 20px;
      background: #F91E4E;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    a:hover {
      background: #d91542;
    }
  </style>
</head>
<body>
  <div class="error-container">
    <h1>403</h1>
    <h2>Access Denied</h2>
    <p>You don't have permission to access this page.<br>
    Please contact your administrator or return to the homepage.</p>
    <a href="{{ url('/') }}">Go Home</a>
  </div>
</body>
</html>
