

// tak fachowo dodaje się tzw. Pollyfills:
if (!Array.prototype.at) {
  Array.prototype.at = function () {
    // kod do .at() poprawna implementacja
    return this;
  };
}

if(!Array.prototype.last) {
    Array.prototype.last = function () {
        return this.at(-1);
    };
}


[3, 2, 10].last(); //=
[].last(); //=
