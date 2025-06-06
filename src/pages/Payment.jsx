import React from 'react'
import PaymentCard from '../components/Payment.jsx'
import Loading from '../components/Loading.jsx';
import { useState, useEffect } from 'react'
function Payment() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (loading ? <Loading /> :
    <div className ='py-2'>
      <PaymentCard />
    </div>
  )
}

export default Payment
