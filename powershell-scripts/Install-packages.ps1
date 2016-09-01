param(
    [Parameter(Mandatory=$true)]
    [string]$packagesFileLocation,
    [Parameter(Mandatory=$true)]
    [string]$webRootPath,
    [Parameter(Mandatory=$true)]
    [string]$dataRootPath)

. $PSScriptRoot\install-package.ps1
$ErrorActionPreference = "Stop"

if((Test-Path -Path $packagesFileLocation) -eq $false)
{
    Write-Error -Message "solution-packages.json not found at $packagesFileLocation"
}

if((Test-Path -Path $webRootPath) -eq $false)
{
    Write-Host "Creating " $webRootPath
    New-Item $webRootPath -type directory > $null
}

if((Test-Path -Path $dataRootPath) -eq $false)
{
    Write-Host "Creating " $dataRootPath 
    New-Item $dataRootPath -type directory > $null
}

$packages = (Get-Content $packagesFileLocation -Raw) | ConvertFrom-Json

foreach ($package in $packages.packages) {
    Install-NugetPackage -package $package -webRootPath $webRootPath -dataRootPath $dataRootPath
}

