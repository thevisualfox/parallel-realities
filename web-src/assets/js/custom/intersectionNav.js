const header = document.getElementsByTagName("header")[0];
const headerObserver = document.getElementsByClassName("main-header-observer")[0];
headerObserver.__link = header;

function onIntersection(entries) {
    entries.forEach(entry => {
        if (entry.target.className === "main-header-observer") {
            entry.target.__link.classList.toggle("main-header--bg-white", entry.intersectionRatio === 0);
        }
    });
}

new IntersectionObserver(onIntersection, { threshold: 1, rootMargin: "-500px 0px 0px 0px" }).observe(headerObserver);
