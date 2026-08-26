@echo off
chcp 65001 >nul
title Console des acces inerWeb

rem Chemin absolu : ce raccourci doit marcher depuis le Bureau comme
rem depuis le depot. Si un jour le depot demenage, changer cette ligne.
set "PROJET=C:\git\pilote-fluides"

echo.
echo   ======================================================
echo     CONSOLE DES ACCES ENSEIGNANT - inerWeb
echo   ======================================================
echo.
echo   Votre navigateur va s'ouvrir tout seul.
echo   Tout se passe la-bas : vous n'avez rien a taper ici.
echo.
echo   Cette fenetre doit rester ouverte pendant que
echo   vous vous en servez. Pour arreter : fermez-la.
echo.

if not exist "%PROJET%\outils\console-acces\serveur.mjs" (
  echo   [!] Le dossier du projet est introuvable :
  echo       %PROJET%
  echo.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo   [!] Node n'a pas ete trouve sur cet ordinateur.
  echo       Sans lui, la console ne peut pas demarrer.
  echo.
  pause
  exit /b 1
)

cd /d "%PROJET%"
node "outils\console-acces\serveur.mjs"

echo.
echo   La console est arretee.
pause
