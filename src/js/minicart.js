class Minicart {
  constructor() {
    $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
      this.update(orderForm)
    })
    vtexjs.checkout.getOrderForm()
  }

  renderItem(item, i) {
    let { quantity } = item
    return `
      <li class="grid minicart-product" data-item-id="${item.id}">
        <div class="minicart-product__image"><img src="${item.imageUrl}"></div>
        <div class="wrapper--horizontal-sm minicart-product__info">
          <h4 class="minicart-product__name">${item.name}</h4>
          <strong class="minicart-product__price">R$ ${(item.price / 100).formatMoney()}</strong>
        </div>
        <div class="minicart-product__actions"><strong class="minicart-product__qty-title">Quantidade</strong>
          <div class="grid minicart-product-qty">
            <button class="grid__col--sm-4 minicart-product-qty__button" onclick="RexMinicart.updateItem.apply(null, [{index:${i},qty:${quantity},calc:'-1'}])">
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="2.906" viewBox="0 0 7 2.906"><path id="ico-qtd-menos" class="cls-1" d="M29.991,32.734H23V29.815h6.988v2.919Z" transform="translate(-23 -29.813)"></path></svg>
            </button>
            <div class="grid__col--sm-4 minicart-product-qty__input-wrapper">
              <input class="minicart-product-qty__value" value="${quantity}" readonly="readonly" type="text">
            </div>
            <button class="grid__col--sm-4 minicart-product-qty__button" onclick="RexMinicart.updateItem.apply(null, [{index:${i},qty:${quantity},calc:'+1'}])">
              <svg xmlns="http://www.w3.org/2000/svg" width="12.063" height="12.063" viewBox="0 0 12.063 12.063"><path id="ico-qtd-mais" class="cls-1" d="M94.929,31.163H90.165v4.759h-2.5V31.163H82.878V28.654h4.788V23.87h2.5v4.784h4.763v2.509Z" transform="translate(-82.875 -23.875)"></path></svg>
            </button>
          </div>
          <button class="minicart-product__remove" type="button" onclick="RexMinicart.removeItem.apply(null, [${i}])" title="Remover ${item.name} do carrinho">Remover</button>
        </div>
      </li>
    `
  }

  renderItems() {
    return this.orderForm.items.map(this.renderItem, this).join('')
  }

  render() {
    let qty = this.getQuantity()
    return `
      <div class="minicart ${qty > 0 ? 'is-not-empty' : ''}">
        <div class="grid minicart__widget">
          <i class="icon-cart"></i>
          <div class="minicart__info">
            <span class="minicart__title">Carrinho</span>
            <strong class="minicart__quantity">${this.printQuantity(qty)}</strong>
          </div>
        </div>
        <div class="minicart__pannel">
          <div class="minicart__pannel-content">
            <ul class="minicart__products">
              ${this.renderItems()}
            </ul>
            <footer class="minicart__footer">
              <div class="minicart__quantity minicart__quantity--bottom">
                <span class="minicart__quantity-text">Quantidade de produtos</span>
                <strong class="minicart__quantity-value">${qty}</strong>
              </div>
              <a class="button minicart__checkout" href="/Site/Carrinho.aspx">Finalizar compra</a>
              <div class="minicart__totals">
                <span class="minicart__totals-text">Subtotal</span>
                <strong class="minicart__totals-value">${this.getTotal()}</strong>
              </div>
            </footer>
          </div>
        </div>
      </div>
    `
  }

  removeItem(index) {
    vtexjs.checkout.removeItems([{index}])
  }

  updateItem(obj) {
    let { index, qty, calc } = obj
    let quantity = qty + +calc
    if (quantity) {
      vtexjs.checkout.updateItems([{index, quantity}], null, false)
    }
  }

  getTotal() {
    const itemsTotal = this.orderForm.totalizers.find(item => item.id === 'Items')
    const total = itemsTotal ? itemsTotal.value / 100 : 0
    return `R$ ${total.formatMoney()}`
  }

  getQuantity() {
    const qty = this.orderForm.items.reduce((prev, next) => prev + next.quantity, 0)
    return qty
  }

  printQuantity(qty) {
    return `${qty} ${qty > 1 ? 'itens' : 'item'}`
  }

  update(orderForm) {
    this.orderForm = orderForm
    this.mount()
  }

  mount() {
    $('.js-minicart').html(this.render())
  }
}

$(document).ready(function(){
  window.RexMinicart = new Minicart()
})
