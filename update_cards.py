import re

with open('e:/travel/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# We need to find all service cards
# <div class="service-card sc-bike" data-reveal data-service="Bike Rental" style="--sc:0">
#   <div class="sc-icon-wrap">
#     <span class="sc-icon">🛵</span>
#     <div class="sc-glow" style="--gcol:#f5c842"></div>
#   </div>
#   <h3>Bike Rental</h3>
#   <p>Scooties and bikes...</p>
#   <button class="sc-btn" onclick="openModal('modal-bike')">Book Now →</button>
# </div>

# We want to change them to:
# <div class="service-card" data-reveal data-service="Bike Rental" style="--sc:0">
#   <div class="sc-bg" style="background: url('bike-rental.jpg') center/cover"></div>
#   <div class="sc-emoji">🛵</div>
#   <div class="sc-overlay">
#     <h3>Bike Rental</h3>
#     <p>Scooties and bikes...</p>
#     <button class="sc-btn" onclick="openModal('modal-bike')">Book Now →</button>
#   </div>
# </div>

image_map = {
    'sc-bike': 'bike-rental.jpg',
    'sc-car': 'car-rental.jpg',
    'sc-taxi': 'taxi.jpg',
    'sc-hotel': 'hotel.jpg',
    'sc-tour': 'tour.jpg',
    'sc-corp': 'corporate.jpg',
    'sc-coach': 'coach.jpg',
    'sc-air': 'air.jpg',
    'sc-train': 'train.jpg',
    'sc-volvo': 'volvo.jpg'
}

def replacer(match):
    sc_class = match.group(1) # e.g. sc-bike
    rest_of_div = match.group(2) # data-reveal ...
    icon = match.group(3)
    title = match.group(4)
    desc = match.group(5)
    btn_onclick = match.group(6)
    
    img = image_map.get(sc_class, 'hotel.jpg')
    
    return f"""<div class="service-card" {rest_of_div}>
        <div class="sc-bg" style="background: url('{img}') center/cover"></div>
        <div class="sc-emoji">{icon}</div>
        <div class="sc-overlay">
          <h3>{title}</h3>
          <p>{desc}</p>
          <button class="sc-btn" onclick="{btn_onclick}">Book Now →</button>
        </div>
      </div>"""

# Regex to capture the parts
pattern = r'<div class="service-card ([a-z-]+)"([^>]+)>\s*<div class="sc-icon-wrap">\s*<span class="sc-icon">([^<]+)</span>\s*<div class="sc-glow"[^>]+></div>\s*</div>\s*<h3>([^<]+)</h3>\s*<p>([^<]+)</p>\s*<button class="sc-btn" onclick="([^"]+)">Book Now →</button>\s*</div>'

new_html = re.sub(pattern, replacer, html)

with open('e:/travel/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Updated index.html")
