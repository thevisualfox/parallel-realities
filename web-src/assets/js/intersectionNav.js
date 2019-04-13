const header = document.getElementsByTagName("header")[0];
const headerObserver = document.getElementsByClassName("main-header__observer")[0];
headerObserver.__link = header;

function onIntersection(entries) {
    entries.forEach(entry => {
        entry.target.__link.classList.toggle("is-sticky", entry.intersectionRatio === 0);
    });
}

new IntersectionObserver(onIntersection, { threshold: 1 }).observe(headerObserver);