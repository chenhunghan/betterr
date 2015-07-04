/**
 * Module: Farr (Find and Replace/wRap DOM text)
 * Based on findAndReplaceDOMText:
 * github.com/padolsey/findAndReplaceDOMText
 */

define([
  '../method',
  '../regex/unicode',
  '../regex/typeset',
  'findAndReplaceDOMText'
], function( $, UNICODE, TYPESET, findAndReplaceDOMText ) {

var filterOutSelector = 'style, script',

    Farr = function( selector, filter, method, pattern, subst ) {
      return new Farr.prototype.init( selector, filter, method, pattern, subst )
    }

Farr.prototype = {
  constructor: Farr,

  context: '',

  // Store the findAndReplaceDOMText instance
  // for future action, i.e. revert.
  finder: [],

  // Adapt jQuery-way to do everything
  init: function( context, filter, method, pattern, subst ) {
    this.context = context
    this.filterOut( filter )

    return typeof method === 'string' && this[ method ]
      ? this[ method ](pattern, subst) : this
  },

  // Define the default selector to be filtered out.
  filterOutSelector: filterOutSelector,

  // Define the default function to the process of filtering out.
  filterOutFn: function( currentNode ) {
    return $.matches( currentNode, this.filterOutSelector ) ? false : true
  },

  filterOut: function( selector ) {
    if ( typeof selector === 'string' ) {
      this.filterOutSelector = selector
    } else if ( typeof selector === 'function' ) {
      this.filterOutFn = selector
    }
    return this
  },

  replace: function( pattern, subst ) {
    var that = this

    this.finder.push( findAndReplaceDOMText(
      this.context,
      {
        find: pattern,
        replace: subst,
        filterElements: function( currentNode ) {
          return that.filterOutFn( currentNode )
        }
      }
    ))
    return this
  },

  wrap: function( pattern, subst ) {
    var that = this

    that.finder.push( findAndReplaceDOMText(
      that.context,
      {
        find: pattern,
        wrap: subst,
        filterElements: function( currentNode ) {
          return that.filterOutFn( currentNode )
        }
      }
    ))
    return this
  },

  // Now that we support chaining syntax, it should
  // be able to revert the finder by level.
  revert: function( level ) {
    var len = this.finder.length,
        level = Number(level) || level === 0 ?
          Number(level) :
          level === 'all' ?
            len : 1

    if ( typeof len === 'undefined' || len === 0 ) {
      return this
    } else if ( level > this.finder.length ) {
      level = len
    }

    for (var i = parseInt( level ); i > 0; i--) {
      this.finder.pop().revert()
    }
    return this
  },

  // Force punctuation & biaodian typesetting rules
  // to be applied.
  jinzify: function() {
    var origFilterOutSelector= this.filterOutSelector

    this.filterOutSelector += ', jinze'

    this
    .replace(
      TYPESET.jinze.touwei,
      function( portion, match ) {
        var mat = match[0],
            text = $.create( '', mat ),
            elem = $.create( 'jinze', 'touwei' )

        elem.appendChild( text )
        return (
          ( portion.index === 0 && portion.isEnd ) ||
          portion.index === 1
        ) ? elem : ''
      }
    )
    .replace(
      TYPESET.jinze.wei,
      function( portion, match ) {
        var mat = match[0],
            text = $.create( '', mat ),
            elem = $.create( 'jinze', 'wei' )

        elem.appendChild( text )
        return portion.index === 0 ? elem : ''
      }
    )
    .replace(
      TYPESET.jinze.tou,
      function( portion, match ) {
        var mat = match[0],
            text = $.create( '', mat ),
            elem = $.create( 'jinze', 'tou' )

        elem.appendChild( text )
        return (
          ( portion.index === 0 && portion.isEnd ) ||
          portion.index === 1
        ) ? elem : ''
      }
    )
    .replace(
      TYPESET.jinze.middle,
      function( portion, match ) {
        var mat = match[0],
            text = $.create( '', mat ),
            elem = $.create( 'jinze', 'middle' )

        elem.appendChild( text )
        return (( portion.index === 0 && portion.isEnd ) || portion.index === 1 )
          ? elem : ''
      }
    )

    this.filterOutSelector = origFilterOutSelector
    return this
  },

  groupify: function() {
    this
    .wrap(
      TYPESET.char.biaodian.group[ 0 ],
      $.clone( $.create( 'char_group', 'biaodian cjk' ))
    )
    .wrap(
      TYPESET.char.biaodian.group[ 1 ],
      $.clone( $.create( 'char_group', 'biaodian cjk' ))
    )
    return this
  },

  // Implementation of character-level selector
  // (字元級選擇器)
  charify: function( option ) {
    var option = $.extend( {
          hanzi:     'individual',
                      // individual || group || biaodian || none
          liga:      'liga',
                     // liga || none
          word:      'group',
                      // group || punctuation || none

          latin:     'group',
          ellinika:  'group',
          kirillica: 'group',
          kana:      'none',
          eonmun:    'none'
                      // group || individual || none
        }, option || {} )

    // CJK and biaodian
    if ( option.hanzi === 'group' ) {
      this.wrap(
        TYPESET.char.hanzi.group,
        $.clone( $.create( 'char_group', 'hanzi cjk' ))
      )
    }
    if ( option.hanzi === 'individual' ) {
      this.wrap(
        TYPESET.char.hanzi.individual,
        $.clone( $.create( 'char', 'hanzi cjk' ))
      )
    }

    if ( option.hanzi === 'individual' ||
         option.hanzi === 'biaodian' ||
         option.liga  === 'liga'
    ) {

      if ( option.hanzi !== 'none' ) {

        this.replace(
          TYPESET.char.biaodian.all,
          function( portion, match ) {
            var mat = match[0],
                text = $.create( '', mat ),

                clazz = 'biaodian cjk ' + (
                  mat.match( TYPESET.char.biaodian.open ) ?
                    'open' :
                    mat.match( TYPESET.char.biaodian.close ) ?
                      'close end' :
                      mat.match( TYPESET.char.biaodian.end ) ?
                        'end' : ''
                ),

                elem = $.create( 'char', clazz ),
                unicode = mat.charCodeAt( 0 ).toString( 16 )

            elem.setAttribute( 'unicode', unicode )
            elem.appendChild( text )

            return elem
          }
        )
      }

      this.replace(
        option.liga === 'liga' ?
          TYPESET.char.biaodian.liga :
          new RegExp( '(' + UNICODE.biaodian.liga + ')', 'g' ),
        function( portion, match ) {
          var mat = match[0],
              text = $.create( '', mat ),

              elem = $.create( 'char', 'biaodian liga cjk' ),
              unicode = mat.charCodeAt( 0 ).toString( 16 )

          elem.setAttribute( 'unicode', unicode )
          elem.appendChild( text )

          return elem
        }
      )
    }

    // Western languages (word-level)
    if ( option.word !== 'none' ) {
      this.wrap(
        TYPESET.char.word,
        $.clone( $.create( 'word' ))
      )
    }

    // Western languages (alphabet-level)
    if ( option.latin !== 'none' ||
         option.ellinika !== 'none' ||
         option.kirillica !== 'none'
    ) {
      this.wrap(
        TYPESET.char.punct.all,
        $.clone( $.create( 'char', 'punct' ))
      )
    }
    if ( option.latin === 'individual' ) {
      this.wrap(
        TYPESET.char.alphabet.latin,
        $.clone( $.create( 'char', 'alphabet latin' ))
      )
    }
    if ( option.ellinika === 'individual' ) {
      this.wrap(
        TYPESET.char.alphabet.ellinika,
        $.clone( $.create( 'char', 'alphabet ellinika greek' ))
      )
    }
    if ( option.kirillica === 'individual' ) {
      this.wrap(
        TYPESET.char.alphabet.kirillica,
        $.clone( $.create( 'char', 'alphabet kirillica cyrillic' ))
      )
    }
    return this
  }
}

Farr.prototype.init.prototype = Farr.prototype
return Farr
})
