async function getInfo(){
  const res = await fetch(window.location.origin + '/api/info')
  const data = await res.json()
  let html = `
    <table>
      <tr><td><b>IP Address</b></td><td>${data.ip}</td></tr>
      <tr><td><b>Browser</b></td><td>${data.browser}</td></tr>
      <tr><td><b>OS</b></td><td>${data.os}</td></tr>
      <tr><td><b>Device Type</b></td><td>${data.device}</td></tr>
      <tr><td><b>Location</b></td><td>${data.city}, ${data.country}</td></tr>
      <tr><td><b>Bot/Spoof?</b></td><td>${data.spoofed ? "⚠️ Suspicious" : "✅ Legit"}</td></tr>
    </table>`
  document.getElementById('info').innerHTML = html
}
getInfo()
