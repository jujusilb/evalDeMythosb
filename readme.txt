ma porte d'entré sur l'application est server.js

ce fichier créer un fichier app.js qui lui servira a appeler expressJS pour fournir la capacité de gerer le backend de l'application

mongoose sera le driver MongoDB
prisma sera le driver MySQL

les routes sont des adresse que l'on met dans l'url qui permettent d'appeler des fonctions et/ou methode

par exemple "/creatures" appelle la fonction indexCreature dans l'objet loreController.

lorsque l'on fait des requetes a un API, par exemple pour se connecter, on utilise differente methode, POST, PUT, GET ou encore PATCH

on utilise souvent un format d'objet transformer en chaine de caractere pour la facilité du transfert,
une fois que le server a repondu pour nous informer qu'on est connecté, elle nous renvois un "token"(JWT) qui a une date de validité

c'est comme une carte d'acces pour l'informer de nos permission

c'est avec cela que l'on peux acceder a des parties reservé de l'application distante

lorsque l'on fait une requete, on passe par le controleur, qui lui, se sert d'un service pour repondre a notre demande.
le service fait des requetes a la base de données, verifie les information, les met en forme et les renvois au controleur, puis, ensuite le controleur nous les renvois ou les envois a la vue

dans le projet, je me suis servi d'un middleware pour s'occuper de tout ce qui concerne le token… gerer sa creation, gerer ses permissions, gerer son expiration mais aussi verifier si celui que l'on donne est le bon et si on a les droit d'acces

liste des endpoints

/creature/:id sert a afficher les details d'une creature
/creatures sert a afficher toute les creatures
/creature/:id/testimony sert a afficher les temoignage pour une creature
/creature sert a créer une nouvelle creature
/testimony sert a créer un nouveau temoignage
/testimony/:id/validate sert a valider un temoignage
/testimony/:id/reject sert a rejeter un temoignage

/auth/register sert a créer un compte
/auth/login sert a se connecter
/auth/me sert a afficher son propre profil
/admin/users sert a afficher la liste des utilisateurs
/auth/users/:id/role sert a changer le role d'une utilisateur



