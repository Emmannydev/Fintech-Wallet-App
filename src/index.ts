import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { paymentRouter } from "./routes/payment/payment.route";
dotenv.config();
const PORT = process.env.PORT || 8090;
const server = http.createServer(app);

app.use("/api/v1/payment",paymentRouter)

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
