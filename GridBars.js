function GridBar(config) {

    if (!config.container || !(config.container instanceof Node)) {
        console.error('GridBar needs a correct container selector specified in config.container');
        return;
    }

    var __CONTAINER = config.container,
        __onSetValue = config.onSetValue || function(value) { console.log(value) },
        __ANSWERS = config.answers || "0,1,2,3,4,5,6,7,8,9,10".split(','),
        __BARS = __ANSWERS.map(function(item, index) {
            var gridItem = document.createElement('div');
            gridItem.textContent = item;
            gridItem.className = 'grid__item';
            __CONTAINER.appendChild(gridItem);

            return gridItem;
        }),
        __currentValue = -1;

    function removeClass(node) {
        node.className = node.className.replace(' grid__item--selected', '');
    }

    function addClass(node) {
        if (node.className.indexOf('grid__item--selected') == -1) node.className += ' grid__item--selected';
    }

    function isGridItem(node) {
        return node.className.indexOf('grid__item') != -1;
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
            __onSetValue(__ANSWERS[__BARS.indexOf(e.target)]);
        }
    }

    function mouseLeaveHandler(e) {
        setValue(__currentValue);
    }

    __CONTAINER.addEventListener('mouseover', mouseOverHandler);
    __CONTAINER.addEventListener('click', mouseClickHandler);
    __CONTAINER.addEventListener('mouseleave', mouseLeaveHandler);
}