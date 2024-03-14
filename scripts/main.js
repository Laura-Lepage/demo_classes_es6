// Une classe est un modèle qui permet de créer un ou plusieurs objet(s) = créer les objets grâce au(x) modèle(s)
// avantage est qu'on peut s'inspirer du modèle ou de la classe pour modifier des détails

// création de la classe 

// class individu { 

//     prenom = "Laura"; // s'appelle une propriété dans class mais est égal à une variable
//     age = 35
// }

// const laura = new individu() // création de l'objet à partir de la classe
// console.log(laura.prenom)

// il est possible de changer des détails en créant un constructeur

// class individu {

//     constructor(prenom, age){

//         this.prenom = prenom; // on utilise this. pour associer aux propriétés de notre objet
//         this.age = age;
//     }

//     greet(){
//         return `Hello, my name is ${this.prenom} and I am ${this.age} years old.`
//     }
// }

// const laura = new individu("Laura", 35)
// const maya = new individu("Maya", 26)
// console.log(laura.greet())


//les fonctions s'appellent méthodes


const saveButton = document.querySelector(".save")
const confirmMessage = document.querySelector(".confirmMessage")
const totalstudents = document.querySelector(".totalStudents")
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
    
    // on vide les champs input
    nom.value = ""
    prenom.value= ""
    age.value = ""

    // message de confirmation d'enregistrement de l'élève
    confirmMessage.innerHTML = 
    `
    ${newStudent.greet()}
    `

    // localStorage.setItem('table', JSON.stringify(table))

    totalstudents.innerHTML = 
    `
    ${newStudent.totalStudents(studentsTable)}
    `

    

    


})