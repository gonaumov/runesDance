(function ($) {
    $.fn.randomMove = function () {
        return this.each(function handleCurrentElement(index) {
            var classSelector = "prclickImage"  + index.toString();
            var cssIdSelector = "iposition" + index.toString();
            var currentElement = $(this);
            var position = currentElement.offset(); // position = { left:; number, top: number }
            oxPosition = position.left;
            oyPosition = position.top;

            var randomIntFromInterval = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };

            var yPosition = randomIntFromInterval(0, ($("body").innerHeight() - currentElement.height()));
            var xPosition = randomIntFromInterval(0, ($("body").innerWidth() - currentElement.width()));

            var positionAndClassContent = [ "." + classSelector + " {",
                "display: block;",
                "animation: moveclickImage 1s;",
                "-webkit-animation: moveclickImage 1s; }",
                "@keyframes moveclickImage {",
                "from {",
                "top:" + oyPosition + "px;",
                "left:" + oxPosition + "px;",
                "}",
                "to {",
                "top:" + yPosition + "px;",
                "left:" + xPosition + "px;",
                "}",
                "}",
                "@-webkit-keyframes moveclickImage {",
                "from {",
                "top:" + oyPosition + "px;",
                "left:" + oxPosition + "px;",
                "}",
                "to {",
                "top:" + yPosition + "px;",
                "left:" + xPosition + "px;",
                "} }"
            ].join("\n");

            currentElement.removeClass(classSelector);

            $("<style/>", {
                type: "text/css",
                id: cssIdSelector,
                html: positionAndClassContent
            }).appendTo("body");

            currentElement.off("animationend webkitAnimationEnd oAnimationEnd");

            currentElement.on("animationend webkitAnimationEnd oAnimationEnd", function () {
                $("#" + cssIdSelector).remove();
                $(this).css({
                    position: "absolute",
                    left: xPosition + "px",
                    top: yPosition + "px"
                });
                setTimeout(function () {
                    handleCurrentElement.call(this, index);
                }.bind(this), 0);
            });

            currentElement.addClass(classSelector);
        });
    };
}(jQuery));