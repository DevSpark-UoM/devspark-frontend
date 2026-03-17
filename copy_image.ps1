$source = "C:\Users\wijesingha\.gemini\antigravity\brain\ee100c73-88ab-4332-9878-17bb35c29fc7\childcare_aesthetic_bg_1773575138296.png"
$dest = "c:\Users\wijesingha\Documents\devSpark-UOM\devspark-frontend\src\assets\why-bg.png"
if (Test-Path $source) {
    Copy-Item -Path $source -Destination $dest -Force -Verbose
    "File copied successfully" | Out-File -FilePath "copy-success.txt"
} else {
    "Source file not found" | Out-File -FilePath "copy-failed.txt"
}
