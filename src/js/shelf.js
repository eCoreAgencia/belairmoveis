import { getProdutsSimiliarById } from './utils';



$(document).ready(function() {

  if($('body').hasClass('catalog')){
    $('.productList > ul > li').each(function(){
      const productId = $('span[data-id]', this).data('id');
      const productColor = $('.produto-cor', this);
      const similiar = getProdutsSimiliarById(productId);
      similiar.then(products => {

        if(products.length) {
          console.log(products)
          const color = products.map(product => {
            const shelf = `<div class='quadrado' data-url='${product.productId}' data-link='${product.productId}' data-id=''>
            <a href='${product.productId}'>
              <img src='${product.items[0].images[0].imageUrl}' />
            </a>
      </div>`;

            return shelf;
          }).join('');
          console.log(color);
          productColor.html(color);
        }

      })
    })
  }
})
