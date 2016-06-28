function GridBar(config) {

    if (!config.container || !(config.container instanceof Node)) {
        console.error('GridBar needs a correct container selector specified in config.container');
        return;
    }

    var __CONTAINER = config.container,
        __BARS = [].slice.call(__CONTAINER.querySelectorAll('.grid-item')),
        __currentValue = -1;

    function removeClass(node) {
        node.className = node.className.replace(' selected', '');
    }

    function addClass(node) {
        if (node.className.indexOf('selected') == -1) node.className += ' selected';
    }

    function isGridItem(node) {
        return node.className.indexOf('grid-item') != -1;
    }

    function setValue(value) {
        var elIndex = __BARS.indexOf(value);
        __BARS.forEach(function(el, i) {
            if (i > elIndex) {
                removeClass(el);
            } else {
                addClass(el);
            }
        });
    }

    function mouseOverHandler(e) {
        if (isGridItem(e.target)) {
            setValue(e.target);
        }
    }

    function mouseClickHandler(e) {
        if (isGridItem(e.target)) {
            __currentValue = e.target;
        }
    }

    function mouseLeaveHandler(e) {
        setValue(__currentValue);
    }

    __CONTAINER.onmouseover = mouseOverHandler;
    __CONTAINER.onclick = mouseClickHandler;
    __CONTAINER.onmouseleave = mouseLeaveHandler;
}