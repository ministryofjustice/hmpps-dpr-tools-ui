class Definition {
  initialise() {
    document.querySelectorAll('input,select,textarea').forEach(input => {
      input.addEventListener('change', event => {
        console.log(`${event.target.id}: ${event.target.value}`)

        if (event.target.id === 'reportId') {
          pageDefinition.definition.id = event.target.value
        }

        pageDefinition.refresh()
      })
    })

    document.querySelector('#publishToConsoleButton').addEventListener('click', () => {
      console.log(JSON.stringify(pageDefinition.definition))
    })

    this.definition = {
      id: 'new-report',
      dataset: [],
    }

    this.refresh()
  }

  refresh() {
    console.log('Refresh')
    const updates = {
      reportId: pageDefinition.definition.id,
    }

    Object.keys(updates).forEach(key => {
      document.querySelector(`#${key}`).value = updates[key]
    })
  }
}

let pageDefinition = new Definition()
pageDefinition.initialise()
