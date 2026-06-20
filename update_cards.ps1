$html = Get-Content -Path "e:\travel\index.html" -Raw

$pattern = '(?s)<div class="service-card (sc-[a-z-]+)"(.*?)>\s*<div class="sc-icon-wrap">\s*<span class="sc-icon">([^<]+)</span>\s*<div class="sc-glow"[^>]+></div>\s*</div>\s*<h3>([^<]+)</h3>\s*<p>([^<]+)</p>\s*<button class="sc-btn" onclick="([^"]+)">Book Now →</button>\s*</div>'

$imageMap = @{
    'sc-bike' = 'bike-rental.jpg'
    'sc-car' = 'car-rental.jpg'
    'sc-taxi' = 'taxi.jpg'
    'sc-hotel' = 'hotel.jpg'
    'sc-tour' = 'tour.jpg'
    'sc-corp' = 'corporate.jpg'
    'sc-coach' = 'coach.jpg'
    'sc-air' = 'air.jpg'
    'sc-train' = 'train.jpg'
    'sc-volvo' = 'volvo.jpg'
}

$newHtml = [regex]::Replace($html, $pattern, {
    param($m)
    $scClass = $m.Groups[1].Value
    $rest = $m.Groups[2].Value
    $icon = $m.Groups[3].Value
    $title = $m.Groups[4].Value
    $desc = $m.Groups[5].Value
    $onclick = $m.Groups[6].Value
    
    $img = "hotel.jpg"
    if ($imageMap.ContainsKey($scClass)) {
        $img = $imageMap[$scClass]
    }
    
    return "<div class=""service-card""$rest>`n        <div class=""sc-bg"" style=""background: url('$img') center/cover""></div>`n        <div class=""sc-emoji"">$icon</div>`n        <div class=""sc-overlay"">`n          <h3>$title</h3>`n          <p>$desc</p>`n          <button class=""sc-btn"" onclick=""$onclick"">Book Now →</button>`n        </div>`n      </div>"
})

Set-Content -Path "e:\travel\index.html" -Value $newHtml -Encoding UTF8
Write-Host "Updated index.html"
