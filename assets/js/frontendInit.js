window.GOVUKFrontend.initAll()

$(function () {
  $('#upload-definition-form-submit').on('click', function () {
    const button = $('#upload-definition-form-submit')
    button.prop('disabled', true)
    button.text('Please wait')
    $('#upload-definition-form').trigger('submit')
  })
})
