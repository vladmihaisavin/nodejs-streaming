const { Router } = require('express')
const fs = require('fs')
const path = require('path')

const VIDEO_PATH = path.join(__dirname, 'storage', 'test.mp4')
const HTML_CLIENT_PATH = path.join(__dirname, '..', 'client', 'index.html')

module.exports = ({ config }) => {
  const router = new Router()

  router.get("/", function (req, res) {
    res.sendFile(HTML_CLIENT_PATH)
  })

  router.get("/local-http-video", function (req, res) {
    const range = req.headers.range

    if (!range) {
      return res.status(400).send('No range header provided.')
    }

    const videoSize = fs.statSync(VIDEO_PATH).size

    const CHUNK_SIZE = 10 ** 6
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

    const contentLength = end - start + 1
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    }

    res.writeHead(206, headers)
    const videoStream = fs.createReadStream(VIDEO_PATH, { start, end })
    videoStream.pipe(res)
  })

  return router
}
