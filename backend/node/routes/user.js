const express = require('express');
const User = require('../models/User');
const Group = require('../models/Group');

const router = express.Router();
router.put('/add-group', async (req, res) => {
  const { userId } = req.body; 
  const { groupId } = req.body; 

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Groupe non trouvé.' });
    }
    if (!user.groups.includes(groupId)) {
      user.groups.push(groupId);
      await user.save();
      return res.status(200).json({ message: 'Groupe ajouté avec succès.', user });
    }

    res.status(400).json({ message: 'L\'utilisateur appartient déjà à ce groupe.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

module.exports = router;
