require("dotenv").config();
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { TOKEN_MP, KEY_Makepayment } = process.env;

const client = new MercadoPagoConfig({ accessToken: TOKEN_MP });

const makePayment = async (req, res) => {
  try {
    const items = req.body.cart.map((ele) => ({
      title: ele.nombre,
      quantity: ele.cantidad,
      unit_price: Number(ele.precio),
      currency_id: "ARS",
    }));
    const body = {
      items,
      back_urls: {
        success: "https://uuid-store.vercel.app/success",
        failure: "https://uuid-store.vercel.app",
        pending: "https://uuid-store.vercel.app",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
};

module.exports = makePayment;
