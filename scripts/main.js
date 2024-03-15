const saveButton = document.querySelector(".save")
const confirmMessage = document.querySelector(".confirmMessage")
const totalstudents = document.querySelector(".totalStudents")
const studentsList = document.querySelector(".studentsList")
const studentsTable = [] // déclarer le tableau en dehors pour que cela rajoute à chaque fois les objets dedans

class student{ // Création d'objet(s) 

    constructor(nom, prenom, age){ // = construction de l'objet

        this.nom = nom; // = création des propriétés (=variables)
        this.prenom = prenom;
        this.age = age;
        
    }

    isNumeric(value) { // modèle (=fonction) pour vérifier si que le champ âge soit bien des chiffres
        return /^\d+$/.test(value) // Expression régulière pour vérifier si la valeur est composée uniquement de chiffres
    }

    addStudent(nom, prenom, age){
        if(nom.trim() !== '' && prenom.trim() !== '' && age && this.isNumeric(age)){
            studentsTable.push({nom, prenom, age})
        }
        console.log(studentsTable)  
    }

    greet(){ // = création de modèles (= fonctions)
        return `Vous avez inscrit ${this.nom} ${this.prenom} âgé(e) de ${this.age} ans avec succès ! 🙂`
    }

    addStudentsList(prenom, nom, age){
        return `<li data-index="${studentsTable.length-1}">${prenom} ${nom}: ${age} ans<span class="cross">❌</span></li>`
    }

    totalStudents(table){
        return `Il y a ${table.length} élève(s) enregistré(s)`
    }
}

saveButton.addEventListener('click', function(){

    const nom = document.getElementById("name")
    const prenom = document.getElementById("surname")
    const age = document.getElementById("age")

    // création d'un nouvel élève sur base de la construction de notre objet class Student et on pourra aller rechercher les modèles qui lui correspondent
    const newStudent = new student(nom.value, prenom.value, age.value)

    //vérification au click que le champs "âge" est bien un chiffre
    if (!newStudent.isNumeric(age.value)){
        alert(`Le champ "Âge de l'élève" ne peut contenir que des chiffres.`)
        age.value = ""
        return // Arrête l'exécution de la fonction si l'âge n'est pas numérique
    }

    // ajout de l'objet "élève" à notre tableau
    newStudent.addStudent(nom.value, prenom.value, age.value)

    // ajouter l'élève à la liste - à faire avant d'effacer le contenu des champs sinon ne fonctionne pas 
    studentsList.innerHTML += `${newStudent.addStudentsList(prenom.value, nom.value, age.value)}`
    
    // on vide les champs input
    nom.value = ""
    prenom.value= ""
    age.value = ""

    // message de confirmation d'enregistrement de l'élève
    confirmMessage.innerHTML = 
    `
    ${newStudent.greet()}
    `

    setTimeout(function() {
        confirmMessage.innerHTML = ``
    }, 5000)

    // localStorage.setItem('table', JSON.stringify(table))

    totalstudents.innerHTML = `${newStudent.totalStudents(studentsTable)}`
})

// délégation d'évenements à partir du parent <ul>, on va vérifier si l'enfant de cet <ul> sur lequel on clique contient la class="cross"; si oui, on supprime le parent de cette "cross" cad le <li>
studentsList.addEventListener('click', function(e){
    if (e.target.classList.contains("cross")){
        //obtenir l'index de l'élément ciblé
        const index = parseInt(e.target.parentElement.getAttribute("data-index"))
        //supprimer la ligne de cet index dans le tableau, 1 élément
        studentsTable.splice(index,1)
        //supprimer la ligne dans la liste visuelle
        e.target.parentElement.remove()

        console.log(studentsTable)

        //mettre à jour les valeurs de data-index
        //on récupère tous les <li> dans la liste d'élèves
        const listItems = studentsList.querySelectorAll("li");
        listItems.forEach(function(item, i) {
            item.setAttribute("data-index", i);
        })

        totalstudents.innerHTML = `${new student().totalStudents(studentsTable)}`
    }


})