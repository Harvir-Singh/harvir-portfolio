/* =========
   Data: Projects grouped into categories (rows)
   Add or edit easily — thumbnails can be local (assets/images/...) or external URLs.
========= */
const PROJECT_ROWS = [
  {
    title: "FinTech & RegTech",
    id: "row1",
    items: [
      {
        name: "AML360 — Real-Time AML Dashboard",
        img: "https://picsum.photos/600/900?random=31",
        tags: ["Streamlit", "Grafana", "Prometheus", "Great Expectations"],
        desc: "Real-time transaction risk scoring, case triage, SAR draft exports, metric SLOs.",
        code: "https://github.com/Harvir-Singh",    // replace with repo
        demo: "#"
      },
      {
        name: "PayPilot — Payouts + Compliance",
        img: "https://picsum.photos/600/900?random=32",
        tags: ["Python", "FastAPI", "Postgres", "Stripe/Interac"],
        desc: "Unified payouts with KYC/AML checks, webhook handling, audit logs.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      }
    ]
  },
  {
    title: "Data Analytics & Forecasting",
    id: "row2",
    items: [
      {
        name: "BizLens — KPI & Forecasting Platform",
        img: "https://picsum.photos/600/900?random=21",
        tags: ["Python", "SQL", "Power BI", "ARIMA/Prophet"],
        desc: "Star schema, ETL, forecasting, cohort LTV, DAX dashboards.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      },
      {
        name: "Portfolio Tracker — Single User",
        img: "https://picsum.photos/600/900?random=22",
        tags: ["Postgres", "Python", "yfinance", "Streamlit"],
        desc: "Daily P&L, performance metrics, asset allocation, risk exposure.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      }
    ]
  },
  {
    title: "Markets & Automation",
    id: "row3",
    items: [
      {
        name: "AutoTrader Live — Manual Execution",
        img: "https://picsum.photos/600/900?random=11",
        tags: ["Finnhub", "TimescaleDB", "Alerts"],
        desc: "Real-time market data, alerts, manual order workflow, risk controls.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      }
    ]
  },
  {
    title: "Product & Ops",
    id: "row4",
    items: [
      {
        name: "Product IQ — PM Toolkit",
        img: "https://picsum.photos/600/900?random=41",
        tags: ["Jira", "Confluence", "OKRs", "A/B"],
        desc: "Templates for PRDs, OKRs, discovery, roadmap, analytics experiments.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      }
    ]
  }
];

/* =========
   Render rows & cards
========= */
const rowsRoot = document.getElementById("projects");

function createCard(item){
  const a = document.createElement("a");
  a.className = "card";
  a.href = "javascript:void(0)";
  a.setAttribute("role", "button");
  a.addEventListener("click", () => openModal(item));

  const img = document.createElement("img");
  img.src = item.img;
  img.alt = item.name;

  const meta = document.createElement("div");
  meta.className = "card__meta";
  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = item.name;
  const tags = document.createElement("div");
  tags.className = "card__tags";
  tags.textContent = item.tags.join(" · ");

  meta.appendChild(title);
  meta.appendChild(tags);

  a.appendChild(img);
  a.appendChild(meta);
  return a;
}

function createRow(row){
  const section = document.createElement("section");
  section.className = "row";

  const h2 = document.createElement("h2");
  h2.className = "row__title";
  h2.textContent = row.title;

  const leftBtn = document.createElement("button");
  leftBtn.className = "row__btn row__btn--left";
  leftBtn.setAttribute("aria-label", "Scroll left");
  leftBtn.dataset.target = row.id;
  leftBtn.textContent = "❮";

  const rightBtn = document.createElement("button");
  rightBtn.className = "row__btn row__btn--right";
  rightBtn.setAttribute("aria-label", "Scroll right");
  rightBtn.dataset.target = row.id;
  rightBtn.textContent = "❯";

  const track = document.createElement("div");
  track.className = "row__track";
  track.id = row.id;

  row.items.forEach(item => track.appendChild(createCard(item)));

  section.appendChild(h2);
  section.appendChild(leftBtn);
  section.appendChild(track);
  section.appendChild(rightBtn);

  return section;
}

PROJECT_ROWS.forEach(r => rowsRoot.appendChild(createRow(r)));

/* =========
   Row scroll buttons
========= */
document.querySelectorAll('.row__btn').forEach(btn => {
  const id = btn.getAttribute('data-target');
  const track = document.getElementById(id);
  btn.addEventListener('click', () => {
    const amount = track.clientWidth * 0.9 * (btn.classList.contains('row__btn--right') ? 1 : -1);
    track.scrollBy({ left: amount, behavior: 'smooth' });
  });
});

/* =========
   Keyboard nav (optional)
========= */
document.addEventListener('keydown', (e) => {
  const focusedTrack = document.querySelector('.row:hover .row__track') || document.querySelector('.row .row__track');
  if (!focusedTrack) return;
  if (e.key === 'ArrowRight') focusedTrack.scrollBy({ left: focusedTrack.clientWidth * 0.9, behavior: 'smooth' });
  if (e.key === 'ArrowLeft')  focusedTrack.scrollBy({ left: -focusedTrack.clientWidth * 0.9, behavior: 'smooth' });
});

/* =========
   Modal logic
========= */
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = modal.querySelector('.modal__desc');
const modalMeta = modal.querySelector('.modal__meta');
const modalDemo = document.getElementById('modalDemo');
const modalCode = document.getElementById('modalCode');

function openModal(item){
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.desc || "";
  modalMeta.textContent = (item.tags && item.tags.length) ? `Tech: ${item.tags.join(" · ")}` : "";
  modalDemo.href = item.demo || "#";
  modalCode.href = item.code || "#";
  modal.setAttribute('aria-hidden', 'false');
}

modal?.addEventListener('click', (e) => {
  if (e.target.matches('[data-close]')) modal.setAttribute('aria-hidden', 'true');
});
