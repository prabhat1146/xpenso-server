const Category = require("../entities/Category"); // adjust path if needed



const incomeCategories = [
  { label: "Salary", value: "salary", color: "#34d399", icon: "Briefcase" },
  { label: "Business", value: "business", color: "#22d3ee", icon: "Factory" },
  { label: "Interest", value: "interest", color: "#f59e0b", icon: "Percent" },
  { label: "Dividends", value: "dividends", color: "#6366f1", icon: "Banknote" },
  { label: "Rent", value: "rent", color: "#10b981", icon: "Home" },
  { label: "Commission", value: "commission", color: "#3b82f6", icon: "BadgeDollarSign" },
  { label: "Gift", value: "gift", color: "#f472b6", icon: "Gift" },
  { label: "Refund", value: "refund", color: "#a855f7", icon: "RotateCcw" },
  { label: "Bonus", value: "bonus", color: "#ef4444", icon: "Star" },
  { label: "Investment Returns", value: "investment_returns", color: "#16a34a", icon: "LineChart" },
  { label: "Lottery", value: "lottery", color: "#f97316", icon: "Ticket" },
  { label: "Pension", value: "pension", color: "#14b8a6", icon: "UserCheck" },
  { label: "Allowance", value: "allowance", color: "#8b5cf6", icon: "Wallet" },
  { label: "Cashback", value: "cashback", color: "#10b981", icon: "BadgePercent" },
  { label: "Other", value: "other", color: "#9ca3af", icon: "HelpCircle" },
];




const expenseCategories = [
  { label: "Food & Groceries", value: "food_groceries", color: "#f87171", icon: "ShoppingBasket" },
  { label: "Rent", value: "rent", color: "#fb923c", icon: "Home" },
  { label: "Utilities", value: "utilities", color: "#facc15", icon: "Lightbulb" },
  { label: "Transportation", value: "transportation", color: "#34d399", icon: "Bus" },
  { label: "Fuel", value: "fuel", color: "#60a5fa", icon: "Fuel" },
  { label: "Education", value: "education", color: "#a78bfa", icon: "BookOpen" },
  { label: "Healthcare", value: "healthcare", color: "#f472b6", icon: "Stethoscope" },
  { label: "Insurance", value: "insurance", color: "#c084fc", icon: "ShieldCheck" },
  { label: "Shopping", value: "shopping", color: "#f43f5e", icon: "ShoppingBag" },
  { label: "Entertainment", value: "entertainment", color: "#3b82f6", icon: "Clapperboard" },
  { label: "Travel", value: "travel", color: "#22d3ee", icon: "Plane" },
  { label: "Mobile & Internet", value: "mobile_internet", color: "#818cf8", icon: "Wifi" },
  { label: "EMI/Loan Payment", value: "emi_loan_payment", color: "#f97316", icon: "CreditCard" },
  { label: "Investment", value: "investment", color: "#4ade80", icon: "LineChart" },
  { label: "Charity/Donations", value: "charity_donations", color: "#a3e635", icon: "HandHeart" },
  { label: "Personal Care", value: "personal_care", color: "#ec4899", icon: "Heart" },
  { label: "Taxes", value: "taxes", color: "#facc15", icon: "FileText" },
  { label: "Gifts", value: "gifts", color: "#f472b6", icon: "Gift" },
  { label: "Other", value: "other", color: "#9ca3af", icon: "HelpCircle" },
];



const transferCategories = [
  { label: "Bank to Wallet", value: "bank_to_wallet", color: "#93c5fd", icon: "ArrowRightLeft" },
  { label: "Wallet to Bank", value: "wallet_to_bank", color: "#67e8f9", icon: "ArrowLeftRight" },
  { label: "Bank to Bank", value: "bank_to_bank", color: "#a5b4fc", icon: "Banknote" },
  { label: "Wallet to Wallet", value: "wallet_to_wallet", color: "#6ee7b7", icon: "Wallet" },
  { label: "Credit Card Payment", value: "credit_card_payment", color: "#fcd34d", icon: "CreditCard" },
  { label: "Savings to Checking", value: "savings_to_checking", color: "#f9a8d4", icon: "ArrowDownToLine" },
  { label: "Checking to Savings", value: "checking_to_savings", color: "#fde68a", icon: "ArrowUpToLine" },
  { label: "Other", value: "other", color: "#d1d5db", icon: "HelpCircle" },
];


async function seedCategories(dataSource) {
  if (!dataSource || !dataSource.isInitialized) {
    throw new Error("DataSource is not initialized");
  }

  const categoryRepo = dataSource.getRepository(Category);

  async function insertCategories(categories, type) {
    for (const cat of categories) {
      const exists = await categoryRepo.findOne({
        where: { name: cat.value, type, mobile: null },
      });

      if (!exists) {
        const newCategory = categoryRepo.create({
          mobile: null,
          type,
          name: cat.value,
          icon: null,
          isDeleted: false,
          color:cat.color,
          icon:cat.icon
        });
        await categoryRepo.save(newCategory);
        console.log(`Inserted category: ${cat.value} (${type})`);
      } else {
        console.log(`Category already exists: ${cat.value} (${type})`);
      }
    }
  }

  await insertCategories(incomeCategories, "income");
  await insertCategories(expenseCategories, "expense");
  await insertCategories(transferCategories, "transfer");
  console.log("Category seeding completed.")
}

module.exports = seedCategories;
