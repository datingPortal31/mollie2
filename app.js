const express = require('express')

const app = express()

var cors = require('cors')
app.use(cors())

app.use(express.json())

const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_fsz4xDndpAx7V7cQq4TFH3dg7W755H' });




async function Getpayment(req,res) {
    
    const payment = await mollieClient.payments.create({
        amount: {
          currency: 'EUR',
          value: '10.00'
        },
        method: "creditcard",
      

        description: 'Order #12345',
        redirectUrl: 'https://757c1652.ngrok.io',
        webhookUrl: 'https://757c1652.ngrok.io/webhook',
        metadata: {
          order_id: '12345'
        }
      });

      console.log(payment)
      res.send(payment)
}


// Getpayment()


app.get('/',(req,res)=>{
    res.send("Hello")
})

app.get('pay',Getpayment)

app.post('/webhook', async (req, res)   =>  {
    const paymentId = req.body.id;
    const payment = await mollie.payments.get(paymentId);
    // Update your DB HERE based on the status of the payment
    console.log(payment)
    console.log("console")

    res.status(200).send();
  });


app.listen(3000,()=>{console.log("Running..")})
