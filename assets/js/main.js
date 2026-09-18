document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
});

/**
 * Renders a clickable list of "topics" (research items or blog posts) and
 * wires up hash-based navigation so clicking one shows its full detail
 * view. Works entirely client-side — no server needed.
 *
 * items: array of { id, title, meta, excerpt, bodyHtml, tags: [] }
 * opts.emptyHtml: HTML shown when items is empty (e.g. "no posts yet")
 */
function renderTopicList(listEl, detailEl, backLinkEl, items, opts) {
  opts = opts || {};

  function showList() {
    detailEl.hidden = true;
    listEl.hidden = false;
    if (backLinkEl) backLinkEl.hidden = true;
  }

  function showDetail(id) {
    var item = items.filter(function (i) { return i.id === id; })[0];
    if (!item) { showList(); return; }
    detailEl.querySelector('[data-field="meta"]').textContent = item.meta || "";
    detailEl.querySelector('[data-field="title"]').textContent = item.title;
    detailEl.querySelector('[data-field="body"]').innerHTML = item.bodyHtml || "";
    var tagsWrap = detailEl.querySelector('[data-field="tags"]');
    tagsWrap.innerHTML = "";
    (item.tags || []).forEach(function (t) {
      var span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tagsWrap.appendChild(span);
    });
    listEl.hidden = true;
    detailEl.hidden = false;
    if (backLinkEl) backLinkEl.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  listEl.innerHTML = "";
  if (!items.length) {
    listEl.innerHTML = opts.emptyHtml || "<p>Nothing here yet.</p>";
  } else {
    items.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "topic-item";
      btn.innerHTML =
        '<div class="topic-meta">' + (item.meta || "") + "</div>" +
        "<h3>" + item.title + "</h3>" +
        '<p class="topic-excerpt">' + (item.excerpt || "") + "</p>";
      btn.addEventListener("click", function () { location.hash = item.id; });
      listEl.appendChild(btn);
    });
  }

  if (backLinkEl) {
    backLinkEl.addEventListener("click", function (e) {
      e.preventDefault();
      location.hash = "";
    });
  }

  function routeFromHash() {
    var id = location.hash.replace("#", "");
    if (id) showDetail(id); else showList();
  }

  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
}
