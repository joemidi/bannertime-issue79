'use strict';

function Preview() {
  this.currentFormat = 0;
  this._bindSelectors();
  this._bindEvents();
  this.iframe.src = window.location.hash.substr(1) || this.iframe.src;
}

Preview.prototype._bindSelectors = function() {
  this.links = Array.prototype.slice.call(document.querySelectorAll('a'));
  this.iframe = document.querySelector('iframe');
  this.sideBar = document.querySelector('.sidebar');
  this.up = document.querySelector('.up');
  this.down = document.querySelector('.down');
  this.left = document.querySelector('.left');
  this.right = document.querySelector('.right');
  this.pathnames = this.links.map(function (x) {
    return x.getAttribute('href');
  });
};

Preview.prototype._bindEvents = function() {
  this._onKeyDown = this._onKeyDown.bind(this);
  this._onKeyUp = this._onKeyUp.bind(this);
  this._onClick = this._onClick.bind(this);
  this._onHashChange = this._onHashChange.bind(this);

  document.addEventListener('keydown', this._onKeyDown);
  document.addEventListener('keyup', this._onKeyUp);
  window.addEventListener('hashchange', this._onHashChange);

  for (var i = 0; i < this.links.length; i++) {
    this.links[i].addEventListener('click', this._onClick);
  }
};

Preview.prototype._nextFormat = function(array) {
  return array[this.currentFormat++];
};

Preview.prototype._prevFormat = function(array) {
  return array[this.currentFormat--];
};

Preview.prototype._onKeyDown = function(e) {
  switch (e.keyCode) {
    // Left arrow
    case 37:
      e.preventDefault();
      this.left.classList.add('active');
      TweenLite.to(this.sideBar, 1, {width: 0, padding: 0, ease: Power1.easeInOut});
    break;
    // Up arrow
    case 38:
      e.preventDefault();
      this.up.classList.add('active');
      this._prevFormat(this.links);
      if (this.currentFormat === -1) {
        this.currentFormat = this.links.length - 1;
      }
    break;
    // Right arrow
    case 39:
      e.preventDefault();
      this.right.classList.add('active');
      TweenLite.to(this.sideBar, 1, {width: 200, padding: '0 40px', ease: Power1.easeInOut});
    break;
    // Down arrow
    case 40:
      e.preventDefault();
      this.down.classList.add('active');
      this._nextFormat(this.links);
      if (this.currentFormat === this.links.length) {
        this.currentFormat = 0;
      }
    break;
  }
  window.location.hash = `#${this.pathnames[this.currentFormat]}`;
};

Preview.prototype._onKeyUp = function(e) {
  e.preventDefault();
  this.up.classList.remove('active');
  this.right.classList.remove('active');
  this.down.classList.remove('active');
  this.left.classList.remove('active');
};

Preview.prototype._onHashChange = function() {
  var locationHash = window.location.hash.substr(1);
  this.currentFormat = this.pathnames.indexOf(`${locationHash}`);
  this.iframe.src = locationHash;
};

Preview.prototype._onClick = function(e) {
  var _this = this;
  e.preventDefault();
  window.location.hash = `#${e.target.getAttribute('href')}`;
  TweenLite.set('.iframe iframe', {autoAlpha: 0});
  TweenLite.set('.loading', {display: 'block', autoAlpha: 1});
  setTimeout(function() {
    var banner = _this.iframe.contentWindow.document.querySelector('.banner');
    if (banner) {
      TweenLite.set('.loading', {autoAlpha: 0});
      TweenLite.to('.iframe iframe', 1, {autoAlpha: 1});
      TweenLite.set(banner, {top: 0, right: 0, bottom: 0, left: 0, position: 'absolute', margin: 'auto'});
    }
  }, 1000);
};

document.addEventListener('DOMContentLoaded', function () {
  new Preview();
});
