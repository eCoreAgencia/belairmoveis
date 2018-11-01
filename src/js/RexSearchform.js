(function ($) {
  /**
   * Formulário de busca nos moldes do Rex
   * @method RexSearchform
   * @param {Object} options Opções do plugin
   */
  $.fn.RexSearchform = function (options) {
    let self = $.fn.RexSearchform
    let el = this
    let defaults = {
      vtexStore: '',
      autocomplete: true,
      showDepartments: true,
      thumbWidth: 100,
      thumbHeight: 100,
      charactersToStartAjax: 3,
      excludeKeys: [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 224],
    }
    let settings = $.extend({}, defaults, options)
    if (!settings.vtexStore) throw Error('[RexSearchform] Prop vtexStore can\'t be empty.')
    let { vtexStore, autocomplete, showDepartments, thumbWidth, thumbHeight, charactersToStartAjax, excludeKeys } = settings
    let isLocalhost = ((window.location.hostname === 'localhost') || (~window.location.hostname.indexOf('192.168'))) ? true : false
    let urlPrefix = isLocalhost ? `//${vtexStore}.vtexcommercestable.com.br` : ''
    let input = el.find('.RexSearchform__input')
    let select = el.find('.RexSearchform-select')
    let list = el.find('.RexSearchform-list')

    self.RexSearchformMountResultList = function (items) {
      if (!items) return

      list.html('')
      items.forEach(item => {
        let { href, name, thumbUrl: thumb } = item
        let html = `
          <a class="RexSearchform-list-item" href="${href}" title="${name}">
            ${thumb ? `
              <div class="RexSearchform-list-item__img">
                <img src="${thumb.replace('-25-25', `-${thumbWidth}-${thumbHeight}`)}" alt="${name}"/>
              </div>
            ` : ''}
            <span class="RexSearchform-list-item__name">${name}</span>
          </a>
        `
        list.append(html)
      })
    }

    self.RexSearchformMountDepartmentList = function (departments) {
      departments.forEach(function (department) {
        let { name } = department
        select.append(`<option value="${name}">${name}</option>`)
      })
    }

    self.RexSearchformReset = function (e) {
      input.val('').trigger('input')
    }

    self.RexSearchformDoSearch = function (e) {
      let search = input.val().replace(/\./g, '').replace(/(^[\s]+|[\s]+$)/g, '')

      if (search.length >= settings.charactersToStartAjax) {
        clearTimeout(self.timeOut)
        self.timeOut = setTimeout(() => {
          if (search === input.val()) self.RexSearchformRequestApiData(search)
        }, 500)
      }
      else {
        if (search.length < settings.charactersToStartAjax) {
          list.removeClass('is-fetching').hide()
          self.RexSearchformMountResultList(null)
        }
      }

      return false
    }

    self.RexSearchformRequestApiData = function (query) {
      if (self.xhr) self.xhr.abort()

      list.addClass('is-fetching').show()

      self.xhr = $.ajax({
        type: 'GET',
        url: urlPrefix + '/buscaautocomplete/?productNameContains=' + query,
        error(err) {
          console.error(err)
          list.removeClass('is-fetching').hide()
          self.itemsReturned = null
        },
        success(data) {
          console.log(data.itemsReturned)
          list.removeClass('is-fetching')
          self.RexSearchformMountResultList(data.itemsReturned)
        },
      })
    }

    self.RexSearchformGetDepartments = function () {
      $.ajax({
        url: `${urlPrefix}/api/catalog_system/pub/category/tree/0`,
        type: 'GET',
        headers: { 'content-type': 'application/json' },
        error(err) { $('.RexSearchform__select').hide() },
        success(data) { self.RexSearchformMountDepartmentList(data) },
      })
    }

    this.on('submit', function (e) {
      e.preventDefault()
      let search = input.val().replace(/\./g, '').replace(/(^[\s]+|[\s]+$)/g, '')
      let department = select.val() ? '/' + select.val() : ''
      window.location = department + '/' + encodeURI(search)
    })

    if (settings.showDepartments)
      self.RexSearchformGetDepartments()
    else
      select.remove()

    if (settings.autocomplete)
      input.on('input', self.RexSearchformDoSearch)
    else
      list.remove()
  }
})(jQuery)
