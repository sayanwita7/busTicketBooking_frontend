import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillCreditCardFill } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import {QRCodeSVG} from 'qrcode.react';

function CardPaymentComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state || [];
    const [cardNo, setCardNo] = useState("");
    const [cardTotal, setCardTotal] = useState (0.0)
    useEffect(() => {
        setCardTotal (booking.price*1.05)
    }, []);

    const formatWithHyphens = (value) => {
        const digits = value.replace(/\D/g, "");
        const trimmed = digits.slice(0, 16);
        const formatted = trimmed.match(/.{1,4}/g)?.join("-") || "";
        return formatted;
    };
    const handleChange = (e) => {
        const formatted = formatWithHyphens(e.target.value);
        setCardNo(formatted);
    };

    return (
        <div>
        <form className="px-6 pb-6" onSubmit = {(e) => { 
                    e.preventDefault();
                    alert ("Confirm Payment...")
                    navigate('/all-user-tickets') }}>
            {/* Credit Card */}
            <div className="mb-4">
                <label className="block mb-1">Card Details</label>
                <div className="relative">
                <input
                    type="text"
                    className="form-input w-full border rounded px-3 py-2 pr-12"
                    placeholder="0000-0000-0000-0000"
                    value={cardNo}
                    onChange={handleChange}
                    maxLength={19}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6">
                <BsFillCreditCardFill />
                </div>
                </div>
            </div>

            {/* Expiration */}
            <div className="md:flex gap-4">
                <div className="mb-4 md:mb-0 md:w-1/2">
                <div className="md:flex gap-4">
                    <div className="mb-4 md:mb-0 md:w-1/2">
                        <label className="block mb-1">Expiration Month</label>
                        <select className="bg-purple-300 hover:bg-purple-300 form-select w-full border rounded px-3 py-2">
                        <option value="">MM</option>
                        {[...Array(12)].map((_, i) => {
                            const month = (i + 1).toString().padStart(2, "0");
                            return (
                            <option key={month} value={month}>
                                {month}
                            </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="mb-4 md:mb-0 md:w-1/2">
                        <label className="block mb-1">Expiration Year</label>
                        <select className=" bg-purple-300 hover:bg-purple-300 form-select w-full border rounded px-3 py-2">
                        <option value="">YYYY</option>
                        {Array.from({ length: 12 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                            );
                        })}
                        </select>
                    </div>
                </div>

            </div>

            {/* CVV */}
            <div className="md:w-1/2">
                <label className="block mb-1">CVV</label>
                <div className="relative">
                    <input
                    type="password"
                    className="form-input w-full border rounded px-3 py-2 pr-10"
                    placeholder="000"
                    maxLength={3}
                    />
                   
                </div>
                </div>
            </div>

            {/* Name */}
            <div className="mt-4">
                <label className="block mb-1">Name of Card Holder</label>
                <div className="relative">
                <input
                    type="text"
                    className="form-input w-full border rounded px-3 py-2 pr-10 uppercase"
                    placeholder="Sayanwita Dey"
                />
                <i className="far fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>

            {/* Pay Button */}
            <div className="mt-6">
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Pay ₹{cardTotal}
                </button>
            </div>
        </form>
        </div>
    )
    }
function QRCodeComponent() {
    return (
        <div className ="px-6 pb-6">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
        <IoQrCodeOutline />
        <span>QR Code Scanner</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-lg font-semibold mb-4">Scan to Pay</h2>
        <QRCodeSVG value="https://reactjs.org/" />
        <p className="text-sm text-gray-400 mt-4">Scan this QR code to complete your payment</p>
        </div>
        </div>);
}

const PaymentCard = () => {
    const [activeTab, setActiveTab] = useState("card");
    const [price, setPrice] = useState(0.0)
    const [total, setTotal] = useState (0.0)
    const [date, setDate] = useState("")

    const location = useLocation();
    const booking = location.state || [];
    
    
    useEffect(() => {
        const date = new Date().toLocaleDateString()
        setDate(date)
        setPrice(booking.price)
        setTotal (booking.price*1.05)
        // setPrice()
        // setBookingId(bookingData.bookingId)
    }, []);
    
    return (
        <div className="select-none min-h-screen flex flex-col md:flex-row items-center p-2 gap-4">
        {/* Left Card */}
        <div className="bg-violet-100/20 shadow-md p-6 md:p-10 w-full md:w-1/2 rounded-md">
            <div className="text-2xl font-bold mb-6 flex items-center gap-1">
            <span>Booking Amount: INR {price}</span>
            </div>

            <div className="flex flex-col text-sm text-gray-100">
            <div className="flex justify-between mb-2">
                <span>GST (5%) </span>
                <span className="flex items-center">
                <span className="ps-1">INR {(price*0.05).toFixed(2)}</span>
                </span>
            </div>
            <div className="flex justify-between mb-4 font-semibold">
                <span>Total</span>
                <span className="flex items-center">
                <i className="fas fa-dollar-sign"></i>
                <span className="ps-1">INR {(total).toFixed(2)}</span>
                </span>
            </div>

            <hr className="mb-4" />

            <div className="mb-4">
                <span className="flex items-center text-sm text-gray-300 mb-1"> Booking Date: {date} </span>
            </div>
            </div>
        </div>

        {/* Right Card */}
        <div className="bg-violet-100/20 shadow-md w-full md:w-1/2 rounded-md">
            <div className="flex justify-between items-center p-6">
            <h2 className="text-xl font-bold">Payment Methods</h2>
            </div>

            

            {/* Payment Form */}
            {/* Tab Headers */}
            <div className="flex px-6 gap-5 text-sm font-medium border-b pb-2 mb-4">
                <button
                onClick={() => setActiveTab("card")}
                className={`pb-1 ${
                    activeTab === "card"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                >
                Credit Card
                </button>
                <button
                onClick={() => setActiveTab("qr")}
                className={`pb-1 ${
                    activeTab === "qr"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                >
                QR Code
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "card" ? <CardPaymentComponent /> : < QRCodeComponent/>}
        </div>
        </div>
    );
};

export default PaymentCard;
