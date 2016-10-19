function remove-configtransforms(
    [Parameter(Mandatory=$true)]
    [string]$webRootPath)
{
    . $PSScriptRoot\DeleteIfConfigTransformFile.ps1
    Write-Host 'Preparing to delete config transformation files in $webRootPath:' $webRootPath
    Get-ChildItem $webRootPath -Recurse | Where-Object { $_.Name -like "*.config" } | ForEach-Object { DeleteIfConfigTransformFile ($_.FullName) }
}