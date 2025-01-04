export default function purchase() {
  const form = document.querySelector('#purchase-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    e.preventDefault()

    // GTM loads dataLayer but we are adding it here just in case
    const dataLayer = window?.dataLayer || []
  })
}
