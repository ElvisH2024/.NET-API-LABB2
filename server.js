const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;


const DOTNET_API_URL = "https://elvisapi.azurewebsites.net"; 


app.use(cors());
app.use(express.json());


app.get("/courses", async (req, res) => {
    try {
        const response = await axios.get(`${DOTNET_API_URL}/courses`);
        res.json(response.data);
    } catch (error) {
        console.error(" Fel vid hämtning av kurser:", error.response ? error.response.data : error.message);
        res.status(500).json({
            message: "Fel vid hämtning av kurser",
            error: error.response ? error.response.data : error.message
        });
    }
});

app.post("/course", async (req, res) => {
    try {
        const response = await axios.post(`${DOTNET_API_URL}/course`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Fel vid skapande av kurs:", error.response ? error.response.data : error.message);
        res.status(500).json({
            message: "Fel vid skapande av kurs",
            error: error.response ? error.response.data : error.message
        });
    }
});


app.get("/", (req, res) => {
    res.send(`
        <h1>Express API</h1>
        <p>Använd <a href="/courses">/courses</a> för att hämta kurser från .NET API</p>
    `);
});


app.listen(PORT, () => {
    console.log(`Express API körs på http://localhost:${PORT}`);
});
