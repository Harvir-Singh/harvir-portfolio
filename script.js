/* ========= 
Data: Projects grouped into categories (rows) 
Add or edit easily — thumbnails can be local 
(assets/images/...) or external URLs. 
========= */

const PROJECT_ROWS = [
  {
    title: "FinTech & RegTech",
    id: "row1",
    items: [

      {
        name: "AML360 — Real-Time AML Dashboard",
        img: "assets/images/fintech/aml360.png",
        tags: ["Streamlit", "Grafana", "Prometheus", "Great Expectations"],
        desc: "Real-time transaction risk scoring, case triage, SAR draft exports, metric SLOs.",
        code: "https://github.com/Harvir-Singh", // replace with repo 
        demo: "#"
      },

      {
        name: "Fraud Detection System",
        img: "assets\\images\\fintech\\fraud-detection system.png",
        tags: ["Python", "FastAPI", "Postgres", "Stripe/Interac"],
        desc: "Unified payouts with KYC/AML checks, webhook handling, audit logs.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      },

      {
        name: "Fraud Threshold Optimizer",
        img: "assets\\images\\fintech\\threshold-optimizer.png",
        tags: ["Python", "SQL", "Postgres", "Scikit-learn", "Optimization"],
        desc: "Unified payouts with KYC/AML checks, webhook handling, audit logs.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      },

      {
        name: "Fraud Analytics Dashboard",
        img: "assets\\images\\fintech\\fraud-analytics.png",
        tags: ["Jupyter Notebook", "Python", "Postgres", "Seaborn", "Matplotlib"],
        desc: "Unified payouts with KYC/AML checks, webhook handling, audit logs.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      },

      {
        name: "Fraud Risk Strategy",
        img: "assets\\images\\fintech\\fraud-strategy.png",
        tags: ["Jupyter Notebook", "Pandas", "Scikit-learn", "Risk Modeling"],
        desc: "Unified payouts with KYC/AML checks, webhook handling, audit logs.",
        code: "https://github.com/Harvir-Singh",
        demo: "#"
      }
    ]
  },
];

/* ========= 
Render rows & cards 
========= */

const rowsRoot = document.getElementById("projects");

function createCard(item) {

  const card = document.createElement("div")
  card.className = "card"

  const img = document.createElement("img")
  img.src = item.img
  img.alt = item.name

  const overlay = document.createElement("div")
  overlay.className = "card__overlay"

  const title = document.createElement("div")
  title.className = "card__title"
  title.textContent = item.name

  const desc = document.createElement("div")
  desc.className = "card__desc"
  desc.textContent = item.desc

  const tags = document.createElement("div")
  tags.className = "card__tags"
  tags.textContent = item.tags.join(" · ")

  overlay.appendChild(title)
  overlay.appendChild(desc)
  overlay.appendChild(tags)

  card.appendChild(img)
  card.appendChild(overlay)

  card.addEventListener("click", () => openModal(item))

  return card

}

function createRow(row) {
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
  rightBtn.dataset.target = row.id; rightBtn.textContent = "❯";

  const track = document.createElement("div");
  track.className = "row__track";
  track.id = row.id;

  row.items.forEach(item =>
    track.appendChild(createCard(item)));

  section.appendChild(h2);
  section.appendChild(leftBtn);
  section.appendChild(track);
  section.appendChild(rightBtn);
  return section;
}

PROJECT_ROWS.forEach(r => rowsRoot.appendChild(createRow(r)));

/* ========= Row scroll buttons (JS Transform based) ========= */
const tracksState = {};

document.querySelectorAll('.row__btn').forEach(btn => {
  const id = btn.getAttribute('data-target');
  const track = document.getElementById(id);
  if (!tracksState[id]) tracksState[id] = 0;

  btn.addEventListener('click', () => {
    // Scroll amount is roughly the viewport width
    const amount = window.innerWidth * 0.8;

    // Calculate maximum distance we can translate left
    // track.scrollWidth is total width. We subtract innerWidth and add padding to find the end.
    const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + 64);

    if (btn.classList.contains('row__btn--right')) {
      tracksState[id] -= amount;
      if (Math.abs(tracksState[id]) > maxScroll) tracksState[id] = -maxScroll;
    } else {
      tracksState[id] += amount;
      if (tracksState[id] > 0) tracksState[id] = 0;
    }

    track.style.transform = `translateX(${tracksState[id]}px)`;
  });
});


/* ========= Keyboard nav (optional) ========= */
document.addEventListener('keydown', (e) => {
  const focusedRow = document.querySelector('.row:hover') || document.querySelector('.row');
  if (!focusedRow) return;

  if (e.key === 'ArrowRight') {
    const btn = focusedRow.querySelector('.row__btn--right');
    if (btn) btn.click();
  }
  if (e.key === 'ArrowLeft') {
    const btn = focusedRow.querySelector('.row__btn--left');
    if (btn) btn.click();
  }
});


/* ========= Modal logic ========= */
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = modal.querySelector('.modal__desc');
const modalMeta = modal.querySelector('.modal__meta');
const modalDemo = document.getElementById('modalDemo');
const modalCode = document.getElementById('modalCode');

function openModal(item) {
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.desc || "";
  modalMeta.textContent =
    (item.tags && item.tags.length)
      ? 'Tech: ${item.tags.join(" · ")}'
      : "";
  modalDemo.href = item.demo || "#";
  modalCode.href = item.code || "#";
  modal.setAttribute('aria-hidden', 'false');

  modal?.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]'))
      modal.setAttribute('aria-hidden', 'true');
  });
}