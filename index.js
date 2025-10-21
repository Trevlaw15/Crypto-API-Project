import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const COIN_GECKO_API_KEY = "CG-woGWYimxGyg5uruCc4r7GvCN";

app.set("view engine", "ejs");
app.use(express.static("public/styles"));

app.get("/", async (req, res) => {
    try {
        const { data } = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price", 
            {
                params: {
                    ids: "bitcoin,ripple,sui",
                    vs_currencies: "usd",
                },
                headers: { 
                    'x-cg-demo-api-key': COIN_GECKO_API_KEY.trim(), 
                },
            }
        );
        const btcPrice = data?.bitcoin?.usd ?? null;
        const xrpPrice = data?.ripple?.usd ?? null;
        const suiPrice = data?.sui?.usd ?? null;

        res.render("index.ejs", { 
            btcPrice,
            xrpPrice,
            suiPrice, 
        });
    } catch (err) {
        console.error("Failed to fetch price:", err?.response?.status, err?.response?.data || err.message);
        res.render("index.ejs", { 
            btcPrice: null,
            xrpPrice: null,
            suiPrice: null, 
        });
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});