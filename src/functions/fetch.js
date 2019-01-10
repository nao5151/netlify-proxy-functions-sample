import fetch from 'node-fetch'

function response(statusCode = 200, body = '') {
  return {
    statusCode,
    body
  }
}
 
exports.handler = async (event) => {
  const { url } = event.queryStringParameters
  if (!url) {
    return response(400, 'url is required')
  }

  try {
    const res = await fetch(url, {
      timeout: 5000
    })
    if (!res.ok) {
      return response(res.status, res.statusText)
    }
    
    return response(200, await res.text())
  } catch (err) {
    return response(500, String(err))
  }
};
