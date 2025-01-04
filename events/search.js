export default function search() {
  const form = document.querySelector('#search-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', e => {
    e.preventDefault()

    // GTM loads dataLayer but we are adding it here just in case
    const dataLayer = window?.dataLayer || []

    const searchValue = form?.elements?.search?.value || ''
    const regionValue = form?.elements?.region?.value || ''

    // GTM will be on the lookout for this
    dataLayer.push({
      event: 'search', // required
      search_term: searchValue, // required
      region: regionValue, // optional - read index.html for info on Custom Dimensions
    })

    form.reset()
  })
}
