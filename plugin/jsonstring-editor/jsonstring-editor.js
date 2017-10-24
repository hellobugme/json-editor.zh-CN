/***
JSON String Editor for JSON Editor
https://github.com/hellobugme/json-editor.zh-CN
Author: Kainan Hong
License: MIT
***/

;(function(){

  var _checkType = JSONEditor.Validator.prototype._checkType;
  JSONEditor.Validator.prototype._checkType = function(type, value) {
    if( typeof type === "string" && type === "object" && this.schema.options && this.schema.options.json_string ) {
      return typeof value === 'string' && value.charAt(0) === '{' && value.charAt(value.length-1) === '}';
    }
    else{
      return _checkType.call(this, type, value);
    }
  };

  var getValue = JSONEditor.defaults.editors.object.prototype.getValue;
  JSONEditor.defaults.editors.object.prototype.getValue = function() {
    var result = getValue.call( this );
    if( this.schema.options && this.schema.options.json_string && typeof result === 'object' ){
      result = JSON.stringify( result || {} );
    }
    return result;
  };

  var setValue = JSONEditor.defaults.editors.object.prototype.setValue;
  JSONEditor.defaults.editors.object.prototype.setValue = function(value, initial) {
    if( this.schema.options && this.schema.options.json_string && typeof value === 'string' ){
      value = JSON.parse( value || '{}' );
    }
    return setValue.call( this, value, initial );
  };

})();