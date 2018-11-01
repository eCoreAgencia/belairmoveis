export const HOST_URL = vtxctx.url
export const winWidth = $(window).width()

export let isLocalhost = ~window.location.host.indexOf('localhost') ? true : false

/**
 * Manipula URL da imagem, redimensionando para o tamanho desejado.
 *
 * @param {String} url
 * URL da imagem a ser manipulada.
 * @param {Integer} width
 * Largura para redimensionamento da imagem.
 * @param {Integer} height
 * Altura para redimensionamento da imagem.
 * @param {Boolean} replaceSize
 * Parâmetro que informa se é necessário alterar as dimensões de uma imagem que já está com tamanho definido.
 */
export function parseImageUrl(url, width, height, replaceSize = false) {
  let str = url.split('/')
  if (replaceSize) {
    let dataImgArr = str[5].split('-')
    dataImgArr[1] = width
    dataImgArr[2] = height
    str[5] = dataImgArr.join('-')
  }
  else {
    str[5] += `-${width}-${height}`
  }
  str = str.join('/')
  return str
}

/**
 * Cria um objeto de acordo com a string passada. Ex.: `rex.minicart.handle`.
 *
 * @param {String} nsString
 * URL da propriedade aninhada a ser criada. Ex.: `rex.minicart.handle`.
 * @returns {Object}
 */
export function namespace(nsString) {
  const parts = nsString.split('.')
  let parent, i

  if (!window.hasOwnProperty(parts[0])) window[parts[0]] = {}

  parent = window[parts[0]]
  for (i = 1; i < parts.length; i += 1) {
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {}
    }
    parent = parent[parts[i]]
  }

  return parent
}

/**
 * Faz a requisição no endpoint da API de busca da VTEX, trazendo o produto referente à query passada como parâmetro.
 *
 * @param {String} query
 * Query a ser aplicada no endpoint de search.
 */
export function getProduct(query) {
  getProduct.cache = getProduct.cache || {}
  const endpoint = `//${HOST_URL}/api/catalog_system/pub/products/search/?${query}`

  return new Promise((resolve, reject) => {
    let res = getProduct.cache[query]
    if (res) return resolve(res)
    else {
      return fetch(endpoint)
        .then(data => {
          getProduct.cache[query] = data.json()
          return resolve(getProduct.cache[query])
        })
        .catch(err => reject(err))
    }
    return reject("Couldn't get product.")
  })
}

/**
 * Faz a requisição no endpoint da API de busca da VTEX, trazendo o produto referente ao ID passado como parâmetro.
 *
 * @param {(Number|String|Array.<Number|String>)} ids
 * IDs dos produtos a serem buscados.
 */
export function getProductById(ids) {
  ids = Array.isArray(ids) ? ids : [ids]
  let str = `fq=`
  ids.forEach(id => str += `productId:${id},`)
  return getProduct(str)
}

/**
 * Faz a requisição no endpoint da API da VTEX, retornando uma estrutura semelhante ao `skuJson`.
 *
 * @param {(Number|String)} productId
 * ID dos produto a ser buscado.
 */
export function getProductWithVariations(productId) {
  getProductWithVariations.cache = getProductWithVariations.cache || {}
  const endpoint = `//${HOST_URL}/api/catalog_system/pub/products/variations/${productId}`

  return new Promise((resolve, reject) => {
    let res = getProductWithVariations.cache[productId]
    if (res) return resolve(res)
    else {
      return fetch(endpoint)
        .then(data => {
          getProductWithVariations.cache[productId] = data.json()
          return resolve(getProductWithVariations.cache[productId])
        })
        .catch(err => reject(err))
    }
    return reject("Couldn't get product with variations.")
  })
}

/**
 * Informa o tipo de dispositivo, de acordo com a largura da tela do usuário.
 *
 * @returns {String}
 */
export function screenType() {
  if (winWidth < 768) return 'mobile'
  else if (winWidth < 1025) return 'tablet'
  return 'desktop'
}

/**
 * Busca, nos SKUs, o SKU referente às variações selecionadas.
 *
 * @param {Array.<Object>} skus
 * Array de SKUs do produto.
 * @param {Object} variations
 * Objeto com a propriedade e o valor a ser comparado em cada SKU iterado em `skus`.
 * @param {Boolean} [skuJsonDataStruct=true]
 * [AINDA NÃO SUPORTADO] Se falso, este método buscará de acordo com a estrutura de SKUs vindos da API de busca.
 * @returns {Object}
 */
export const getSkuByVariations = (skus, variations, skuJsonDataStruct = true) => {
  if (!skuJsonDataStruct) return console.error('O método getSkuByVariations ainda não suporta estrutura da dados de search.')

  return skus.find(item => {
    let cond = true
    for (let prop in variations) {
      cond = cond && ( variations[prop] === item.dimensions[prop] )
    }
    return cond
  })
}


export const getProductSimiliarById = (productId) => {

	getProductSimiliarById.cache = getProductSimiliarById.cache || {}
	const endpoint = `/api/catalog_system/pub/products/crossselling/similars/${productId}`;

	return new Promise((resolve, reject) => {
	  let res = getProductSimiliarById.cache[productId]
	  if (res) return resolve(res)
	  else {
		return fetch(endpoint)
		  .then(data => {
			getProductSimiliarById.cache[productId] = data.json()
			return resolve(getProductSimiliarById.cache[productId])
		  })
		  .catch(err => reject(err))
	  }
	  return reject("Couldn't get product.")
	})


}
