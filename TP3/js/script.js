alert("une alerte pour tester le js");

const conteneurArticles = document.getElementById('conteneur-articles')
const champRecherche = document.getElementById('champ-recherche')

function afficherArticles(liste) {
    conteneurArticles.innerHTML = ''
    liste.forEach(article => {
      const bloc = document.createElement('div')
      bloc.classList.add('article')
  
      const titre = document.createElement('h2')
      titre.textContent = article.title
  
      const contenu = document.createElement('p')
      contenu.textContent = article.body
  
      bloc.appendChild(titre)
      bloc.appendChild(contenu)
      conteneurArticles.appendChild(bloc)
    })
  }

  fetch('json/posts.json')
  .then(reponse => reponse.json())
  .then(donnees => {
    articles = donnees
    afficherArticles(articles)
  })

  champRecherche.addEventListener('input', () => {
    const texte = champRecherche.value.toLowerCase()
    const filtrés = articles.filter(article =>
      article.title.toLowerCase().includes(texte) ||
      article.body.toLowerCase().includes(texte)
    )
    afficherArticles(filtrés)
  })

