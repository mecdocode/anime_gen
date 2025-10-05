@echo off
echo Setting up Retro Anime Finder...
echo.

echo Installing root dependencies...
call npm install
echo.

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo.

echo Installing backend dependencies...
cd backend
call npm install
cd ..
echo.

echo Setup complete!
echo.
echo To start the development servers, run:
echo npm run dev
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:5000
echo.
pause
