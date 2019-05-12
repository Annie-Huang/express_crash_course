const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Gets All Members
// router.get('/api/members', (req, res) => res.json(members));
router.get('/', (req, res) => res.json(members));

// Get Single Member
// router.get('/api/members/:id', (req, res) => {
router.get('/:id', (req, res) => {
    // res.send(req.params.id);

    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        // res.json(members.filter(member => member.id === +req.params.id));
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }

});

// Create Member
router.post('/', (req, res) => {
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    // Syntax for mongodb: members.save(newMemeber);
    members.push(newMember);
    // res.json(members);

    // If you deal with template, you will usually redirect
    res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: 'Member updated', member });
            }
        });

    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }

});

// Delete Member
// Note: this is not really delete because it's never assigned back to the original members arrange so if you get again you will still see 3
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }

});

module.exports = router;
