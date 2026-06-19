# Patel Tour And Travel - Dehradun Travel Website - Local Server
# Run this script to start the server at http://localhost:3400

$port = 3400
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host ""
Write-Host "  ◈ PATEL TOUR AND TRAVEL - Dehradun Travel Website" -ForegroundColor Cyan
Write-Host "  =================================================" -ForegroundColor DarkCyan
Write-Host ""
Write-Host "  Server running at: http://localhost:$port" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.Url.LocalPath
        if ($rawUrl -eq "/") { $rawUrl = "/index.html" }

        $filePath = Join-Path $root $rawUrl.TrimStart("/")

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            Write-Host "  [200] $rawUrl" -ForegroundColor DarkGreen
        } else {
            $response.StatusCode = 404
            $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($body, 0, $body.Length)
            Write-Host "  [404] $rawUrl" -ForegroundColor DarkRed
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "`nServer stopped." -ForegroundColor DarkGray
}
