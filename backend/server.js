const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
const PORT = 3001

const SUBSCRIPTION_KEY = '61cdbecfc1444cf5aee10a2555f87d53'
const DIGITRANSIT_API_URL = 'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1'

app.use(cors())
app.use(express.json()) 

app.post('/graphql-proxy', async (req, res) => {
  console.log('Received body from frontend:', req.body)

  try {
    const response = await fetch(DIGITRANSIT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'digitransit-subscription-key': SUBSCRIPTION_KEY,
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Digitransit API error:', data)
      return res.status(response.status).json(data)
    }

    res.json(data)
  } catch (error) {
    console.error('Proxy fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`)
})
