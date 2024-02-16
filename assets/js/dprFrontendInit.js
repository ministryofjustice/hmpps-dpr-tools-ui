import initAll from '/assets/dpr/js/all.mjs'

initAll()

const uploadButton = document.getElementById('upload-definition-form-submit')

if (uploadButton) {
  uploadButton.addEventListener('click', function () {
    uploadButton.disabled = true
    uploadButton.innerText = 'Please wait'
    document.getElementById('upload-definition-form').submit()
  })
}
