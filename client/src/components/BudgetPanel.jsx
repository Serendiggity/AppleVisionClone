import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { panel, button, text } from '../styles/tokens';

/**
 * @component BudgetPanel
 * @description Budget tracking panel
 * @token panel - For panel styling
 * @token button.primary - For button styling
 * @token text.primary - For primary text
 * @token text.secondary - For secondary text
 */
const BudgetPanel = () => {
  const [budget, setBudget] = useState({
    total: 25000,
    spent: 15380,
    items: [
      { id: 1, category: 'Venue', amount: 8500 },
      { id: 2, category: 'Catering', amount: 4200 },
      { id: 3, category: 'Photography', amount: 2300 },
      { id: 4, category: 'Other', amount: 380 },
    ]
  });
  
  // Calculate percentage spent
  const percentSpent = Math.round((budget.spent / budget.total) * 100);
  
  return (
    <div className="glass-thin vision-radius vision-shadow p-6 col-span-12 md:col-span-6 lg:col-span-4 motion-hover">
      <h2 className="text-xl font-semibold text-primary flex items-center">
        <DollarSign className="w-5 h-5 mr-2" /> Budget
      </h2>
      
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-secondary">${budget.spent.toLocaleString()} spent</span>
          <span className="text-primary font-medium">${budget.total.toLocaleString()}</span>
        </div>
        
        <progress value={percentSpent} max="100" className="mt-2"></progress>
        
        <div className="mt-4 space-y-3">
          {budget.items.map((item) => (
            <div className="flex justify-between" key={item.id}>
              <span className="text-primary">{item.category}</span>
              <span className="text-secondary">${item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      <button className="mt-4 w-full glass-regular py-2 rounded-xl text-primary motion-hover">
        Add Expense
      </button>
    </div>
  );
};

export default BudgetPanel;
