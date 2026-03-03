const XP_BY_DIFFICULTY = {
  facil: 10,
  normal: 25,
  dificil: 50
};

const LEVELS = [
  {
    level: 1,
    className: "Novato",
    minXP: 0,
    nextXP: 50,
    avatarSrc: "assets/novato.png",
    barColor: "#2ecc71" // verde
  },
  {
    level: 2,
    className: "Aventurero",
    minXP: 50,
    nextXP: 150,
    avatarSrc: "assets/aventurero.png",
    barColor: "#3498db" // azul
  },
  {
    level: 3,
    className: "Mago",
    minXP: 150,
    nextXP: null, // máximo
    avatarSrc: "assets/mago.png",
    barColor: "#8e44ad" // morado
  }
];

let xpTotal = 0;
let missions = []; 
let nextMissionId = 1;


function getLevelByXP(xp) {
  let current = LEVELS[0];
  for (const lv of LEVELS) {
    if (xp >= lv.minXP) current = lv;
  }
  return current;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function updateProfile() {
  const lv = getLevelByXP(xpTotal);

  const avatarImg = document.getElementById("avatarImg");
  const classNameEl = document.getElementById("className");
  const levelNameEl = document.getElementById("levelName");
  const xpTextEl = document.getElementById("xpText");
  const xpFillEl = document.getElementById("xpFill");
  const nextGoalEl = document.getElementById("nextGoal");

  classNameEl.textContent = lv.className;
  levelNameEl.textContent = `Nivel ${lv.level}`;

  if (avatarImg.getAttribute("src") !== lv.avatarSrc) {
    avatarImg.setAttribute("src", lv.avatarSrc);
  }

  xpFillEl.style.background = lv.barColor;

  if (lv.nextXP === null) {
    xpTextEl.textContent = `XP: ${xpTotal} (MAX)`;
    xpFillEl.style.width = "100%";
    nextGoalEl.textContent = "Nivel máximo alcanzado";
  } else {
    const start = lv.minXP;
    const end = lv.nextXP;

    const progress = (xpTotal - start) / (end - start); 
    const pct = clamp(progress, 0, 1) * 100;

    xpTextEl.textContent = `XP: ${xpTotal} / ${end}`;
    xpFillEl.style.width = `${pct}%`;

    const remaining = Math.max(0, end - xpTotal);
    nextGoalEl.textContent = `Siguiente nivel en ${remaining} XP`;
  }
}

function renderMissions() {
  const container = document.getElementById("listaMisiones");
  container.innerHTML = "";

  missions.forEach((m) => {
    const card = document.createElement("div");
    card.className = "mission";

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.gap = "12px";
    row.style.alignItems = "center";

    const left = document.createElement("div");
    left.style.flex = "1";

    const title = document.createElement("h3");
    title.textContent = m.nombre;
    title.style.margin = "0";

    const desc = document.createElement("p");
    desc.textContent = m.descripcion;
    desc.style.margin = "6px 0 0";

    left.appendChild(title);
    left.appendChild(desc);

    const right = document.createElement("div");
    right.style.display = "flex";
    right.style.gap = "10px";
    right.style.flexShrink = "0";

    const btnComplete = document.createElement("button");
    btnComplete.textContent = "Completar";
    btnComplete.addEventListener("click", () => completeMission(m.id));

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", () => deleteMission(m.id));

    right.appendChild(btnComplete);
    right.appendChild(btnDelete);

    row.appendChild(left);
    row.appendChild(right);

    card.appendChild(row);
    container.appendChild(card);
  });
}

function addMission() {
  const nombreEl = document.getElementById("nombre");
  const descEl = document.getElementById("descripcion");
  const diffEl = document.getElementById("dificultad");

  const nombre = (nombreEl.value || "").trim();
  const descripcion = (descEl.value || "").trim();
  const dificultad = diffEl.value;

  if (!nombre || !descripcion) {
    alert("Por favor escribe el nombre y la descripción.");
    return;
  }

  missions.push({
    id: nextMissionId++,
    nombre,
    descripcion,
    dificultad
  });

  nombreEl.value = "";
  descEl.value = "";
  diffEl.value = "facil";

  renderMissions();
}

function deleteMission(id) {
  missions = missions.filter(m => m.id !== id);
  renderMissions();
}

function completeMission(id) {
  const m = missions.find(m => m.id === id);
  if (!m) return;

  const gained = XP_BY_DIFFICULTY[m.dificultad] ?? 0;
  xpTotal += gained;

  missions = missions.filter(mm => mm.id !== id);

  updateProfile();
  renderMissions();
}

function init() {
  const btnCrear = document.getElementById("btnCrear");
  if (btnCrear) {
    btnCrear.addEventListener("click", addMission);
  }

  const nombreEl = document.getElementById("nombre");
  const descEl = document.getElementById("descripcion");

  if (nombreEl) {
    nombreEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addMission();
    });
  }
  if (descEl) {
    descEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addMission();
    });
  }

  updateProfile();
  renderMissions();
}

document.addEventListener("DOMContentLoaded", init);