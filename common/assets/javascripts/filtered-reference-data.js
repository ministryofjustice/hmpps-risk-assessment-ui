/* eslint-disable */
function addFilteredReferenceDataListeners(assessmentUuid, episodeUuid) {
  var state = {}
  var elementsWithTargets = document.querySelectorAll('[data-reference-data-target]')

  function targetHasValues(state) {
    var keys = Object.keys(state)
    for (var i = 0; i < keys.length; i++) {
      if (state[keys[i]] === null) {
        return false
      }
    }
    return true
  }

  function isRadio(element) {
    return element.dataset.questionType === 'radio'
  }
  function isDropdown(element) {
    return element.dataset.questionType === 'dropdown'
  }

  function clearDropdown(element) {
    while (element.options.length > 0) {
      element.remove(0)
    }
  }

  function clearRadio(element) {
    element.replaceChildren()
  }

  function removeExistingOptions(element) {
    if (isRadio(element)) {
      return clearRadio(element)
    }
    if (isDropdown(element)) {
      return clearDropdown(element)
    }
    return
  }

  function createDropdownOptions(dropdown, options) {
    for (var i = 0; i < options.length; i++) {
      var option = options[i]

      var optionElement = document.createElement('option')
      optionElement.text = option.text
      optionElement.value = option.value

      dropdown.add(optionElement)
    }
  }

  function createRadioOptions(radioGroup, options) {
    for (var i = 0; i < options.length; i++) {
      var option = options[i]

      var radioItem = document.createElement('div')
      radioItem.className = 'govuk-radios__item'

      var radioInput = document.createElement('input')
      radioInput.type = 'radio'
      radioInput.id = 'id-' + radioGroup.dataset.questionUuid + '-' + (1 + i)
      radioInput.className = 'govuk-radios__input'
      radioInput.name = 'id-' + radioGroup.dataset.questionUuid
      radioInput.value = option.value

      var label = document.createElement('label')
      label.className = 'govuk-label govuk-radios__label'
      label.innerHTML = option.text
      label.setAttribute('for', 'id-' + radioGroup.dataset.questionUuid + '-' + (1 + i))

      radioItem.appendChild(radioInput)
      radioItem.appendChild(label)

      radioGroup.appendChild(radioItem)
    }
  }

  function selectFirstRadio(radioGroup) {
    var firstRadio = radioGroup.querySelector('input')
    radioGroup.value = firstRadio.value
    firstRadio.checked = true
  }

  function updateOptions(element, options) {
    removeExistingOptions(element)

    if (isRadio(element)) {
      return createRadioOptions(element, options)
    }
    if (isDropdown(element)) {
      return createDropdownOptions(element, options)
    }
    return
  }

  function fetchReferenceData(state, multipleChoiceElement, callback) {
    if (targetHasValues(state)) {
      var req = new XMLHttpRequest()
      req.open('POST', '/' + assessmentUuid + '/episode/' + episodeUuid + '/referencedata/filtered')
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      req.send(JSON.stringify(state))

      req.onload = function() {
        if (this.status !== 200) {
          return removeExistingOptions(multipleChoiceElement)
        }
        callback(JSON.parse(this.responseText))
      }

      req.onerror = function() {
        removeExistingOptions(multipleChoiceElement)
      }
    }
  }

  function addListenerToTarget(questionUuid, multipleChoiceElement, state) {
    target.addEventListener('change', function(event) {
      state.targetValues[questionUuid] = event.target.value

      fetchReferenceData(state, multipleChoiceElement, function(newOptions) {
        updateOptions(multipleChoiceElement, newOptions)
      })
    })
  }

  for (var i = 0; i < elementsWithTargets.length; i++) {
    var element = elementsWithTargets[i]
    var questionUuid = element.dataset.questionUuid
    var targetId = element.dataset.referenceDataTarget

    state[questionUuid] = { questionUuid: questionUuid, targetValues: {} }
    state[questionUuid].targetValues[targetId] = null

    var targets = document.querySelectorAll('[data-question-uuid="' + targetId + '"]')

    for (var j = 0; j < targets.length; j++) {
      var target = targets[j]
      var targetId = target.dataset.questionUuid

      if (isRadio(target)) {
        selectFirstRadio(target)
      }

      state[questionUuid].targetValues[targetId] = target.value
      fetchReferenceData(state[questionUuid], element, function(newOptions) {
        updateOptions(element, newOptions)
      })
      addListenerToTarget(targetId, element, state[questionUuid])
    }
  }
}