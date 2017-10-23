/***
Upload File Editor for JSON Editor
https://github.com/hellobugme/json-editor.zh-CN
Author: Kainan Hong
License: MIT
***/

;(function(){

  // default options
  JSONEditor.defaults.upload = {};

  // resolver function
  JSONEditor.defaults.resolvers.unshift( function( schema ) {
    if( schema.type === "string" && schema.format === "upload" ) {
      return "upload";
    }
  });

  // upload editor
  JSONEditor.defaults.editors.upload = JSONEditor.defaults.editors.string.extend({

    build: function(){
      this._super();

      var change = this.schema.upload && this.schema.upload.change || JSONEditor.defaults.upload.change;
      this.input.setAttribute( 'type', 'file' );
      this.input.onchange = function( e ){
        var file = e.target.files[0];
        if( file ){
          if( typeof change === 'function' ){
            change.call( this, file );
          }
        }
      };
    },

    destroy: function(){
      this.input.onchange = null;
      this._super();
    }

  });

})();