ma porte d'entré sur l'application est server.js

ce fichier créer un fichier app.js qui lui servira a appeler expressJS pour fournir la capacité de gerer le backend de l'application

mongoose sera le driver MongoDB
prisma sera le driver MySQL

les routes sont des adresse que l'on met dans l'url qui permettent d'appeler des fonctions et/ou methode

par exemple "/creatures" appelle la fonction indexCreature dans l'objet loreController.

lorsque l'on fait des requetes a un API, par exemple pour se connecter, on utilise differente methode, POST, PUT, GET ou encore PATCH

On utilise souvent un format d'objet transformer en chaine de caractère pour la facilité du transfert,
une fois que le server à répondu pour nous informer qu'on est connecté, elle nous renvois un "token"(JWT) qui à une date de validité

C'est comme une carte d'accès pour l'informer de nos permission

c'est avec cela que l'on peux accéder a des parties reservé de l'application distante

lorsque l'on fait une requête, on passe par le controller, qui lui, se sert d'un service pour répondre a notre demande.
le service fait des requêtes a la base de données, vérifie les information, les met en forme et les renvois au controller, puis, ensuite le controller nous les renvois ou les envois a la vue

Dans le projet, je me suis servi d'un middleware pour s'occuper de tout ce qui concerne le token… gérer sa création, gérer ses permissions, gérer son expiration mais aussi vérifier si celui que l'on donne est le bon et si on a les droit d'accès

liste des endpoints

/creature/:id sert à afficher les détails d'une créature
/creatures sert a afficher toute les créatures
/creature/:id/testimony sert à afficher les témoignages pour une creature
/creature sert a créer une nouvelle créature
/testimony sert a créer un nouveau témoignage
/testimony/:id/validate sert à valider un témoignage
/testimony/:id/reject sert à rejeter un témoignage

/auth/register sert à créer un compte
/auth/login sert à se connecter
/auth/me sert à afficher son propre profil
/admin/users sert à afficher la liste des utilisateurs
/auth/users/:id/role sert à changer le rôle d'une utilisateur



