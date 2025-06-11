const Category = require("../entities/Category"); // adjust path if needed



const incomeCategories = [
  { label: "Salary", value: "salary", color: "#34d399" },
  { label: "Business", value: "business", color: "#22d3ee" },
  { label: "Interest", value: "interest", color: "#f59e0b" },
  { label: "Dividends", value: "dividends", color: "#6366f1" },
  { label: "Rent", value: "rent", color: "#10b981" },
  { label: "Commission", value: "commission", color: "#3b82f6" },
  { label: "Gift", value: "gift", color: "#f472b6" },
  { label: "Refund", value: "refund", color: "#a855f7" },
  { label: "Bonus", value: "bonus", color: "#ef4444" },
  { label: "Investment Returns", value: "investment_returns", color: "#16a34a" },
  { label: "Lottery", value: "lottery", color: "#f97316" },
  { label: "Pension", value: "pension", color: "#14b8a6" },
  { label: "Allowance", value: "allowance", color: "#8b5cf6" },
  { label: "Other", value: "other", color: "#9ca3af" },
];


const expenseCategories = [
  { label: "Food & Groceries", value: "food_groceries", color: "#f87171" },
  { label: "Rent", value: "rent", color: "#fb923c" },
  { label: "Utilities", value: "utilities", color: "#facc15" },
  { label: "Transportation", value: "transportation", color: "#34d399" },
  { label: "Fuel", value: "fuel", color: "#60a5fa" },
  { label: "Education", value: "education", color: "#a78bfa" },
  { label: "Healthcare", value: "healthcare", color: "#f472b6" },
  { label: "Insurance", value: "insurance", color: "#c084fc" },
  { label: "Shopping", value: "shopping", color: "#f43f5e" },
  { label: "Entertainment", value: "entertainment", color: "#3b82f6" },
  { label: "Travel", value: "travel", color: "#22d3ee" },
  { label: "Mobile & Internet", value: "mobile_internet", color: "#818cf8" },
  { label: "EMI/Loan Payment", value: "emi_loan_payment", color: "#f97316" },
  { label: "Investment", value: "investment", color: "#4ade80" },
  { label: "Charity/Donations", value: "charity_donations", color: "#a3e635" },
  { label: "Personal Care", value: "personal_care", color: "#ec4899" },
  { label: "Taxes", value: "taxes", color: "#facc15" },
  { label: "Gifts", value: "gifts", color: "#f472b6" },
  { label: "Other", value: "other", color: "#9ca3af" },
];


const transferCategories = [
  { label: "Bank to Wallet", value: "bank_to_wallet", color: "#93c5fd" },
  { label: "Wallet to Bank", value: "wallet_to_bank", color: "#67e8f9" },
  { label: "Bank to Bank", value: "bank_to_bank", color: "#a5b4fc" },
  { label: "Wallet to Wallet", value: "wallet_to_wallet", color: "#6ee7b7" },
  { label: "Credit Card Payment", value: "credit_card_payment", color: "#fcd34d" },
  { label: "Savings to Checking", value: "savings_to_checking", color: "#f9a8d4" },
  { label: "Checking to Savings", value: "checking_to_savings", color: "#fde68a" },
  { label: "Other", value: "other", color: "#d1d5db" },
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
          color:cat.color
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
}

module.exports = seedCategories;
