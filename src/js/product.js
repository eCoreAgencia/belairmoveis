export default (function() {
  if ($('body').hasClass('product')) {
    let thumbs = $('.thumbs')
    let fix_zoom = function () {
      window.LoadZoom = function (pi) {
        let zoomImage = $(".image-zoom")
        // zoomImage.jqzoom()
        $('.zoomPup, .zoomWindow, .zoomPreload').remove()
        if (!zoomImage.length) {
          let img = $('#image-main')
          let imgUrl = img.attr('src')
          img.wrap(`<a href="${imgUrl}" class="image-zoom" />`)
        }
        let zoom = $('#image').addClass('easyzoom easyzoom--overlay').easyZoom()
        window.zoomAPI = zoom.data('easyZoom')
        window.ImageControl = () => null
      }
      LoadZoom(0)
    }
    $(fix_zoom)

    class Product {
      constructor() {
        let self = this
        window.ImageControl = () => null
        this.skuJson = skuJson ? skuJson : skuJson_1
        this.thumbsClickEvent()
        this.simulateShipping()

        $('.js-product-buy-button').on('click', function (e) {
          e.preventDefault()
          let quantity = $('.js-quantity-value').val()
          addToCart(self.skuJson.skus[0], +quantity)
        })

        $('.js-product-qty-button').on('click', function (e) {
          e.preventDefault()
          let val = $(this).data('value')
          self.changeQuantity(val)
        })

        $('.js-product-qty-value').on('blur', function (e) {
          e.preventDefault()
          let val = +$(this).val()
          if (!val || val < 1) $(this).val(1)
        })
      }

      changeQuantity(val) {
        let currentVal = $('.js-product-qty-value').val()
        let newVal = +currentVal + +val
        if (newVal) {
          $('.js-product-qty-value').val(newVal)
        }
      }

      thumbsClickEvent() {
        thumbs.on('click', 'a', function (e) {
          e.preventDefault()
          let imgUri = $(this).attr('rel')
          zoomAPI._init()
          zoomAPI.swap(imgUri, imgUri)
          if (!imgUri) {
            zoomAPI.teardown()
          }
          thumbs.find('a').removeClass('ON')
          $(this).addClass('ON')
        })
      }

      simulateShipping() {
        window.OMSimulateShipping = new SimulateShipping()
      }
    }

    $(() => {
      window.OMProduct = new Product()
    })
  }
})()
