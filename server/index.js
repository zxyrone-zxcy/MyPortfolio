const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Serve static React build files
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Routes example
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend connected' });
});

// Single Page Application (SPA) fallback:
// Any non-API GET request serves index.html so React Router takes over routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});