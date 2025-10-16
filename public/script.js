async function getInfo(){
  const res = await fetch('/api/info')
  const data = await res.json()
  let brave = false
  if (navigator.brave) brave = await navigator.brave.isBrave()
  
  let browserName = brave ? "Brave (Chromium Base)" : data.browser

  let html = `
    <table>
      <tr><td><b>IP Address</b></td><td>${data.ip}</td></tr>
      <tr><td><b>Browser</b></td><td>${browserName}</td></tr>
      <tr><td><b>OS</b></td><td>${data.os}</td></tr>
      <tr><td><b>Device Type</b></td><td>${data.device}</td></tr>
      <tr><td><b>Location</b></td><td>${data.city}, ${data.country}</td></tr>
      <tr><td><b>Bot/Spoof?</b></td><td>${data.spoofed ? "⚠️ Suspicious" : "✅ Legit"}</td></tr>
    </table>`
  document.getElementById('info').innerHTML = html
}
getInfo()
