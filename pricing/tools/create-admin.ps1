param([string]$PhpExe = 'php', [Parameter(Mandatory=$true)][string]$PrivateDirectory)
$ErrorActionPreference = 'Stop'
$taskUsername = Read-Host 'Usuario administrador'
$taskSecret = Read-Host 'Contraseña de 14 a 72 caracteres' -AsSecureString
$taskPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($taskSecret)
try {
  $taskPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($taskPointer)
  $taskPayload = @{username=$taskUsername;password=$taskPassword} | ConvertTo-Json -Compress
  $taskPayload | & $PhpExe (Join-Path $PSScriptRoot 'create-admin.php') $PrivateDirectory '--stdin'
  if ($LASTEXITCODE -ne 0) { throw 'No se pudo crear el administrador.' }
} finally {
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($taskPointer)
  $taskPassword = $null
  $taskPayload = $null
  $taskSecret.Dispose()
}
