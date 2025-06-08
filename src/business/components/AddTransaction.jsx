import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import style from "../styles/stripe.module.css";

const AddTransaction = ({ transactionData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [username, setUsername] = useState(
    localStorage.getItem("userUsername") || ""
  );
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("");
  const [plot, setPlot] = useState(1);
  const [unit, setUnit] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [baseAmount, setBaseAmount] = useState(transactionData?.amount || "");
  const [amount, setAmount] = useState(transactionData?.amount || "");
  const [currency, setCurrency] = useState(transactionData?.currency || "usd");
  const [description, setDescription] = useState(
    transactionData?.description || ""
  );
  const [type, setType] = useState(transactionData?.type || "");
  const [roi, setRoi] = useState(transactionData?.roi || "");
  const [nextRoiDate, setNextRoiDate] = useState(
    transactionData?.nextRoiDate || ""
  );

  // Compute visibility dynamically
  const showRoiFields = ["5million", "8million", "10million"].includes(type);
  const showUnit = type === "house";
  const showPlot = type === "land";

  useEffect(() => {
    setBaseAmount(transactionData?.amount || ""); // Ensure baseAmount is set
    setAmount(transactionData?.amount || ""); // Reset amount when transactionData changes
    setCurrency(transactionData?.currency || "usd"); // Reset currency when transactionData changes
  }, [transactionData]);

  useEffect(() => {
    if (transactionData?.amount) {
      if (type === "land") {
        setAmount(transactionData.amount * plot);
      } else if (type === "house") {
        setAmount(transactionData.amount * unit);
      } else {
        setAmount(transactionData.amount);
      }
    }
  }, [plot, unit, type, transactionData]);

  // useEffect(() => {
  //   console.log("transactionData:", transactionData); // Debugging

  //   if (transactionData?.durations?.length > 0) {
  //     const selectedInvestment = transactionData.durations[0]; // Get first duration
  //     console.log("Selected Investment:", selectedInvestment); // Debugging

  //     if (selectedInvestment?.duration) {
  //       const today = new Date();
  //       const roiDurationMonths = parseInt(selectedInvestment.duration, 10);

  //       console.log("ROI Duration (Months):", roiDurationMonths); // Debugging

  //       if (!isNaN(roiDurationMonths)) {
  //         const nextRoiDate = new Date(today);
  //         nextRoiDate.setMonth(today.getMonth() + roiDurationMonths);

  //         // Handle month-end issues
  //         if (nextRoiDate.getDate() < today.getDate()) {
  //           nextRoiDate.setDate(0); // Moves to the last valid day of previous month
  //         }

  //         console.log("Computed Next ROI Date:", nextRoiDate); // Debugging

  //         setNextRoiDate(nextRoiDate.toISOString().split("T")[0]);
  //       }
  //     }
  //   }
  // }, [transactionData]);

  // };

  console.log("Type:", type);
console.log("Transaction Durations:", transactionData?.durations);

  useEffect(() => {
    // const calculateNextRoiDate = () => {
    //   if (["5million", "8million", "10million"].includes(type) && transactionData?.durations?.length > 0) {
    //     const selectedInvestment = transactionData.durations[0]; // Assuming you're using the first duration
        
    //     if (selectedInvestment?.duration) {
    //       const today = new Date();
    //       const roiDurationMonths = parseInt(selectedInvestment.duration, 10); // Assume duration is in months
  
    //       if (!isNaN(roiDurationMonths)) {
    //         const nextDate = new Date(today);
    //         nextDate.setMonth(today.getMonth() + roiDurationMonths);
  
    //         // Handle edge case: if the day doesn't exist in the new month
    //         if (nextDate.getDate() < today.getDate()) {
    //           nextDate.setDate(0); // Sets to the last day of previous month
    //         }

    //         setNextRoiDate(nextDate.toISOString().split("T")[0]);
    //         console.log("Next ROI Date Set:", nextRoiDate);
    //       }
    //     }
    //   } else {
    //     setNextRoiDate(""); // Clear if not applicable
    //   }
    // };
    console.log("Type:", type);
    console.log("Transaction Durations:", transactionData?.durations);
    
    const calculateNextRoiDate = () => {
      if (["5million", "8million", "10million"].includes(type) && transactionData?.durations?.length > 0) {
        const selectedInvestment = transactionData.durations.find(d => d.duration); 
        if (selectedInvestment?.duration) {
          const today = new Date();
          const months = parseInt(selectedInvestment.duration, 10);
          if (!isNaN(months)) {
            const nextDate = new Date(today);
            nextDate.setMonth(nextDate.getMonth() + months);
            if (nextDate.getDate() < today.getDate()) {
              nextDate.setDate(0);  // Handles month overflow
            }
            const nextDateString = nextDate.toISOString().split("T")[0];
            setNextRoiDate(nextDateString);
            console.log("Computed Next ROI Date:", nextDateString);  // Correct logging spot
          }
        }
      } else {
        setNextRoiDate("");
      }
    };
    
    calculateNextRoiDate();
  }, [transactionData, type]);
  
  const conversionRates = { usd: 1, ngn: 1500, eur: 0.92, gbp: 0.78 };

  const calculateAmount = (baseAmount, currency, plot, unit, type) => {
    const rate = conversionRates[currency] || 1;
    let totalAmount = baseAmount;

    if (type === "land") {
      totalAmount = baseAmount * plot;
    } else if (type === "house") {
      totalAmount = baseAmount * unit;
    }

    // Convert to selected currency
    const convertedAmount = (totalAmount / conversionRates["usd"]) * rate;
    return parseFloat(convertedAmount.toFixed(2));
  };

  useEffect(() => {
    const newAmount = calculateAmount(baseAmount, currency, plot, unit, type);
    setAmount(newAmount);
  }, [plot, unit, type, currency, baseAmount]);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);

    const newAmount = calculateAmount(
      baseAmount,
      newCurrency,
      plot,
      unit,
      type
    );
    setAmount(newAmount);
  };

  useEffect(() => {
    console.log("Transaction Data:", transactionData);
}, [transactionData]);


  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe is not loaded yet.");
      return;
    }

    if (!username) {
      setMessage("Username is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("authToken");
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.post(
        `${API_BASE_URL}/user/payment`,
        {
          email,
          amount: amount * 100, // Convert to cents
          currency,
          paymentMethodId: paymentMethod.id,
          username,
          description,
          method,
          unit: showUnit ? unit : null,
          plot: showPlot ? plot : null,
          type,
          roi: showRoiFields ? roi : null,
          nextRoiDate: showRoiFields ? nextRoiDate : null,
          duration:
            transactionData?.durations?.find((d) => d.duration)?.duration || "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(
        `${response.data.message} Transaction ID: ${response.data.transactionId}`
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <form onSubmit={handlePayment}>
        <div className={style.emme}>
          <div className={style.laut}>
            <label htmlFor="">Email: </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={style.ail}
            />
          </div>

          <div className={style.laut}>
            <label htmlFor="">Username: </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              readOnly
              onChange={(e) => setUsername(e.target.value)}
              required
              className={style.ail}
            />
          </div>
        </div>

        <div className={style.emme}>
          <div className={style.laut}>
            <label htmlFor="">Description: </label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              readOnly
              className={style.ail}
            />
          </div>

          <div className={style.laut}>
            <label htmlFor="">Currency: </label>
            <select
              value={currency}
              className={style.ail}
              onChange={handleCurrencyChange}
            >
              <option value="usd">$ (USD)</option>
              <option value="ngn"># (NGN)</option>
              <option value="eur">€ (EUR)</option>
              <option value="gbp">£ (GBP)</option>
            </select>
          </div>
        </div>

        <div className={style.lautnt}>
          <label htmlFor="">Amount:</label>
          <input type="number" value={amount} readOnly className={style.ail} />
        </div>

        <div className={style.emme}>
          {showPlot && (
            <div className={style.laut}>
              <label htmlFor="">How many Plot: </label>
              <input
                className={style.ail}
                type="number"
                placeholder="How many Plots?"
                value={plot}
                onChange={(e) => setPlot(Number(e.target.value))}
                // onChange={handlePlotChange}
              />
            </div>
          )}

          {showUnit && (
            <div className={style.laut}>
              <label htmlFor="">How many Unit?</label>
              <input
                className={style.ail}
                type="number"
                placeholder="How many Units?"
                value={unit}
                onChange={(e) => setUnit(Number(e.target.value))}
              />
            </div>
          )}
        </div>

        <div className={style.emme}>
          <div className={style.laut}>
            <label htmlFor="">Transaction Type: </label>
            <select
              value={type}
              // onChange={handleTypeChange}
              onChange={(e) => setType(e.target.value)}
              disabled={!!transactionData?.type} // Disables if type exists in transactionData
              className={style.ail}
            >
              <option value="">Select Transaction Type</option>
              <option value="5million">5 Million</option>
              <option value="8million">8 Million</option>
              <option value="10million">10 Million</option>
              <option value="land">Buy Land</option>
              <option value="house">Buy House</option>
              <option value="Bought Fractional Ownership">
                Buy Fractional Ownership
              </option>
            </select>
          </div>

          <div className={style.laut}>
            <label htmlFor="">Payment Method: </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={style.ail}
            >
              <option value="">Select Payment Method</option>
              <option value="Bank Transfer">Credit/Debit Card</option>
              {/* <option value="Wallet">Wallet</option> */}
            </select>
          </div>
        </div>

        {showRoiFields && (
          <div className={style.emme}>
            <div className={style.laut}>
              <label htmlFor="">ROI: </label>
              <input
                className={style.ail}
                type="number"
                name="roi"
                placeholder="Enter User ROI"
                value={roi}
                onChange={(e) => setRoi(e.target.value)}
                required
                disabled={!!transactionData?.roi}
              />
            </div>

            <div className={style.laut}>
              <label htmlFor="">Next ROI Date: </label>
              <input
                className={style.ail}
                type="date"
                name="nextRoiDate"
                value={nextRoiDate}
                readOnly
                // onChange={(e) => setNextRoiDate(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <br />
        <CardElement />

        <br />
        <button
          className={style.key}
          type="submit"
          disabled={loading || !stripe}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTransaction;
