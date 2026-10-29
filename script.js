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
    prix: 350,
    places: 7
  },
  {
    id: 6,
    titre: "Anglais - Collège 3e année",
    matiere: "Anglais",
    niveau: "Collège",
    creneau: "Samedi 10h - 12h",
    centre: "Selouane",
    prix: 300,
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


const listeCours = document.getElementById("liste-cours");
const filtreNiveau = document.getElementById("nivaux");
const filtreMatiere = document.getElementById("matiere");
const nombreResultats = document.getElementById("nombre-resultats");
const messageVide = document.getElementById("message-vide");

const panierContenu = document.getElementById("panierContenu");
const panierEmpty = document.getElementById("panier-empty");
const panierTotal = document.getElementById("panierTotal");

let totalPrix = 0;
let panierObj = {};

function creerCarte(c) {
  return `
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

function afficherCours(tableauCours) {
  let contenu = "";

  for (let i = 0; i < tableauCours.length; i++) {
    contenu += creerCarte(tableauCours[i]);
  }

  listeCours.innerHTML = contenu;

  for (let i = 0; i < tableauCours.length; i++) {
    let c = tableauCours[i];

    let btn = listeCours.querySelector(
      `[data-ajouter="${c.id}"]`
    );

    if (btn && c.places > 0) {
      btn.addEventListener("click", function() {
        let id = c.id;

        if (panierObj[id]) {
          return;
        }

        totalPrix += Number(c.prix);

        panierContenu.innerHTML += `
          <div class="w-full flex justify-between items-center gap-3 border-b py-2">
            <p>${c.titre}</p>
            <p>${c.prix} MAD</p>

              <button
      type="button"
      onclick="supprimerDuPanier(${c.id})"
      class="bg-red-600 text-white px-3 py-1 rounded-lg"
    >
      Supprimer
    </button>
          </div>
        `;

        panierTotal.textContent = totalPrix + " MAD";

        panierObj[id] = true;

        panierEmpty.classList.add("hidden");
      });
    }
  }
}

function filtrerCours() {
  const niveauChoisi = filtreNiveau.value;
  const matiereChoisie = filtreMatiere.value;

  let resultats = [];

  for (let i = 0; i < cours.length; i++) {
    let c = cours[i];

    let niveauCorrect =
      niveauChoisi === "" || c.niveau === niveauChoisi;

    let matiereCorrecte =
      matiereChoisie === "" || c.matiere === matiereChoisie;

    if (niveauCorrect && matiereCorrecte) {
      resultats.push(c);
    }
  }

  afficherCours(resultats);

}

filtreNiveau.addEventListener("change", filtrerCours);
filtreMatiere.addEventListener("change", filtrerCours);

filtrerCours();

function supprimerDuPanier(id) {
  let coursSelectionne = cours.find(function(c) {
    return c.id === id;
  });

  if (!coursSelectionne) {
    return;
  }

  totalPrix -= Number(coursSelectionne.prix);

  panierTotal.textContent = totalPrix + " MAD";

  delete panierObj[id];

  let ligne = panierContenu.querySelector(
    `[onclick="supprimerDuPanier(${id})"]`
  );

  if (ligne) {
    ligne.parentElement.remove();
  }

  if (Object.keys(panierObj).length === 0) {
    panierEmpty.classList.remove("hidden");
  }
}
