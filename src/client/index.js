const result = document.getElementById('result')
const form = document.getElementById('form')
form.addEventListener('submit', async e => {
  e.preventDefault();
  result.textContent = '';

  try {
    const encodedURL = encodeURI(form.url.value)
    const url = form.proxy.checked ? `/.netlify/functions/fetch?url=${encodedURL}` : encodedURL

    const res = await fetch(url, {mode: 'no-cors'})
    if (!res.ok) {
      throw new Error(await res.text())
    }

    result.textContent = await res.text()
  } catch (err) {
    result.textContent = err
  }
})