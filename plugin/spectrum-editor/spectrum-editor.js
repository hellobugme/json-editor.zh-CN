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

    build: function(){

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

      this.spectrumWrapper = $('<div style="margin-bottom: 12px;"></div>').appendTo( this.input.parentNode ).append( this.input );
      this.spectrumInput = $( this.input ).spectrum( spectrumOptions );

    },

    refreshValue: function(){
      this._super();
      // update spectrum's value
      if( this.spectrumInput ){
        this.spectrumInput.spectrum( 'set', this.value );
      }
    },

    enable: function(){
      this._super();
      this.spectrumWrapper.removeClass( 'sp-je-disabled' );
    },

    disable: function(){
      this._super();
      this.spectrumWrapper.addClass( 'sp-je-disabled' );
      // hide colorpicker
      this.spectrumInput.spectrum( 'hide' );
    },

    destroy: function(){
      if( this.spectrumWrapper ){
        this.spectrumInput.spectrum( 'destroy' );
        this.spectrumWrapper.remove();
      }
      this._super();
    }

  });

})();