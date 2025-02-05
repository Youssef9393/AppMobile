const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const cors = require('cors');

dotenv.config();

const app = express();

// Configuration CORS pour autoriser les requêtes depuis votre frontend
const corsOptions = {
  origin: '*', // Autoriser toutes les origines (à utiliser avec précaution en production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));


// Appliquer CORS avec options
app.use(cors(corsOptions));

// Middleware pour parser les corps de requêtes JSON et URL encodés
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://youssef:1650@cluster0.x6bfu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Base de données connectée'))
  .catch(err => console.log('Erreur de connexion à la base de données', err));

// Routes
app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/expenses', expenseRoutes);
app.use('/user', userRoutes);

// Lancement du serveur
app.listen(5000, () => {
  console.log('Serveur démarré sur le port 5000');
});
