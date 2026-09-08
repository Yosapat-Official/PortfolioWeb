const $window = $(window);
const $body = $('body');
const $document = $(document);

let vh = window.innerHeight;
// const kv2fv = () => {
// 	const $kv = $("#kv");
// 	if ($kv.length) {
// 		$("#fv").css({ height: $kv.innerHeight() });
// 	}
// };

document.documentElement.style.setProperty('--vh', `${vh}px`);
// kv2fv();

let resizeTimer;
window.addEventListener('resize', () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		vh = window.innerHeight;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		// kv2fv();
	}, 200);
}, { passive: true });

// =======================================================
// Opens slide
// =======================================================

//close slide
$('[data-item-close]').on('click', function(){
    $('.gnav__exit').removeClass('is-active');
    $('.item__content').removeClass('is-active');
    $('[data-item-base]').removeClass('is-active');
    $('[data-item-window]').removeClass('is-active');
    $("html,body").css({overflow:'visible'});
});

jQuery(document).ready(function($){
    // Open item
    $('.js-slide').on('click', function(){
        var filter = ($(this).data('filter') || '').toLowerCase();
        var target = $(this).data(filter);
        $('.item__content').removeClass('is-active'); // Remove any existing active states first
        $('.item__content[' + filter + '-item="' + target + '"]').addClass('is-active'); // Add active to matching content
        // Add background/open state
        $('[data-item-window], [data-item-base]').addClass('is-active');
        $(".gnav__exit").addClass('is-active');
    $("html,body").css({overflow:'hidden'});
    });
});

// ==========================  
// Language Switch
// ==========================

const THEMES = {
    "base-theme": {
    //   bodyClass: null,
    //   heroWallpaper: "laterano_wallpaper.webp",
    //   lastBg: "last-bg.webp",
    //   menuBg: "laterano_bg.webp",
    //   activityBg: "activity-bg.webp",
    //   music: "audio/Touch of the Law.mp3",
    //   greetingsEN: "Greetings_EN.webp",
    //   greetingsCN: "Greetings_CN.webp",
    //   menuIcon: "Menu.webp",
    //   closeIcon: "Close.webp",
    //   h2Bg: "h2-bg.webp",
    //   hoverVideo: "Lens.webm",
    //   boxImage: "Lens.webp",
      langEN: "./assets/EN.png",
      langZH: "./assets/TH.png",
    }
}

let currentLang = "en";

$(".lang-toggle").on("click", toggleLanguage);

function toggleLanguage() {
    currentLang = currentLang === "en" ? "th" : "en";
    localStorage.setItem("selectedLang", currentLang);

    document.querySelectorAll("[data-lang]").forEach((el) => {
      el.style.display =
        el.getAttribute("data-lang") === currentLang ? "" : "none";
    });

    const langBtnImg = document.querySelector(".lang-toggle img");
    const cfg = 
    // THEMES[activeThemeKey] || 
    THEMES["base-theme"];

    if (currentLang === "en") {
      langBtnImg.src = cfg.langEN;
    } else {
      langBtnImg.src = cfg.langZH;
    }
}

function applyLanguage(lang) {
    currentLang = lang;
    document.body.classList.remove("lang-pending");
    document.querySelectorAll("[data-lang]").forEach((el) => {
      el.style.display =
        el.getAttribute("data-lang") === currentLang ? "" : "none";
    });
    const langBtnImg = document.querySelector(".lang-toggle img");
    const cfg =
    // THEMES[activeThemeKey] ||
    THEMES["base-theme"];
    langBtnImg.src = currentLang === "en" ? cfg.langEN : cfg.langZH;
}

(() => {
    const saved = localStorage.getItem("selectedLang");
    if (saved === "en" || saved === "th") {
      applyLanguage(saved);
    } else {
      const browserLang = navigator.language || navigator.userLanguage;
      applyLanguage(browserLang.startsWith("en") ? "en" : "th");
    }
})();

// ==========================  
// Isotope Gallery
// ==========================

const $grid = $("#container").isotope({
    itemSelector: ".grid-item",
    masonry: { columnWidth: ".grid-item", isFitWidth: true },
    });

$grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
});

// Layout and pagination
// ==========================

const pageSizes = [[0, 12]];

let userPerPage = 12;

let curFilter = "*",
curSearch = "",
curPage = 1,
perPage = calcPerPage();

buildPager();
goToPage(1);

function calcPerPage() {
    if (typeof userPerPage !== "undefined") return userPerPage;
    const w = $(window).width();
    return pageSizes.find(([bp]) => w >= bp)[1];
}

function buildPager() {
    const filterSel =
        curFilter === "*"
        ? ".grid-item"
        : `.grid-item[data-filter="${curFilter}"]`;
    const $items = $grid.children(filterSel).not(".search-hidden");
    const pages = Math.ceil($items.length / perPage);

    //assign page counter to items//
    let page = 1,
        itemCnt = 0;

    $items.each(function () {
        if (itemCnt >= perPage) { //+page everytime count goes above perPage(default 12)
        page++;
        itemCnt = 0;
        }
        $(this).attr("data-page", page);
        itemCnt++;
    });

    //build pager item
    const $pager = $(".isotope-pager").empty(); //wipes div on rerun

    $("<a>", {
        html: '<span class="nav-arrow">&#8249;</span>',
        class: "nav prev" + (curPage <= 1 ? " disabled" : ""),
    }).appendTo($pager);

    for (let i = 1; i <= pages; i++) {
        $("<a>", {
        text: i,
        "data-page": i,
        class: "num" + (i === curPage ? " active" : ""),
        }).appendTo($pager);
    }

    $("<a>", {
        html: '<span class="nav-arrow">&#8250;</span>',
        class: "nav next" + (curPage >= pages ? " disabled" : ""),
    }).appendTo($pager);
}


// add pager function
function goToPage(n) {
const filterSel =
    curFilter === "*"
    ? ".grid-item"
    : `.grid-item[data-filter="${curFilter}"]`;
const $items = $grid.children(filterSel).not(".search-hidden");
const pages = Math.ceil($items.length / perPage);
curPage = Math.max(1, Math.min(n, pages)); //prevent invalid pages

$(".isotope-pager a.num")
    .removeClass("active")
    .filter(`[data-page="${curPage}"]`)
    .addClass("active");

$(".isotope-pager a.prev").toggleClass("disabled", curPage <= 1);
$(".isotope-pager a.next").toggleClass("disabled", curPage >= pages);

const baseSel =
    curFilter === "*"
    ? ".grid-item"
    : `.grid-item[data-filter="${curFilter}"]`;
const sel = baseSel + `:not(.search-hidden)[data-page="${curPage}"]`;
$grid.isotope({ filter: sel });

loadPageImages(sel);
}

function loadPageImages(cssSelector) {
document.querySelectorAll(cssSelector).forEach(function (item) {
    var img = item.querySelector("img[data-src]");
    if (img && !img.getAttribute("src")) {
    img.setAttribute("src", img.getAttribute("data-src"));
    }
});
}

// Filters
// ==========================

$(".filter-button-group").on("click", "li", function () {
    $(".filter-button-group li").removeClass("active");
    $(this).addClass("active");
    curFilter = $(this).data("filter");
    if (document.getElementById("projects").classList.contains("masonry-mode")) {
        applyMasonryFilter();
    } else {
        buildPager();
        goToPage(1);
    }
});

const searchInput = document.getElementById("project-search");
const searchClear = document.getElementById("search-clear");
const noResults = document.getElementById("search-no-results");

function applySearch() {
curSearch = searchInput.value.trim().toLowerCase();
searchClear.classList.toggle("visible", curSearch.length > 0);

$grid.children(".grid-item").each(function () {
    const en = (
    $(this).find(".overlay [data-lang='en']").text() || ""
    ).toLowerCase();
    const th = (
    $(this).find(".overlay [data-lang='th']").text() || ""
    ).toLowerCase();
    const cat = ($(this).attr("data-filter") || "").toLowerCase();
    const matches =
    !curSearch ||
    en.includes(curSearch) ||
    th.includes(curSearch) ||
    cat.includes(curSearch);
    $(this).toggleClass("search-hidden", !matches);
});

if (document.getElementById("projects").classList.contains("masonry-mode")) {
    applyMasonryFilter();
} else {
    buildPager();
    goToPage(1);
}

const visibleCount = $grid
    .children(".grid-item")
    .not(".search-hidden").length;
    noResults.style.display =
        curSearch && visibleCount === 0 ? "block" : "none";
    $(".isotope-pager").css(
        "visibility",
        curSearch && visibleCount === 0 ? "hidden" : "",
    );
    }

    searchInput.addEventListener("input", applySearch);
    searchClear.addEventListener("click", function () {
    searchInput.value = "";
    applySearch();
    searchInput.focus();
});

$(".isotope-pager").on("click", "a", function () {
    if ($(this).hasClass("active") || $(this).hasClass("disabled")) return;
    if ($(this).hasClass("prev")) {
        goToPage(curPage - 1);
    } else if ($(this).hasClass("next")) {
        goToPage(curPage + 1);
    } else {
        curPage = +$(this).data("page");
        goToPage(curPage);
    }
});

//Column Slider

$(window).on("resize", () => {
const newPP = calcPerPage();
    if (newPP !== perPage) {
        perPage = newPP;
        userPerPage = newPP;
        buildPager();
        goToPage(1);
    }
    updateColSlider();
});

const ITEM_ASPECT = 260 / 300;
const ITEM_GAP = 10;
const CON_PADDING = 40;
const CON_MAX_W = 1100;
const ITEM_MIN_W = 180;

let userCols = 3;

function availableWidth() {
    return Math.min($(window).width(), CON_MAX_W) - CON_PADDING;
}

function calcMaxCols() {
    return Math.max(
        3,
        Math.floor((availableWidth() + ITEM_GAP) / (ITEM_MIN_W + ITEM_GAP)),
    );
}

function applyColCount(cols) {
    const w = availableWidth();
    const itemW = Math.floor((w - cols * ITEM_GAP) / cols);
    const itemH = Math.round(itemW * ITEM_ASPECT);
    $(".grid-item").css({ width: itemW + "px", height: itemH + "px" });
    $grid.isotope("layout");
}

function updateColSlider() {
    const sliderWrap = document.getElementById("col-slider-wrap");
    const colInner = document.getElementById("col-slider-inner");
    const slider = document.getElementById("col-slider");
    const valueLabel = document.getElementById("col-slider-value");

    if ($(window).width() <= 768) {
        sliderWrap.classList.remove("visible");
        colInner.style.display = "none";
        $(".grid-item").css({ width: "", height: "" });
        return;
}

sliderWrap.classList.add("visible");
const maxCols = calcMaxCols();

if (maxCols <= 3) {
    colInner.style.display = "none";
    $(".grid-item").css({ width: "", height: "" });
    $grid.isotope("layout");
    userCols = 3;
} else {
    colInner.style.display = "flex";
    slider.min = 3;
    slider.max = maxCols;
    userCols = Math.max(3, Math.min(userCols, maxCols));
    slider.value = userCols;
    valueLabel.textContent = userCols;
    updateSliderTrack(slider);
    applyColCount(userCols);
}
}

function updateSliderTrack(slider) {
    const min = +slider.min,
        max = +slider.max,
        val = +slider.value;
    const pct = max === min ? 0 : ((val - min) / (max - min)) * 100;
    slider.style.setProperty("--slider-pct", pct + "%");
}

document
    .getElementById("col-slider")
    .addEventListener("input", function () {
        userCols = +this.value;
        document.getElementById("col-slider-value").textContent = userCols;
        updateSliderTrack(this);
        applyColCount(userCols);
        applyPageSliderSteps();
        perPage = userPerPage;
        buildPager();
        goToPage(1);
    });

setTimeout(updateColSlider, 100);

const pageSlider = document.getElementById("page-slider");
const pageSliderVal = document.getElementById("page-slider-value");

const PAGE_ROWS = [1, 2, 3, 4, 5];

function getCurrentCols() {
    return typeof userCols !== "undefined" && userCols >= 3 ? userCols : 3;
}

function buildPageSteps() {
    const cols = getCurrentCols();
    return PAGE_ROWS.map((r) => r * cols);
}

function applyPageSliderSteps() {
    const steps = buildPageSteps();
    const cols = getCurrentCols();
    const closest = steps.reduce((a, b) =>
        Math.abs(b - userPerPage) < Math.abs(a - userPerPage) ? b : a,
    );
    userPerPage = closest;
    pageSlider.min = steps[0];
    pageSlider.max = steps[steps.length - 1];
    pageSlider.step = cols;
    pageSlider.value = userPerPage;
    pageSliderVal.textContent = userPerPage;
    updatePageSliderTrack();
}

function updatePageSliderTrack() {
    const min = +pageSlider.min,
        max = +pageSlider.max,
        val = +pageSlider.value;
    const pct = max === min ? 0 : ((val - min) / (max - min)) * 100;
    pageSlider.style.setProperty("--slider-pct", pct + "%");
}

pageSlider.addEventListener("input", function () {
    userPerPage = +this.value;
    pageSliderVal.textContent = userPerPage;
    updatePageSliderTrack();
    perPage = userPerPage;
    buildPager();
    goToPage(1);
});

applyPageSliderSteps();