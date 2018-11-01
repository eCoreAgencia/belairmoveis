import swal from 'sweetalert'
// import iconClose from '../svg/icon-x.svg'
import formatInput from './formatInput'

export default class SimulateShipping {
  constructor() {
    let self = this
    let body = $('body')
    let zipCodeEl = '.js-simulate-shipping-postal-code'

    this.seller = 1
    this.skuId = skuJson.skus[0].sku
    this.country = vtexjs.checkout.orderForm ? vtexjs.checkout.orderForm.storePreferencesData.countryCode : 'BRA'
    this.salesChannel = +window.jssalesChannel || 1
    this.containerElement = $('.js-simulate-shipping-result')

    body.on('input', zipCodeEl, () => { formatInput(zipCodeEl, '00000-000') })

    body.on('submit', '.js-simulate-shipping', function (e) {
      e.preventDefault()
      if (skuJson.skus[0].available) {
        let postalCode = $(zipCodeEl).val().replace('-', '')
        if (postalCode.length === 8) {
          self.postalCode = postalCode
          self.requestShippingInfo()
        }
        else {
          swal({
            text: 'Insira um CEP válido',
            icon: 'warning',
          })
        }
      }
      else {
        swal({
          text: 'Este produto está indisponível',
          icon: 'warning',
        })
      }
    })

    body.on('click', '.js-simulate-shipping-close', function (e) {
      e.preventDefault()
      self.containerElement.fadeOut(150)
    })
  }

  requestShippingInfo() {
    vtexjs.checkout.getOrderForm()
      .then(orderForm => {
        const item = {
          id: this.skuId,
          seller: this.seller,
          quantity: +$('.js-quantity-value').val(),
        }
        return vtexjs.checkout.simulateShipping([item], this.postalCode, this.country, this.salesChannel)
      })
      .done(shippingInfo => {
        let { slas } = shippingInfo.logisticsInfo[0]
        if (slas && slas.length) {
          this.renderShippingResult(slas)
        }
        else {
          swal({
            text: 'Não há informações de frete relacionadas a este produto',
            icon: 'warning',
          })
        }
      })
  }

  renderShippingResult(slas) {
    let html = `
      <div class="wrapper--md product-shipping__result">
        <button class="product-shipping__close js-simulate-shipping-close" type="button">${iconClose ? iconClose : 'fechar'}</button>

        <table class="product-shipping-table">
          ${slas.map(sla => this.renderShippingTypeRow(sla)).join('')}
        </table>
      </div>
    `
    this.containerElement.html(html).fadeIn(150)
  }

  renderShippingTypeRow(sla) {
    let { name, price, shippingEstimate } = sla
    let isFree = price === 0 ? true : false
    let days = +shippingEstimate.replace('bd', '')
    let daysText = days === 1 ? 'dia útil' : 'dias úteis'
    price = (price / 100).formatMoney()
    return `
      <tr class="product-shipping-table__row">
        <td class="product-shipping-table__cell">${name}</td>
        <td class="product-shipping-table__cell">
          <strong>Em até <span class="product-shipping-table__days">${days} ${daysText}</span></strong>
        </td>
        <td class="product-shipping-table__cell">${isFree ? 'Grátis' : `R$ ${price}`}</td>
      </tr>
    `
  }
}
