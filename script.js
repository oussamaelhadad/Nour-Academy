const cours = [
  {
    id: 1,
    titre: "Mathématiques - 6e année",
    matiere: "Mathématiques",
    niveau: "Primaire",
    creneau: "Lundi 16h - 18h",
    centre: "Nador Centre",
    prix: 200,
    places: 8
  },
  {
    id: 2,
    titre: "Français - 6e année",
    matiere: "Français",
    niveau: "Primaire",
    creneau: "Mardi 16h - 18h",
    centre: "Hay Al Matar",
    prix: 200,
    places: 5
  },
  {
    id: 3,
    titre: "Mathématiques - 1er année",
    matiere: "Mathématiques",
    niveau: "Collège",
    creneau: "Lundi 17h - 19h",
    centre: "Nador Centre",
    prix: 250,
    places: 6
  },
  {
    id: 4,
    titre: "Physique-Chimie - 3e année",
    matiere: "Physique-Chimie",
    niveau: "Collège",
    creneau: "Mercredi 17h - 19h",
    centre: "Selouane",
    prix: 250,
    places: 4
  },
  {
    id: 5,
    titre: "Français - Collège 2e année",
    matiere: "Français",
    niveau: "Collège",
    creneau: "Jeudi 16h - 18h",
    centre: "Hay Al Matar",
    prix: 230,
    places: 7
  },
  {
    id: 6,
    titre: "Anglais - Collège 3e année",
    matiere: "Anglais",
    niveau: "Collège",
    creneau: "Samedi 10h - 12h",
    centre: "Selouane",
    prix: 230,
    places: 0
  },
  {
    id: 7,
    titre: "Mathématiques - Tronc commun",
    matiere: "Mathématiques",
    niveau: "Tronc commun",
    creneau: "Lundi 18h - 20h",
    centre: "Nador Centre",
    prix: 300,
    places: 5
  },
  {
    id: 8,
    titre: "Physique-Chimie - Tronc commun",
    matiere: "Physique-Chimie",
    niveau: "Tronc commun",
    creneau: "Mardi 18h - 20h",
    centre: "Hay Al Matar",
    prix: 300,
    places: 4
  },
  {
    id: 9,
    titre: "Mathématiques - 1ère Bac",
    matiere: "Mathématiques",
    niveau: "1ère Bac",
    creneau: "Mercredi 16h - 18h",
    centre: "Nador Centre",
    prix: 350,
    places: 6
  },
  {
    id: 10,
    titre: "SVT - 1ère Bac",
    matiere: "SVT",
    niveau: "1ère Bac",
    creneau: "Jeudi 17h - 19h",
    centre: "Selouane",
    prix: 320,
    places: 3
  },
  {
    id: 11,
    titre: "Mathématiques - 2e Bac",
    matiere: "Mathématiques",
    niveau: "2e Bac",
    creneau: "Samedi 10h - 12h",
    centre: "Nador Centre",
    prix: 400,
    places: 2
  },
  {
    id: 12,
    titre: "Physique-Chimie - 2e Bac",
    matiere: "Physique-Chimie",
    niveau: "2e Bac",
    creneau: "Dimanche 10h - 12h",
    centre: "Hay Al Matar",
    prix: 400,
    places: 0
  }
];

function creerCarte(c) {
  return `
    <article class="bg-white border border-slate-200 rounded-xl p-4">

      <div class="flex justify-between items-center gap-2">
        <span class="text-sm font-semibold text-emerald-800">
          ${c.matiere}
        </span>

        <span class="text-sm text-slate-500">
          ${c.niveau}
        </span>
      </div>

      <h3 class="font-bold text-lg mt-3">
        ${c.titre}
      </h3>

      <p class="text-sm text-slate-500 mt-2">
        ${c.creneau} - ${c.centre}
      </p>

      <p class="font-bold text-emerald-700 mt-3">
        ${c.prix} MAD / mois
      </p>

      <p class="text-sm mt-1">
        ${c.places === 0 ? "Complet" : c.places + " places restantes"}
      </p>

      <button
        type="button"
        data-ajouter="${c.id}"
        ${c.places === 0 ? "disabled" : ""}
        class="w-full min-h-11 mt-3 rounded-lg bg-emerald-800 text-white disabled:bg-slate-400"
      >
        ${c.places === 0 ? "Complet" : "Ajouter à ma sélection"}
      </button>

    </article>
  `;
}
const listeCours = document.getElementById("liste-cours");
const filtreNiveau = document.getElementById("nivaux");
const filtreMatiere = document.getElementById("matiere");
const nombreResultats = document.getElementById("nombre-resultats");
const messageVide = document.getElementById("message-vide");


function afficherCours(tableauCours) {
  let contenu = "";

  for (let i = 0; i < tableauCours.length; i++) {
    const c = tableauCours[i];

    contenu += `
      <article class="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3">

        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="bg-emerald-50 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full">
            ${c.matiere}
          </span>

          <span class="text-sm text-slate-500">
            ${c.niveau}
          </span>
        </div>

        <h3 class="text-lg font-bold text-slate-800">
          ${c.titre}
        </h3>

        <p class="text-sm text-slate-500">
          ${c.creneau}
        </p>

        <p class="text-sm text-slate-500">
          Centre : ${c.centre}
        </p>

        <div class="flex justify-between items-center gap-2 flex-wrap">
          <p class="text-emerald-700 font-bold">
            ${c.prix} MAD / mois
          </p>

          <p class="text-sm ${c.places === 0 ? "text-red-600" : "text-slate-500"}">
            ${c.places === 0 ? "Complet" : c.places + " places restantes"}
          </p>
        </div>

        <button
          type="button"
          data-ajouter="${c.id}"
          ${c.places === 0 ? "disabled" : ""}
          class="w-full min-h-11 rounded-lg p-2 text-white bg-emerald-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          ${c.places === 0 ? "Complet" : "Ajouter à ma sélection"}
        </button>

      </article>
    `;
  }

  listeCours.innerHTML = contenu;
}

function filtrerCours() {
  const niveauChoisi = filtreNiveau.value;
  const matiereChoisie = filtreMatiere.value;

  const resultats = [];

  for (let i = 0; i < cours.length; i++) {
    const c = cours[i];

    const niveauCorrect =
      niveauChoisi === "" || c.niveau === niveauChoisi;

    const matiereCorrecte =
      matiereChoisie === "" || c.matiere === matiereChoisie;

    if (niveauCorrect && matiereCorrecte) {
      resultats.push(c);
    }
  }

  afficherCours(resultats);

  nombreResultats.textContent =
    resultats.length + (resultats.length > 1
      ? " cours trouvés"
      : " cours trouvé");

  messageVide.hidden = resultats.length !== 0;
}

filtreNiveau.addEventListener("change", filtrerCours);
filtreMatiere.addEventListener("change", filtrerCours);

filtrerCours();