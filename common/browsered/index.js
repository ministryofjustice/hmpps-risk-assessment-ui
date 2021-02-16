// @formatter:off
window.GOVUKFrontend = require('govuk-frontend')

window.initAll = window.GOVUKFrontend.initAll
window.accessibleAutocomplete = require('accessible-autocomplete')

function nodeListForEach(nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (let i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
}

window.GOVUKFrontend.Radios.handleConditionalRadioClick = function(event) {
  var $clickedInput = event.target
  var $radioGroup = $clickedInput.closest('.govuk-radios').querySelectorAll('input[type="radio"]')

  nodeListForEach($radioGroup, function($radio) {
    var $elementsToToggle = $radio.getAttribute('data-conditional')
    if ($elementsToToggle) {
      console.log('trying to toggle ' + $elementsToToggle)
      var inputIsChecked = $radio.checked
      var $elementArray = $elementsToToggle.split(' ')
      $elementArray.forEach(function(test) {
        console.log('HIYA')
        console.log(test)
      })
      console.log('$elementArray')
      console.log($elementArray)
      $elementArray.forEach(function($element) {
        console.log('I SEE YA')
        var $target = document.querySelector('#conditional-id-form-' + $element)
        console.log($target)
        console.log($element)
        if ($target) {
          console.log('showing ')
          $target.classList.toggle('govuk-radios__conditional--hidden', !inputIsChecked)
        }
      })

      $radio.setAttribute('aria-expanded', inputIsChecked)
    }
  })
}

window.outOflineConditionalRadios = function() {
  var questionsWithConditionals = document.querySelector('[data-contains-conditional]')
  if (questionsWithConditionals) {
    var $radios = questionsWithConditionals.querySelectorAll('input[type="radio"]')
    nodeListForEach($radios, function($radio) {
      $radio.addEventListener('click', window.GOVUKFrontend.Radios.handleConditionalRadioClick.bind(this))
    })
  }

  // add id to outofline conditional questions
  var $outofline = document.querySelectorAll('[data-outofline]')
  nodeListForEach($outofline, function($outoflineConditional) {
    var baseId = $outoflineConditional.getAttribute('data-base-id')
    var questionFormGroup = $outoflineConditional.closest('.govuk-radios__conditional--noIndent')
    questionFormGroup.setAttribute('id', 'conditional-id-form-' + baseId)
  })
}
