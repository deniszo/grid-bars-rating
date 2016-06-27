'use strict';

var Helpers = {
    removeClass: function(node, className) {
        node.className = node.className.replace(' ' + className, '');
    },

    addClass: function (node, className) {
        node.className += ' ' + className;
    },

    isGridItem: function(node) {
        return node.className.indexOf('grid-item') != -1;
    }
};

function GridBar(container) {
    var _CONTAINER = container,
        _BARS = [].slice.call(_CONTAINER.querySelectorAll('.grid-item')),
        _selectedBars = [],
        _currentValue = null;

    this.setValue = function(node) {
        _currentValue = node;
        this.setSelected(null);
    };

    this.setSelected = function(node) {

        var value = node || _currentValue;

        _BARS.forEach(function(item, i, arr) {
            Helpers.removeClass(item, 'selected');
        });

        _selectedBars = _BARS.slice(0, _BARS.indexOf(value) + 1);

        _selectedBars.forEach(function(item, i, arr) {
            Helpers.addClass(item, 'selected');
        });
    };

    _CONTAINER.onmouseover = this.mouseOver.bind(this);
    _CONTAINER.onclick = this.mouseClick.bind(this);
    _CONTAINER.onmouseleave = this.mouseLeave.bind(this);
}

GridBar.prototype.mouseOver = function(e) {
    if (Helpers.isGridItem(e.target)) {
        this.setSelected(e.target);
    }
};

GridBar.prototype.mouseClick = function(e) {
    if (Helpers.isGridItem(e.target)) {
        this.setValue(e.target);
    }
};

GridBar.prototype.mouseLeave = function(e) {
    this.setSelected();
};

