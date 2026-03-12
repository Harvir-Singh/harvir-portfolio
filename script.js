/* ========= 
Data: Projects grouped into categories (rows) 
Add or edit easily — thumbnails can be local 
(assets/images/...) or external URLs. 
========= */ 

const PROJECT_ROWS = [ 
  { title: "FinTech & RegTech", 
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

function createCard(item){

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
    
    /* ========= Row scroll buttons ========= */ 
    document.querySelectorAll('.row__btn').forEach(btn => { 
      const id = btn.getAttribute('data-target'); 
      const track = document.getElementById(id); 
      btn.addEventListener('click', () => { 
        const amount = track.clientWidth * 0.9 * (btn.classList.contains('row__btn--right') ? 1 : -1); 
        track.scrollBy({ left: amount, behavior: 'smooth' }); 
      }); 
    }); 

    document.querySelectorAll(".row__track").forEach(track => { 
      track.addEventListener("mousemove", (e)=>{
      const rect = track.getBoundingClientRect()
      const edge = 120
      if(e.clientX < rect.left + edge){ 
        track.scrollBy({ left:-10, behavior:"smooth"})
      }
      if(e.clientX > rect.right - edge){
        track.scrollBy({ left:10, behavior:"smooth"})
      }
    })
  })
    
    /* ========= Keyboard nav (optional) ========= */ 
    document.addEventListener('keydown', (e) => { 
      const focusedTrack = 
      document.querySelector('.row:hover .row__track') ||
      document.querySelector('.row .row__track'); 
      if (!focusedTrack) return; 
      if (e.key === 'ArrowRight') focusedTrack.scrollBy({ 
        left: focusedTrack.clientWidth * 0.9, behavior: 'smooth' 
      }); 
      if (e.key === 'ArrowLeft') 
        focusedTrack.scrollBy({ left: -focusedTrack.clientWidth * 0.9, behavior: 'smooth' 
      }); 
    }); 
    
    
    /* ========= Modal logic ========= */ 
    const modal = document.getElementById('infoModal'); 
    const modalTitle = document.getElementById('modalTitle'); 
    const modalDesc = modal.querySelector('.modal__desc'); 
    const modalMeta = modal.querySelector('.modal__meta'); 
    const modalDemo = document.getElementById('modalDemo'); 
    const modalCode = document.getElementById('modalCode');
     
    function openModal(item){ 
      modalTitle.textContent = item.name; 
      modalDesc.textContent = item.desc || ""; 
      modalMeta.textContent = 
        (item.tags && item.tags.length)
         ? 'Tech: ${item.tags.join(" · ")}'
         :""; 
      modalDemo.href = item.demo || "#"; 
      modalCode.href = item.code || "#"; 
      modal.setAttribute('aria-hidden', 'false'); 
     
      modal?.addEventListener('click', (e) => { 
        if (e.target.matches('[data-close]')) 
          modal.setAttribute('aria-hidden', 'true'); 
        });
    }