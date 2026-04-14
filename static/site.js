(function () {
  function setDateStatus(row, status) {
    row.className = row.className.replace(/\bdate-(past|current|upcoming)\b/g, "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");

    if (row.className) {
      row.className += " ";
    }

    row.className += status;
  }

  function updateDateRows() {
    var rows = document.querySelectorAll(".dates-table tbody tr[data-start][data-end]");
    var today = new Date();

    today.setHours(0, 0, 0, 0);

    Array.prototype.forEach.call(rows, function (row) {
      var start = new Date(row.getAttribute("data-start") + "T00:00:00");
      var end = new Date(row.getAttribute("data-end") + "T23:59:59");

      if (today > end) {
        setDateStatus(row, "date-past");
      } else if (today >= start) {
        setDateStatus(row, "date-current");
      } else {
        setDateStatus(row, "date-upcoming");
      }
    });
  }

  function initPageToc() {
    var tocs = document.querySelectorAll(".page-toc");

    Array.prototype.forEach.call(tocs, function (toc) {
      var button = toc.querySelector(".page-toc-toggle");

      if (!button) {
        return;
      }

      function renderTocState() {
        var collapsed = toc.classList.contains("is-collapsed");

        button.setAttribute("aria-expanded", collapsed ? "false" : "true");
      }

      button.addEventListener("click", function () {
        if (toc.classList.contains("is-collapsed")) {
          toc.classList.remove("is-collapsed");
        } else {
          toc.classList.add("is-collapsed");
        }

        renderTocState();
      });

      renderTocState();
    });
  }

  function init() {
    updateDateRows();
    initPageToc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
