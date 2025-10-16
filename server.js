import express from 'express'
import fetch from 'node-fetch'
import UAParser from 'ua-parser-js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.static('public'))

app.get('/api/info', async (req, res) => {
  const ua = new UAParser(req.headers['user-agent'])
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'Unknown'
  let geo = {}
  try {
    const r = await fetch(`https://ipapi.co/${ip}/json/`)
    geo = await r.json()
  } catch (e) {}
  const browser = ua.getBrowser().name || 'Unknown'
  const os = ua.getOS().name || 'Unknown'
  const device = ua.getDevice().type || 'Desktop'
  const suspicious = /(bot|crawl|spider|headless|curl)/i.test(req.headers['user-agent'])
  res.json({
    ip,
    browser,
    os,
    device,
    city: geo.city || 'Unknown',
    country: geo.country_name || 'Unknown',
    spoofed: suspicious
  })
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
