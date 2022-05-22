const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "Mfcmv74!",
    database: "agence"
});

mysql.createConnection({multipleStatements: true});

app.post("/api/insertBien", (req, res) => {
    const adresse = req.body.data.adresse;
    const proprietaire = req.body.data.proprietaire;
    const typeBien = req.body.data.typeBien;
    const nbPiece = req.body.data.nbPiece;
    const superficie = req.body.data.superficie;
    const etat = req.body.data.etat;
    const prix = req.body.data.prix;
    const dateDispo = req.body.data.dateDispo;
    const ville = req.body.data.ville;
    const nbGarage = req.body.data.nbGarage;
    const idAgent = req.body.data.idAgent;
    const fileName = req.body.file;
    db.query(
      "INSERT INTO logement (adresse, nom_proprietaire, type_maison, nbre_pieces, superficie_habitable, etat_habitation, prix_mev, date_dispo, ville, nbGarage, id_agent, img_logement) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [adresse, proprietaire, typeBien, nbPiece, superficie, etat, prix, dateDispo, ville, nbGarage, idAgent,fileName],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    )
})

app.post("/api/AjoutVisite", (req, res) => {
  console.log(req.body);
  const datevisite = req.body.data.date_visite;
  const idLogement = req.body.idLogement;
  db.query(
    "INSERT INTO visite VALUES (?,1,1,?)",
    [idLogement,datevisite],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})

app.post("/api/Vente", (req, res) => {
  const date_Vente = req.body.data.date_vente;
  const com = req.body.data.com;
  const idLogement = req.body.idLogement;
  db.query(
    "INSERT INTO transaction (id_agent, id_client, pourcentage_negociation, id_logement,date_vente) VALUES(1,1,?,?,?)",
    [com,idLogement,date_Vente],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
  db.query(
    "UPDATE logement SET estVendu = true WHERE id_logement = ?",
    [idLogement],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})

app.get("/api/getLogement", (req, res) => {
  db.query("SELECT * FROM logement where logement.estVendu IS NULL", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/getTransaction", (req, res) => {
  db.query("SELECT img_logement, adresse, nom_proprietaire, prix_mev, ville, pourcentage_negociation FROM LOGEMENT, TRANSACTION WHERE LOGEMENT.id_logement = TRANSACTION.id_logement", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.listen(3001, () => {
});