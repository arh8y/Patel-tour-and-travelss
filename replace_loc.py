import re

with open('e:/travel/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("Near University, Mussoorie Road, Dehradun, Uttarakhand", "Near DIT University, Mussoorie road Dehradun Uttrakhand 📍 ")
content = content.replace("📍 Near University, Mussoorie Road, Dehradun", "📍 Near DIT University, Mussoorie road Dehradun Uttrakhand 📍 ")

with open('e:/travel/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
