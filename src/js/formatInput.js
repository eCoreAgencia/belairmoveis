/**
 * @method formatInput
 * Formata o input de acordo com a máscara passada.
 * @param  {Element} el
 * Elemento a ser formatado.
 * @param  {String} mask
 * Máscara para formatação, onde "0" é para todos os caracteres numéricos, "A" é para todos os caracteres alfa-numéricos e "S" apenas para letras.
 * @param  _skipMaskChars
 * Método que deve ser ignorado na chamada, pois é usado internamente, para saber quais caracteres devem ser ignorados pela máscara.
 */
export default function formatInput(el, mask, _skipMaskChars) {
  let value = $(el).val()

  if (value) {
    let trans = {
      '0': { pattern: /\d/ },
      'A': { pattern: /[a-zA-Z0-9]/ },
      'S': { pattern: /[a-zA-Z]/ }
    }

    let buf = []
    let m = 0
    let maskLen = mask.length
    let v = 0
    let valLen = value.length
    let offset = 1
    let addMethod = "push"
    let lastMaskChar = maskLen - 1
    let check = () => m < maskLen && v < valLen

    while (check()) {
      let maskDigit = mask.charAt(m)
      let valDigit = value.charAt(v)
      let translation = trans[maskDigit]

      if (translation) {
        if (valDigit.match(translation.pattern)) {
          buf[addMethod](valDigit)
          m += offset
        }
        else if (translation.optional) {
          m += offset
          v -= offset
        }
        v += offset
      }
      else {
        if (_skipMaskChars === undefined) {
          buf[addMethod](maskDigit)
        }

        if (valDigit === maskDigit) {
          v += offset
        }

        m += offset
      }
    }

    $(el).val(buf.join(""))
  }
}
