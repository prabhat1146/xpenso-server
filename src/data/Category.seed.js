const Category = require("../entities/Category"); // adjust path if needed

const incomeCategories = [
  { label: "Salary", value: "salary" },
  { label: "Business", value: "business" },
  { label: "Interest", value: "interest" },
  { label: "Dividends", value: "dividends" },
  { label: "Rent", value: "rent" },
  { label: "Commission", value: "commission" },
  { label: "Gift", value: "gift" },
  { label: "Refund", value: "refund" },
  { label: "Bonus", value: "bonus" },
  { label: "Investment Returns", value: "investment_returns" },
  { label: "Lottery", value: "lottery" },
  { label: "Pension", value: "pension" },
  { label: "Allowance", value: "allowance" },
  { label: "Other", value: "other" },
];

const expenseCategories = [
  { label: "Food & Groceries", value: "food_groceries" },
  { label: "Rent", value: "rent" },
  { label: "Utilities", value: "utilities" },
  { label: "Transportation", value: "transportation" },
  { label: "Fuel", value: "fuel" },
  { label: "Education", value: "education" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Insurance", value: "insurance" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Travel", value: "travel" },
  { label: "Mobile & Internet", value: "mobile_internet" },
  { label: "EMI/Loan Payment", value: "emi_loan_payment" },
  { label: "Investment", value: "investment" },
  { label: "Charity/Donations", value: "charity_donations" },
  { label: "Personal Care", value: "personal_care" },
  { label: "Taxes", value: "taxes" },
  { label: "Gifts", value: "gifts" },
  { label: "Other", value: "other" },
];

const transferCategories = [
  { label: "Bank to Wallet", value: "bank_to_wallet" },
  { label: "Wallet to Bank", value: "wallet_to_bank" },
  { label: "Bank to Bank", value: "bank_to_bank" },
  { label: "Wallet to Wallet", value: "wallet_to_wallet" },
  { label: "Credit Card Payment", value: "credit_card_payment" },
  { label: "Savings to Checking", value: "savings_to_checking" },
  { label: "Checking to Savings", value: "checking_to_savings" },
  { label: "Other", value: "other" },
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
