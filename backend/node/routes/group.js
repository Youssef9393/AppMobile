const express = require('express');
const Group = require('../models/Group');  
const Expense = require('../models/Expense');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');


// Créer un groupe
router.post('/', async (req, res) => {
  const { name, price, email, adminId, seuil, telephone, description } = req.body;

  try {
    // const adminId = mongoose.Types.ObjectId(userId);

    const group = new Group({
      name,
      price,
      email,
      admin: adminId,
      seuil,
      telephone,
      description,
      participants: [adminId],
    });

    await group.save();
    res.status(201).send({ status: 'ok', message: 'Groupe créé avec succès', group });
  } catch (err) {
    console.error('Error creating group:', err); // Log the full error
    res.status(500).send({ error: 'Erreur serveur', details: err.message });
  }
});

router.post('/add-participant', async (req, res) => {
  const { groupId, participantId } = req.body; 

  if (!groupId || !participantId) {
    return res.status(400).json({ message: 'ID du groupe et ID du participant requis.' });
  }

  try {
    // Trouver le groupe par son ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Groupe non trouvé.' });
    }

    
    const user = await User.findById(participantId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifier si le participant est déjà dans le groupe
    if (group.participants.includes(participantId)) {
      return res.status(400).json({ message: 'Le participant est déjà dans ce groupe.' });
    }

    group.participants.push(participantId);

    user.groups.push(groupId);

    await group.save();
    await user.save();

    res.status(200).json({ message: 'Participant ajouté avec succès au groupe.', group, user });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});


router.post('/subtract', async (req, res) => {
  const { groupId, amount, userId, description } = req.body;  // Recevoir groupId, amount, userId et description dans le corps de la requête

  // Vérifier si le montant est valide
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Montant invalide pour la soustraction.' });
  }

  try {
    // Trouver le groupe par son ID
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Groupe non trouvé.' });
    }


    group.price -= amount;

    
    const newExpense = new Expense({
      name: 'Soustraction du groupe', 
      amount: amount,
      description: description || 'Aucune description',
      user: userId,  
      groupId: groupId  
    });

  
    await newExpense.save();

     group.expenses.push(newExpense._id); 


    await group.save();

 
    res.status(200).json({ message: 'Montant soustrait avec succès.', expense: newExpense });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

 
  
router.post('/add', async (req, res) => {
    const { groupId, amount, userId, description } = req.body;  // Recevoir groupId, amount, userId et description dans le corps de la requête
  
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Montant invalide pour l\'ajout.' });
    }
  
    try {

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Groupe non trouvé.' });
      }
  
      // Ajouter le montant au prix du groupe
      group.price += amount;
  
      const newExpense = new Expense({
        name: 'Ajout au groupe', 
        amount: amount,
        description: description || 'Aucune description', 
        user: userId,  
        groupId: groupId  
      });
  
      await newExpense.save();
  
    
      group.expenses.push(newExpense._id); 
  
      await group.save();
  
    
      res.status(200).json({ message: 'Montant ajouté avec succès.', expense: newExpense });
  
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
  });
  
  

 ////http://localhost:5000/groups/
 //c est pas important mais juste pour visualiser les groupe
 router.get('/', async (req, res) => {
  try {
    // Récupérer l'ID de l'admin depuis le corps de la requête
    const { adminId } = req.query;

    // Vérifier si l'ID de l'utilisateur existe
    if (!adminId) {
      return res.status(400).json({ message: 'adminId est requis.' });
    }

    // Trouver les groupes où l'utilisateur est l'admin
    const groups = await Group.find({ admin: adminId });

    // Vérifier si des groupes ont été trouvés
    if (groups.length === 0) {
      return res.status(404).json({ message: 'Aucun groupe trouvé pour cet utilisateur.' });
    }

    // Retourner les groupes trouvés
    res.status(200).json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});


router.post('/participants', async (req, res) => {
  const { groupId } = req.body;  

  try {

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: 'ID du groupe invalide.' });
    }

    const group = await Group.findById(groupId).populate('participants'); 

    if (!group) {
      return res.status(404).json({ message: 'Groupe non trouvé.' });
    }

    res.status(200).json({ participants: group.participants });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
   
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ error: 'Groupe non trouvé' });
    }

    await Group.findByIdAndDelete(id);

    res.status(200).json({ message: 'Groupe supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du groupe:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du groupe' });
  }
});

module.exports = router;
