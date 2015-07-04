define([
  '../core',
  '../method',
  '../hyu/support'
], function( Han, $, support ) {

var mdot

mdot = $.create( 'char', 'biaodian cjk middle' )
mdot.setAttribute( 'unicode', 'b7' )

Han.correctBasicBD = function( context, all ) {
  var context = context || document,
      finder

  if ( Han.support.unicoderange && !all ) {
    return
  }

  finder = Han.find( context )
  finder.filteredElemList += ' em'

  finder
  .wrap( /\u00B7/g, $.clone( mdot ))
  .charify({
    liga:      'liga',
    hanzi:     'none',
    word:      'none',
    latin:     'none',
    ellinika:  'none',
    kirillica: 'none'
  })
}

$.extend( Han.fn, {
  basicBD: null,

  correctBasicBD: function( all ) {
    this.basicBD = Han.correctBasicBD( this.context, all )
    return this
  },

  revertBasicBD: function() {
    try {
      this.basicBD.revert( 'all' )
    } catch (e) {}
    return this
  }
})

return Han
})
