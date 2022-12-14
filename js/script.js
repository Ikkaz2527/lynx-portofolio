var $window = $(window),
    $document = $(document),
    $navButtons = $("nav a").filter("[href^=#]"),
    $navGoPrev = $(".go-prev"),
    $navGoNext = $(".go-next"),
    $slidesContainer = $(".slides-container"),
    $slides = $(".slide"),
    $currentSlide = $slides.first(),
    isAnimating = !1,
    pageHeight = $window.innerHeight(),
    keyCodes = {
        UP: 38,
        DOWN: 40
    };

function onNavButtonClick(e) {
    var n = $(this),
        i = $(n.attr("href"));
    i.length && (goToSlide(i), e.preventDefault())
}

function onKeyDown(e) {
    var n = e.keyCode;
    n == keyCodes.UP ? (goToPrevSlide(), e.preventDefault()) : n == keyCodes.DOWN && (goToNextSlide(), e.preventDefault())
}

function onMouseWheel(e) {
    var n = e.originalEvent.wheelDelta / 30 || -e.originalEvent.detail;
    n < -1 ? goToNextSlide() : n > 1 && goToPrevSlide()
}

function goToPrevSlide() {
    $currentSlide.prev().length && goToSlide($currentSlide.prev())
}

function goToNextSlide() {
    $currentSlide.next().length && goToSlide($currentSlide.next())
}

function goToSlide(e) {
    !isAnimating && e.length && (isAnimating = !0, $currentSlide = e, TweenLite.to($slidesContainer, 1, {
        scrollTo: {
            y: pageHeight * $currentSlide.index()
        },
        onComplete: onSlideChangeEnd,
        onCompleteScope: this
    }), TweenLite.to($navButtons.filter(".active"), .5, {
        className: "-=active"
    }), TweenLite.to($navButtons.filter("[href=#" + $currentSlide.attr("id") + "]"), .5, {
        className: "+=active"
    }))
}

function onSlideChangeEnd() {
    isAnimating = !1
}

function onResize(e) {
    var n = $window.innerHeight();
    pageHeight !== n && (pageHeight = n, TweenLite.set($slidesContainer, {
        scrollTo: {
            y: pageHeight * $currentSlide.index()
        }
    }))
}
goToSlide($currentSlide), $window.on("resize", onResize).resize(), $window.on("mousewheel DOMMouseScroll", onMouseWheel), $document.on("keydown", onKeyDown), $navButtons.on("click", onNavButtonClick), $navGoPrev.on("click", goToPrevSlide), $navGoNext.on("click", goToNextSlide);