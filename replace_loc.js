const fs = require('fs');

let content = fs.readFileSync('e:/travel/index.html', 'utf-8');

content = content.replace(/Near University, Mussoorie Road, Dehradun, Uttarakhand/g, "Near DIT University, Mussoorie road Dehradun Uttrakhand 📍 ");
content = content.replace(/📍 Near University, Mussoorie Road, Dehradun/g, "📍 Near DIT University, Mussoorie road Dehradun Uttrakhand 📍 ");

fs.writeFileSync('e:/travel/index.html', content, 'utf-8');
console.log("Updated location in index.html");
