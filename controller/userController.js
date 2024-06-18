const User = require('../db/models/user');

async function getUser(req,res){
  try{
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if(!user){
      return res.status(404).json({error: 'User not found'});
    }

    res.json({user});
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });

  }

}

// Function to allow user to add additional information
async function addInfo(req, res) {
  try {
    const userId = req.user.id; // Get userId from decoded JWT token
    
    const { photoURL, dateOfBirth, gender, address, phoneNumber } = req.body;

    // Find the user by userId
    const user = await User.findByPk(userId);

    // If user not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user information
    await user.update({
      photoURL: photoURL || user.photoURL,
      dateOfBirth: dateOfBirth || user.dateOfBirth,
      gender: gender || user.gender,
      address: address || user.address,
      phoneNumber: phoneNumber || user.phoneNumber,
    });

    // Return success response
    res.json({ message: 'User information updated successfully', user });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to allow user to edit their profile
async function editUser(req, res) {
  try {
    const userId = req.user.id; // Get userId from decoded JWT token
    const { fullName, email, photoURL, dateOfBirth, gender, address, phoneNumber } = req.body;

    // Find the user by userId
    let user = await User.findByPk(userId);

    // If user not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user information
    user = await user.update({
      fullName: fullName || user.fullName,
      email: email || user.email,
      photoURL: photoURL || user.photoURL,
      dateOfBirth: dateOfBirth || user.dateOfBirth,
      gender: gender || user.gender,
      address: address || user.address,
      phoneNumber: phoneNumber || user.phoneNumber,
    });

    // Return success response
    res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllUsers(req, res) {
  try {
    // Fetch all users
    const users = await User.findAll();

    // Send the users as a JSON response
    res.json(users);
  } catch (error) {
    // Log the error
    console.error(error);

    // Send an error response
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { addInfo, editUser,getUser, getAllUsers };
