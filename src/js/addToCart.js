import swal from 'sweetalert'

/**
 * @method addToCart
 * @param  {Object} sku
 * Objeto do SKU vindo do `skuJson.skus`, ou através do `vtexjs.catalog.getProductWithVariations()`.
 * @param  {Number} [quantity=1]
 * @param  {String|Number} [seller='1']
 * @param  {Boolean} [redirect=false]
 */
export default function addToCart(sku, quantity = 1, seller = '1', redirect = false) {
  let { sku: id, skuname: name, image } = sku
  let item = { id, quantity, seller }
  vtexjs.checkout.addToCart([item], null, 1)
    .done(orderForm => {
      let cartUrl = '/Site/Carrinho.aspx'
      if (redirect) {
        window.location = cartUrl
      }
      else {
        let el = document.createElement('p')
        el.innerHTML = `<strong>${name}</strong> foi adicionado ao seu carrinho com sucesso! Deseja ir para o Checkout ou continuar comprando?`
        swal({
          content: el,
          buttons: {
            cancel: 'Continuar',
            success: 'Checkout'
          }
        })
          .then(checkout => {
            if (checkout) window.location = cartUrl
          })
      }
    })
}
