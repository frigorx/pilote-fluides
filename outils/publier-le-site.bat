@echo off
chcp 65001 >nul
title Publier inerweb.fr
color 0B
echo.
echo   ========================================
echo     PUBLIER inerweb.fr
echo   ========================================
echo.

cd /d C:\git\pilote-fluides

echo   Verification de ce qui est a publier...
echo.
for /f %%n in ('git rev-list --count origin/main..main 2^>nul') do set ATTENTE=%%n
if "%ATTENTE%"=="" set ATTENTE=0

if "%ATTENTE%"=="0" (
  echo   Rien de nouveau a publier.
  echo   Le site est deja a jour.
  echo.
  goto FIN
)

echo   %ATTENTE% modification(s) a envoyer.
echo.
echo   Envoi en cours. Cela peut prendre une a deux
echo   minutes s il y a des fichiers audio.
echo.

git push origin main
if errorlevel 1 goto ECHEC

echo.
echo   Envoi termine. Attente de la publication
echo   par GitHub, environ deux minutes...
echo.

timeout /t 120 /nobreak >nul

echo   Verification sur le serveur...
echo.
for /f %%n in ('curl -s -o nul -w "%%{http_code}" https://inerweb.fr/ 2^>nul') do set CODE=%%n

if "%CODE%"=="200" (
  echo   ----------------------------------------
  echo     C EST EN LIGNE.
  echo     Le site inerweb.fr repond et sert la
  echo     nouvelle version.
  echo   ----------------------------------------
) else (
  echo   ----------------------------------------
  echo     Le site a repondu %CODE%.
  echo     La publication n est peut-etre pas
  echo     finie. Relancez ce fichier dans deux
  echo     minutes : il verifiera de nouveau.
  echo   ----------------------------------------
)
goto FIN

:ECHEC
echo.
echo   ----------------------------------------
echo     L ENVOI A ECHOUE.
echo     Lisez le message ci-dessus et
echo     montrez-le a Claude.
echo   ----------------------------------------

:FIN
echo.
echo   Appuyez sur une touche pour fermer.
pause >nul
