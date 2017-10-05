/***
Spectrum Editor for JSON Editor
https://github.com/hellobugme/json-editor.zh-CN
Author: Kainan Hong
License: MIT
***/

;(function(){

  // default options
  JSONEditor.defaults.spectrum = {};
  
  // resolver function
  JSONEditor.defaults.resolvers.unshift( function( schema ) {
    if( schema.type === "string" && schema.format === "spectrum" ) {
      return "spectrum";
    }
  });

  // spectrum editor
  JSONEditor.defaults.editors.spectrum = JSONEditor.defaults.editors.string.extend({

    postBuild: function(){

      this._super();

      var self = this;
      
      var spectrumOptions = {
        preferredFormat: "hex",
        color: this.value
      };
      $.extend(true, spectrumOptions, JSONEditor.defaults.spectrum, this.schema.spectrum);
      spectrumOptions._change = spectrumOptions.change;
      spectrumOptions.change =  function( color ) {
        self.refreshValue();
        self.onChange(true);
        if( typeof spectrumOptions._change === 'function' ){
          spectrumOptions._change.call( this, color );
        }
      };

      this.spectrumInput = $( this.input ).spectrum( spectrumOptions );
      this.spectrumReplacer = this.spectrumInput.siblings( '.sp-replacer' );

    },

    // sanitize: function( value ) {
    //   value = value + "";
    //   value = value.replace( /[^0-9a-fA-F#]/g, '' );
    //   if( value.charAt(0) !== '#' ){
    //     value = '#' + value;
    //   }
    //   value = value.substr( 0, 7 );
    //   for( var i = 0, count = ( value.length > 4 ? 7 : 4 ) - value.length; i < count; i++ ){
    //     value += '0';
    //   }
    //   return value;
    // },

    refreshValue: function() {
      this._super();
      // update spectrum's value
      if( this.spectrumInput ){
        this.spectrumInput.spectrum( 'set', this.value );
      }
    },

    enable: function() {
      this._super();
      this.spectrumReplacer.removeClass( 'sp-je-disabled' );
    },

    disable: function() {
      this._super();
      this.spectrumReplacer.addClass( 'sp-je-disabled' );
      // hide colorpicker
      this.spectrumInput.spectrum( 'hide' );
    }

  });

})();