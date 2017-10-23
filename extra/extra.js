/***
Extra for JSON Editor
https://github.com/hellobugme/json-editor.zh-CN
Author: Kainan Hong
License: MIT
***/

;(function(){

  var $getPaths = function( schema, base_path ){
    if( !base_path ) base_path = 'root';

    var paths = [];

    if( schema.type !== 'object' ){
      paths = [ base_path ];
    }else{
      for( var key in schema.properties ){
        paths = paths.concat( $getPaths( schema.properties[ key ], base_path + '.' + key ) );
      }
    }

    return paths;
  };

  JSONEditor.prototype.watch2 = function( path, callback ){
    var editor = this.getEditor( path );
    var old_value = editor.getValue();

    this.watch( path, function(){
      var new_value = editor.getValue();

      callback({
        path: path,
        old_value: old_value,
        new_value: new_value
      })

      old_value = new_value;
    });
  };

  JSONEditor.prototype.watchAll = function( callback ){
    var self = this;
    $getPaths(this.schema).forEach(function( path ){
      self.watch2( path, callback );
    });
  };

})();