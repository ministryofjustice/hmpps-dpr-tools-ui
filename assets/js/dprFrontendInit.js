import { initAll } from '/assets/dpr/js/all.mjs'
initAll()

const uploadButton = document.getElementById('upload-definition-form-submit')
uploadButton.addEventListener('click', function () {
  uploadButton.prop('disabled', true)
  uploadButton.text('Please wait')
  document.getElementById('upload-definition-form').submit()
})
