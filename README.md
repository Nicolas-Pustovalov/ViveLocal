# Projet ViveLocal près de chez vous -

Ce projet est une API REST pour rechercher par géolocalisation des producteurs locaux.
Cette plateforme vous permettra de trouver un maraîcher à proximité de votre position, qui correspond à vos besoins et aussi à favoriser le contact entre producteur et consommateur.
Cela permet de travailler en circuit court, limitant l’impact énergétique et augmentant les profits des producteurs qui sont ainsi moins dépendants des grands distributeurs.

## Auteurs : 
​Nicolas Pustovalov 
Marie Pierre Chavez  
 
 

## Stack technique
Ces outils sont nécessaires à l'installation et au fonctionnement de l'API.  
A installer sur votre hôte avant de continuer

- [NodeJS](https://nodejs.org/en/download/) (v12 ou supérieure)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 ou supérieure)
- [Sqitch](https://sqitch.org/download/) (v1 ou supérieure)
- [Redis](https://redis.io/download)(6.2.6 ou supérieure)


Les dépendances NPM nécessaires:

    "axios",
    "bcrypt",
    "cloudinary",
    "cors"",
    "dotenv",
    "express",
    "express-jsdoc-swagger",
    "joi",
    "jsonwebtoken",
    "multer",
    "pg",
    "redis",
    "sanitizer"


Installez les:

```bash
npm install axios bcrypt cloudinary cors dotenv express express-jsdoc-swagger joi jsonwebtoken multer pg redis sanitizer
```

Copier le fichier .env.example, le renommer en .env et remplir les informations nécessaires

Copier le fichier sqitch.conf.example et le renommer en sqitch.conf

Enfin, créer une base de données PostgreSQL et déployer le projet Sqitch dessus

```bash
createdb Maraicher;
sqitch deploy
```

Configurer PostgreSQL (ou fournir les variables d'environnement nécessaires) pour que les commandes `createdb` et `sqitch` puissent s'exécuter correctement

## Données de démonstration

Afin de mettre en place quelques données de test, lancer

```bash
node data/seedingScript.js
```

## Lancement

```bash
redis-server
```
```bash
npm start
```