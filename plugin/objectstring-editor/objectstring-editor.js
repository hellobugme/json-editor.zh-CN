/***
Object String Editor for JSON Editor
https://github.com/hellobugme/json-editor.zh-CN
Author: Kainan Hong
License: MIT
***/

;(function(){

  // resolver function
  JSONEditor.defaults.resolvers.unshift( function( schema ) {
    if( schema.type === "object-string" ) {
      return "object-string";
    }
  });

  // object string editor
  JSONEditor.defaults.editors['object-string'] = JSONEditor.defaults.editors.object.extend({
    
    getValue: function(){
      var result = this._super();
      if( typeof result === 'object' ){
        result = JSON.stringify( result || {} );
      }
      return result;
    },
    setValue: function(value, initial){
      if( typeof value === 'string' ){
        value = JSON.parse( value || '{}' );
      }
      return this._super( value, initial );
    }

  });

})();