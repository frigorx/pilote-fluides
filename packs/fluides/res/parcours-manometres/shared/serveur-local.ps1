[CmdletBinding()]
param([switch]$SansNavigateur)

$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$listener = [System.Net.HttpListener]::new()
$chosenPort = $null

foreach ($candidatePort in 8768..8778) {
  try {
    $listener.Prefixes.Clear()
    $listener.Prefixes.Add("http://127.0.0.1:$candidatePort/")
    $listener.Start()
    $chosenPort = $candidatePort
    break
  } catch {
    if ($listener.IsListening) { $listener.Stop() }
  }
}

if (-not $chosenPort) {
  Write-Host 'Aucun port local disponible entre 8768 et 8778.' -ForegroundColor Red
  Read-Host 'Appuyez sur Entree pour fermer'
  exit 1
}

$url = "http://127.0.0.1:$chosenPort/"
Write-Host "Parcours inerWeb disponible sur $url" -ForegroundColor Green
Write-Host 'Fermez cette fenetre ou appuyez sur Ctrl+C pour arreter.'
if (-not $SansNavigateur) { Start-Process $url }

$contentTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'
  '.css' = 'text/css; charset=utf-8'
  '.svg' = 'image/svg+xml'
  '.woff2' = 'font/woff2'
  '.png' = 'image/png'
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    try {
      $relativePath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart('/')
      if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = 'index.html' }
      $relativePath = $relativePath.Replace('/', [IO.Path]::DirectorySeparatorChar)
      $target = [IO.Path]::GetFullPath((Join-Path $projectRoot $relativePath))
      $insideProject = $target.StartsWith($projectRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)

      if (-not $insideProject) {
        $context.Response.StatusCode = 403
      } elseif (Test-Path -LiteralPath $target -PathType Leaf) {
        $bytes = [IO.File]::ReadAllBytes($target)
        $extension = [IO.Path]::GetExtension($target).ToLowerInvariant()
        $context.Response.ContentType = if ($contentTypes.ContainsKey($extension)) { $contentTypes[$extension] } else { 'application/octet-stream' }
        $context.Response.StatusCode = 200
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $context.Response.StatusCode = 404
      }
    } catch {
      $context.Response.StatusCode = 500
    } finally {
      $context.Response.Close()
    }
  }
} finally {
  if ($listener.IsListening) { $listener.Stop() }
  $listener.Close()
}
