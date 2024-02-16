require("dotenv").config();
const { MercadoPagoConfig, Preference } = require('mercadopago');
const {TOKEN_MP} = process.env;

const client = new MercadoPagoConfig({ accessToken: TOKEN_MP });

const makePayment = async (req, res) => {
    try {
        const body = {
          items: [
            {
              title: req.body.title,
              quantity: Number(req.body.quantity),
              unit_price: Number(req.body.price),
              currency_id: "ARS",
            },
          ],
          back_urls: {
            success: "https://google.com",
            failure: "https://google.com",
            pending: "https://google.com",
          },
          auto_return: "approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({body})
        res.json({
            id: result.id
        })
      } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Error al crear la preferencia'
        })
      }
}

module.exports = makePayment
