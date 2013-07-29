function Frame(){
  this.collapsed = [];
  this.totalLEDs = 25;
  this.data = {};
}


Frame.prototype.blank = function() {
  for (var i=0;i<this.totalLEDs;i++) {
    this.data[i] = [0,0,0];
  }
};

//TODO make a function that checks that values are valid color arrays.

Frame.prototype.all = function(value) {
  for (var i=0;i<this.totalLEDs;i++) {
    this.data[i] = value;
  }
};

Frame.prototype.collapse = function(){
  this.collapsed = [];
  for (var led in this.data){
    this.collapsed = this.collapsed.concat(this.data[led]);
  }
};

Frame.prototype.setLED = function(LED, value) {
  this.data[LED] = value;
};

Frame.prototype.getLED = function(LED) {
  return this.data[LED];
};

Frame.prototype.buffer = function() {
  this.collapse();
  data = new Buffer(this.collapsed);
  return data;
};

Frame.prototype.dataString = function() {
  this.collapse();
  var leds = this.collapsed.length/3;
  var dataString = 'DATA ' + leds + '\n';
  return dataString;
};

module.exports.Frame = Frame;