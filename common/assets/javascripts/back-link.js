var backLink = document.getElementById('back-link')

// Update the "href" attribute to allow display the URL when the user hovers
// also allows for the user to right click and copy the link or open in a new tab
backLink.setAttribute('href', document.referrer)

// Use history.back() to avoid being caught in a loop when repeatedly clicking the link
function goBack() {
  window.history.back()
  return false
}

backLink.addEventListener('click', goBack)
