/**
 * Handles user page navigations and page reload.
 */
window.onload = () => {
    const transitionElement = document.querySelector(".page-transition-1");
    const anchors = document.querySelectorAll("a");
    setTimeout(() => {
        transitionElement.classList.remove("is-active");
    }, 600);

    for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        anchor.addEventListener("click", event => {
            event.preventDefault();
            let target = event.target.href;

            transitionElement.classList.add("is-active");
            setTimeout(() => {
                window.location.href = target;
            }, 600);
        });
    }
}


/**
 * Handles back and forward browser navigation.
 */
window.onbeforeunload = () => {

    const transitionElement = document.querySelector(".page-transition-1");
    const anchors = document.querySelectorAll("a");
    setTimeout(() => {
        transitionElement.classList.remove("is-active");
    }, 600);

    for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        anchor.addEventListener("click", event => {
            event.preventDefault();
            let target = event.target.href;

            transitionElement.classList.add("is-active");
            setTimeout(() => {
                window.location.href = target;
            }, 600);
        });
    }
}