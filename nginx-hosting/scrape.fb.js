import fetch from 'node-fetch'
const url = 'https://graph.facebook.com/v17.0/2XXfm/feed?access_token=EAAP1sZAHjYkMBO7dsyaZCNnDtXLoZBeAkHWNEJMxNmnFHyFZBwbi7HUPjUZBAOTvryluQVZAS2J6KfhFuFS9rLd06Ws4NkSsTE0ZBX4TGcrzfO8czdv7lCZCFZCT6CV3jW632sB7Dr9Ul7UGQJBADhc7VXnfJm9oiBDADnuZBM0oJZCxiRGvUlDIilgCO3wsar50QZDZD&fields=permalink_url,message,created_time,full_picture';

function embedUrl(url) {
  return `https://graph.facebook.com/v17.0/oembed_page?url=${url}`
}

async function doEmbed(url) {
  const response = await fetch(embedUrl(url))
  const data = await response.text()
  console.log(data)
}


export function doReplacement(template, r){
  return template.replaceAll(/[|](.*?)[|]/g, (substring, p1)=>r[p1])
}

export async function doRetrieveTotw() {
  try {
    const response = await fetch(url)
    const json = await response.json()
    for (const e of json.data) {
      if (e.message && e.message.toLowerCase().indexOf('track of the week') !== -1) {
        return {picture_url: e.full_picture, post_url: e.permalink_url, message:e.message};
      }
    }
  } catch (error) {
    console.log(error);
  }
}


//  (async () => {
//    var r = await doRetrieveTotw();
// console.log(doReplacement("test |picture_url| now |post_url|",r))
//  })();

// exports.doRetrieveTotw = doRetrieveTotw
// exports.doReplacement = doReplacement
