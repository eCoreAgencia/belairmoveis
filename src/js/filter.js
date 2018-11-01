class Filter {
  constructor(){
    this.menu = document.querySelector('.logo ');
    this.init();
  }

  init(){
    $('.orderBy .select select').on('change', function(){
      const value = $(this).val();
      window.location.href = window.location.href + '?PS=12&O=' + value;
    })

    if(this.isExist(this.menu)){
      console.log(this.menu);
    } else {
      console.log('Não existe');
    }

    $('.filter .search-multiple-navigator fieldset').each(function(){
      if($('div', this).find('label')[0]){
        const text = $('h5', this).text();
        let label = '';
        $('div label', this).each(function(){
          const filter = $(this).text();
          label += `<option value="hide">${filter}</option>`
        })
        const html = `
        <select id="mounth"><span>${text}</span>
          <option value="hide">${text}</option>
          ${label}
        </select>`
        $('.filter__content').append(html);
      }
    })

    //$(".filter input[type='checkbox']").vtexSmartResearch();
  }

  isExist(e){
    const exist = (e == null) ? false : true;
    return exist;
  }
}

if($('body').hasClass('catalog')){
  $(document).ready(function(){
    if($('body').hasClass('search')){
      const search = window.location.pathname;
      $('.search__word').text(`"${search}"`);
    }
    window.filter = new Filter();

    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
  })

}



