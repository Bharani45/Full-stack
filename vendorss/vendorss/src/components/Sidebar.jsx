import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

function Sidebar() {
  const navItems = [
    { to: '/add', label: 'Add items', icon: assets.add_icon },
    { to: '/orders', label: 'Order items', icon: assets.order_icon },
    { to: '/list', label: 'List items', icon: assets.order_icon },
  ]

  return (
    <div className='w-full sm:w-[18%] border-r min-h-screen bg-white px-4 py-6 shadow-sm'>
      <div className='flex items-center justify-between sm:justify-center mb-8'>
        <h2 className='text-xl font-semibold text-gray-700'>Dashboard</h2>
        <div className='sm:hidden'>
    
        </div>
      </div>

      <div className='flex sm:flex-col gap-4'>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
              ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`
            }
          >
            <img src={item.icon} alt={item.label} className='w-6 h-6' />
            <span className='text-sm font-medium'>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
