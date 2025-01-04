export default function sign_up() {
  const form = document.querySelector('#sign_up-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    e.preventDefault()

    // GTM loads dataLayer but we are adding it here just in case
    const dataLayer = window?.dataLayer || []

    const methods = ['Email', 'Google', 'Facebook', 'Twitter/X', 'LinkedIn', 'Apple']

    // GTM will be on the lookout for this
    // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?sjid=16304408777889371420-EU&client_type=gtm#sign_up
    dataLayer.push({
      event: 'sign_up', // required
      method: methods[Math.floor(Math.random() * methods.length)], // get random item from array
    })

    form.reset()
  })
}
