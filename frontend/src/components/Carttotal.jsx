import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

function Carttotal() {
  const { currency, delivery, getcartamt } = useContext(ShopContext);
  return (
    <div className="mr-10">
      <Title text1="CART" text2="TOTAL" />
      <table className="w-full text-left mt-2">
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>{currency}{getcartamt()}</td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>{currency}{delivery}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{currency}{getcartamt() + delivery}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Carttotal;
