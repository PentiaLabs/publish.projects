function Install-NugetPackage (
    [Parameter(Mandatory=$true)]
    [object]$package,
    [Parameter(Mandatory=$true)]
    [string]$webRootPath,
    [Parameter(Mandatory=$true)]
    [string]$dataRootPath) {

    Write-Host "Getting" $package.packageName "Package"
    $nugetPackage = Get-Package -ProviderName NuGet -AllVersions | Where-Object {$_.Name -eq $package.packageName -and $_.version -eq $package.Version} 

    if(-not ($nugetPackage))
    {
        Write-Host ("Package not found locally installing from " + $package.location)

        $packagesource = Get-PackageSource | Where-Object -Property location -eq $package.location | Select-Object -First 1

        if($packagesource -eq $null)
        {
            Write-Host ("PackageSource not found adding new package source")
            Register-PackageSource -Name $package.packageName -Location $package.location -ProviderName NuGet -Trusted
        }

        $packagesource = Get-PackageSource -Location $packageLocation
        Find-Package -Source $packagesource.source -Name $package.packageName -RequiredVersion $package.version | Install-Package
        $nugetPackage = Get-Package -ProviderName NuGet -AllVersions | Where-Object {$_.Name -eq $package.packageName -and $_.version -eq $package.version} 
    }

    Write-Host "Copying" $package.packageName
    $packagePath = $nugetPackage | Select-Object -Property Source | foreach { Split-Path -Path $_.Source }
    Write-Host "Copying " $package.packageName " Webroot"
    robocopy $packagePath\webroot $webRootPath *.* /E /MT 64 /NFL /NP /NDL /NJH 
    Write-Host "Copying " $package.packageName " Data Folder"
    robocopy $packagePath\Data $dataRootPath *.* /E /MT 64 /NFL /NP /NDL /NJH

    $hasDeployScript = (Get-ChildItem -Path $webRootPath -Filter packageDeploy.ps1).Count -lt 0

    if($hasDeployScript)
    {
        Invoke-Expression $webRootPath\packageDeploy.ps1  
        Remove-Item -Path $webRootPath\packageDeploy.ps1 
    }
}