import * as govukFrontend from 'govuk-frontend'
import * as mojFrontend from '@ministryofjustice/frontend'
import * as dprFrontend from '@ministryofjustice/hmpps-digital-prison-reporting-frontend'

govukFrontend.initAll()
mojFrontend.initAll()
dprFrontend.initAll()

const uploadButton = document.getElementById('upload-definition-form-submit')

if (uploadButton) {
  uploadButton.addEventListener('click', function () {
    uploadButton.disabled = true
    uploadButton.innerText = 'Please wait'
    document.getElementById('upload-definition-form').submit()
  })
}
