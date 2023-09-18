// importing required modules
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {authenticateJWT,requireAuth} = require('./middleware/authMiddleware');

app.use(cookieParser());
app.use(express.json());

const { connect_to_db } = require('./config/db.js');
connect_to_db(app)

const adminRoutes = require('./routes/adminRoutes.js'); 
app.use(adminRoutes);

app.use(authenticateJWT);


// app.use(requireAuth);

// routes
const classRoutes = require('./routes/classRoutes.js');
const sectionRoutes = require('./routes/sectionRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');

app.use(classRoutes);
app.use(sectionRoutes);
app.use(studentRoutes);

// app.listen(PORT, () => {
//     console.log(`listen on port ${PORT}`);
// });



