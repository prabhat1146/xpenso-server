async function seedModes(dataSource) {
  const modeRepo = dataSource.getRepository("Mode");

  const modes = [
  { name: "upi", icon: "IndianRupee", color: "#10b981" },         // green
  { name: "cash", icon: "Wallet", color: "#f59e0b" },             // amber
  { name: "account_transfer", icon: "Repeat", color: "#6366f1" }, // indigo
  { name: "cheque", icon: "Scroll", color: "#eab308" },           // yellow
  { name: "debit_card", icon: "CreditCard", color: "#3b82f6" },   // blue
  { name: "credit_card", icon: "CreditCard", color: "#ef4444" },  // red
  { name: "mobile_wallet", icon: "Smartphone", color: "#a855f7" },// violet
  { name: "aep", icon: "Fingerprint", color: "#14b8a6" },         // teal
  { name: "net_banking", icon: "Globe", color: "#8b5cf6" },       // purple
  { name: "ussd", icon: "TerminalSquare", color: "#6b7280" },     // gray
  { name: "prepaid_card", icon: "BadgeDollarSign", color: "#22c55e" }, // green
  { name: "nach", icon: "Building2", color: "#0ea5e9" },          // sky
];



  for (const modeData of modes) {
    // Check if mode already exists to avoid duplicates
    const existing = await modeRepo.findOneBy({ name: modeData.name });
    if (!existing) {
      const mode = modeRepo.create(modeData);
      await modeRepo.save(mode);
    }
  }

  console.log("Modes seeded successfully");
}


module.exports=seedModes;