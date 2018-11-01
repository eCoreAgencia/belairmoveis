import { getProductSimiliarById } from './utils';



$(document).ready(function() {
    const renderProductSimiliar = () => {
        $('.productList > ul > li:not(.helperComplement)').each(function(){
            const productId = $('span[data-id]', this).data('id');
            const productColor = $('.produto-cor', this);
            const similiar = getProductSimiliarById(productId);
            const productImage = $('.productImage img', this).attr('src').replace('-300-300', '-25-25');
            const productImageId = $('.productImage a', this).attr('href');
            const quadrado = `<div class='quadrado'><a href="${productImageId}"><img src='${productImage}'/></a></div>`;
      
            similiar.then(products => {
      
              if(products.length) {
                const color = products.map(product => {
                    const imageSize = `${product.items[0].images[0].imageId}-25-25`
                  const shelf = `<div class='quadrado' data-url='${product.productId}' data-link='${product.productId}' data-id=''>
                  <a href='${product.link}'>
                    <img src='${product.items[0].images[0].imageUrl.replace(product.items[0].images[0].imageId, imageSize)}' />
                  </a>
            </div>`;
      
                  return shelf;
                }).join('');
      
                productColor.html(color);
                productColor.prepend(quadrado);
              }
      
            })
          })
      
          $('.productList > ul > li').on('mouseenter', '.quadrado', function(){
              const img = $('img', this).attr('src').replace('-25-25', '-300-300');
              const productImage = $(this).parents('li').find('.productImage img');
              productImage.attr('src', img);
          })
    }

  if($('body').hasClass('catalog')){
    renderProductSimiliar();

    $('body').ajaxStop(function(){
        renderProductSimiliar();
    })


  }
})
