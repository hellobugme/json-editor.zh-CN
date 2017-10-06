/***
Upload File Editor for bootstrap3 for JSON Editor
https://github.com/hellobugme/json-editor.zh-CN
Author: Kainan Hong
License: MIT
***/

;(function(){

  // default options
  JSONEditor.defaults.upload = {
    label: 'file'
  };

  // resolver function
  JSONEditor.defaults.resolvers.unshift( function( schema ) {
    if( schema.type === "string" && schema.format === "upload" ) {
      return "upload";
    }
  });

  var idCounter = 0;

  // upload editor
  JSONEditor.defaults.editors.upload = JSONEditor.defaults.editors.string.extend({

    build: function(){

      this._super();

      var self = this;

      this.input.setAttribute( 'readonly', 'readonly' );
      this.input.style.cursor = 'text';
      this.input.style.backgroundColor = '#fff';

      this.uploadWrapper = this.theme.getContainer();
      this.uploadWrapper.classList.add( 'inputfile-wrapper');
      this.input.parentNode.appendChild( this.uploadWrapper );

      var id = 'upload-editor-' + ( idCounter++ );
      this.uploadInput = this.theme.getFormInputField( 'file' );
      this.uploadInput.classList.add('inputfile');
      this.uploadInput.id = id;
      this.uploadWrapper.appendChild( this.uploadInput );
      this.uploadInput.editor = this;

      var label = this.schema.upload && this.schema.upload.label || JSONEditor.defaults.upload.label;
      this.uploadLabel = this.theme.getFormInputLabel( label );
      this.uploadLabel.style.marginBottom = '0';
      this.uploadLabel.setAttribute( 'for', id );
      this.uploadWrapper.appendChild( this.uploadLabel );

      this.input.style.paddingLeft = this.uploadWrapper.offsetWidth + 10 + 'px';

      var change = this.schema.upload && this.schema.upload.change || JSONEditor.defaults.upload.change;
      this.uploadInput.onchange = function( e ){
        var file = e.target.files[0];
        if( file ){
          self.setValue( file.name );
          if( typeof change === 'function' ){
            change.call( this, file );
          }
        }
      };
    },

    enable: function(){
      this._super();
      this.uploadWrapper.classList.remove( 'upload-disabled' );
      this.input.style.cursor = 'text';
      this.input.style.backgroundColor = '#fff';
    },

    disable: function(){
      this._super();
      this.uploadWrapper.classList.add( 'upload-disabled' );
      this.input.style.cursor = 'not-allowed';
      this.input.style.backgroundColor = '#eee';
    },

    destroy: function(){
      this.uploadInput.onchange = null;
      this.uploadInput.editor = null;
      this.uploadWrapper.removeChild( this.uploadLabel );
      this.uploadWrapper.removeChild( this.uploadInput );
      this.input.parentNode.removeChild( this.uploadWrapper );
      this._super();
    }

  });

})();