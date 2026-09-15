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
  echo.
  echo   Mise a jour de la memoire de Claude...
  echo   ^(catalogue des stations, puis index RAG^)
  echo.
  call :MAJ_RAG
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
goto :EOF

REM ============================================================
REM   MAJ_RAG — la memoire de Claude suit le site
REM   Demande de Franck du 15/09/2026 : « a chaque fois qu on
REM   ameliore, modifie ou corrige inerweb.fr, il faut
REM   systematiquement une mise a jour du RAG ».
REM   Deux temps : on releve ce que le site contient, puis on
REM   l indexe. Un echec ici n annule JAMAIS la publication :
REM   le site est deja en ligne, seul l index reste a rattraper.
REM ============================================================
:MAJ_RAG
node C:\git\pilote-fluides\outils\catalogue-stations.mjs
if errorlevel 1 (
  echo   Le catalogue n a pas pu etre releve. Le site est en
  echo   ligne, mais l index de Claude reste sur l ancienne
  echo   version. Signalez-le a Claude.
  goto :EOF
)
node C:\git\HAL-v3\scripts\indexer-stations-rag.js
if errorlevel 1 (
  echo   L index n a pas ete mis a jour ^(Ollama eteint ?^).
  echo   Le site est en ligne. Relancez plus tard :
  echo   node C:\git\HAL-v3\scripts\indexer-stations-rag.js
)
goto :EOF
